/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { ChangeDetectorRef, Component } from "@angular/core";
import Fuse from "fuse.js";
import { OperatorMetadataService } from "../../../service/operator-metadata/operator-metadata.service";
import { GroupInfo, OperatorSchema } from "../../../types/operator-schema.interface";
import { DragDropService } from "../../../service/drag-drop/drag-drop.service";
import { WorkflowActionService } from "../../../service/workflow-graph/model/workflow-action.service";
import { WorkflowUtilService } from "../../../service/workflow-graph/util/workflow-util.service";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import {
  NzAutocompleteOptionComponent,
  NzAutocompleteTriggerDirective,
  NzAutocompleteComponent,
} from "ng-zorro-antd/auto-complete";
import { NzSpaceCompactItemDirective } from "ng-zorro-antd/space";
import { NzInputDirective } from "ng-zorro-antd/input";
import { FormsModule } from "@angular/forms";
import { NgFor, NgIf, NgTemplateOutlet } from "@angular/common";
import { OperatorLabelComponent } from "./operator-label/operator-label.component";
import { NzCollapseComponent, NzCollapsePanelComponent } from "ng-zorro-antd/collapse";
import { SemanticOperatorSearchService } from "../../../service/semantic-search/semantic-operator-search.service";
import { NextOperatorService } from "../../../service/next-operator/next-operator.service";

// Enough ranked candidates to fill the list once the exact matches are in, and
// a ceiling so the dropdown stays scannable.
const SEMANTIC_LIMIT = 6;
const MAX_RESULTS = 6;

@UntilDestroy()
@Component({
  selector: "texera-operator-menu",
  templateUrl: "operator-menu.component.html",
  styleUrls: ["operator-menu.component.scss"],
  imports: [
    NzSpaceCompactItemDirective,
    NzInputDirective,
    FormsModule,
    NzAutocompleteTriggerDirective,
    NzAutocompleteComponent,
    NgFor,
    NgIf,
    NzAutocompleteOptionComponent,
    OperatorLabelComponent,
    NgTemplateOutlet,
    NzCollapseComponent,
    NzCollapsePanelComponent,
  ],
})
export class OperatorMenuComponent {
  public opList = new Map<string, Array<OperatorSchema>>();
  public groupNames: ReadonlyArray<GroupInfo> = [];

  // input value of the search input box
  public searchInputValue: string = "";
  // search autocomplete suggestion list
  public autocompleteOptions: OperatorSchema[] = [];

  public canModify = true;

  // True while the embedding model is downloading on first use.
  public semanticLoading = false;
  // Relevance per suggested operator, so the palette can show why it ranked.
  public semanticScores = new Map<string, number>();

  // The operator the canvas has selected, and what is worth adding after it.
  public selectedOperatorName = "";
  public nextSuggestions: OperatorSchema[] = [];
  // Shown instead of the list when an operator ends the workflow, so an empty
  // panel is never mistaken for a broken one.
  public nextStepNote = "";
  private selectedOperatorId: string | null = null;

  // Every operator the palette can offer, kept for the semantic ranker.
  private searchableOperators: ReadonlyArray<OperatorSchema> = [];
  // Monotonic id of the newest query, so a slow response for an older
  // keystroke cannot overwrite the results of a newer one.
  private latestQueryId = 0;

  // fuzzy search using fuse.js. See parameters in options at https://fusejs.io/
  public fuse = new Fuse([] as ReadonlyArray<OperatorSchema>, {
    shouldSort: true,
    threshold: 0.3,
    location: 0,
    distance: 100,
    minMatchCharLength: 1,
    keys: ["additionalMetadata.userFriendlyName"],
  });

  constructor(
    private operatorMetadataService: OperatorMetadataService,
    private workflowActionService: WorkflowActionService,
    private workflowUtilService: WorkflowUtilService,
    private dragDropService: DragDropService,
    private semanticSearchService: SemanticOperatorSearchService,
    private nextOperatorService: NextOperatorService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    // clear the search box if an operator is dropped from operator search box
    this.dragDropService.operatorDropStream.pipe(untilDestroyed(this)).subscribe(() => {
      this.searchInputValue = "";
      this.autocompleteOptions = [];
    });
    this.workflowActionService
      .getWorkflowModificationEnabledStream()
      .pipe(untilDestroyed(this))
      .subscribe(canModify => (this.canModify = canModify));
    this.operatorMetadataService
      .getOperatorMetadata()
      .pipe(untilDestroyed(this))
      .subscribe(operatorMetadata => {
        const ops = operatorMetadata.operators.filter(
          operatorSchema => operatorSchema.operatorType !== "PythonUDF" && operatorSchema.operatorType !== "Dummy"
        );
        this.groupNames = operatorMetadata.groups;
        ops.forEach(x => {
          if (x.operatorType !== "Sleep") {
            const group = x.additionalMetadata.operatorGroupName;
            const list = this.opList.get(group) || [];
            list.push(x);
            this.opList.set(group, list);
          }
        });
        this.opList.forEach(value => {
          value.sort((a, b) => a.operatorType.localeCompare(b.operatorType));
        });
        this.fuse.setCollection(ops);
        this.searchableOperators = ops;
      });

    this.workflowActionService
      .getJointGraphWrapper()
      .getJointOperatorHighlightStream()
      .pipe(untilDestroyed(this))
      .subscribe(ids => this.updateSuggestions(ids));
  }

  /**
   * Offers a next step for a single selected operator. A multi-selection has no
   * one "after", and an empty selection nothing to follow, so both clear.
   */
  private updateSuggestions(selectedIds: readonly string[]): void {
    const graph = this.workflowActionService.getTexeraGraph();
    if (selectedIds.length !== 1 || !graph.hasOperator(selectedIds[0])) {
      this.selectedOperatorId = null;
      this.selectedOperatorName = "";
      this.nextSuggestions = [];
      this.nextStepNote = "";
      this.changeDetectorRef.detectChanges();
      return;
    }

    const operatorId = selectedIds[0];
    const operator = graph.getOperator(operatorId);
    const schema = this.searchableOperators.find(s => s.operatorType === operator.operatorType);
    if (schema === undefined) {
      this.selectedOperatorId = null;
      this.nextSuggestions = [];
      this.nextStepNote = "";
      return;
    }

    this.selectedOperatorId = operatorId;
    this.selectedOperatorName = operator.customDisplayName ?? schema.additionalMetadata.userFriendlyName;

    this.nextOperatorService.suggestionsFor(schema.additionalMetadata.operatorGroupName).then(result => {
      // The selection may have moved on while the rules were loading.
      if (this.selectedOperatorId !== operatorId) {
        return;
      }
      this.nextSuggestions = result.suggestions;
      this.nextStepNote =
        result.suggestions.length > 0
          ? ""
          : result.known
            ? "Nothing usually follows this — it ends the workflow."
            : "No suggestions for this group yet.";
      this.changeDetectorRef.detectChanges();
    });
  }

  /**
   * Places a suggested operator to the right of the selected one and wires them
   * together, as one undoable step — the point is to skip the search entirely.
   */
  public addNext(schema: OperatorSchema): void {
    const operatorId = this.selectedOperatorId;
    if (operatorId === null || !this.canModify) {
      return;
    }

    const newOperator = this.workflowUtilService.getNewOperatorPredicate(schema.operatorType);
    const anchor = this.workflowActionService.getJointGraphWrapper().getElementPosition(operatorId);
    const position = { x: anchor.x + 220, y: anchor.y };

    const source = this.workflowActionService.getTexeraGraph().getOperator(operatorId).outputPorts[0];
    const target = newOperator.inputPorts[0];
    // A source operator has no input and a sink no output; without both ends
    // there is nothing to connect, so place it and let the user wire it.
    const links =
      source && target
        ? [
            {
              linkID: this.workflowUtilService.getLinkRandomUUID(),
              source: { operatorID: operatorId, portID: source.portID },
              target: { operatorID: newOperator.operatorID, portID: target.portID },
            },
          ]
        : [];

    this.workflowActionService.addOperatorsAndLinks([{ op: newOperator, pos: position }], links);

    // Adding an operator leaves nothing selected, which would close this panel
    // after a single use. Selecting what was just placed keeps the chain going:
    // the panel immediately offers what comes after it.
    this.workflowActionService.getJointGraphWrapper().highlightOperators(newOperator.operatorID);
  }

  /**
   * Runs a search whenever the box changes, through whichever ranker is active.
   */
  onInput(e: Event): void {
    this.runSearch((e.target as HTMLInputElement).value);
  }

  /** Relevance of a suggestion, formatted for display, or undefined if ranked by keyword. */
  public scoreLabel(operator: OperatorSchema): string | undefined {
    const score = this.semanticScores.get(operator.operatorType);
    return score === undefined ? undefined : score.toFixed(2);
  }

  private runSearch(query: string): void {
    const queryId = ++this.latestQueryId;

    if (query === null || query.trim().length === 0) {
      this.autocompleteOptions = [];
      this.semanticScores.clear();
      return;
    }

    // One box, two rankers, no choice to make. The keyword search answers
    // instantly and exactly, so its results go up straight away and the box
    // never waits on a model to load.
    const keywordHits = this.fuse.search(query).map(item => item.item);
    this.autocompleteOptions = keywordHits.slice(0, MAX_RESULTS);
    this.semanticScores.clear();

    this.semanticLoading = !this.semanticSearchService.isReady();

    this.semanticSearchService
      .search(query, this.searchableOperators, SEMANTIC_LIMIT)
      .then(hits => {
        // A newer keystroke already answered — drop this stale result.
        if (queryId !== this.latestQueryId) {
          return;
        }
        this.semanticScores = new Map(hits.map(hit => [hit.schema.operatorType, hit.score]));
        // Naming an operator must still put that operator first, so keyword
        // hits keep their places and the ranked ones fill what is left. A query
        // phrased as an intent matches no name, so it lands entirely on the
        // second list — which is the case the palette could not serve before.
        const alreadyShown = new Set(keywordHits.map(schema => schema.operatorType));
        this.autocompleteOptions = [
          ...keywordHits,
          ...hits.map(hit => hit.schema).filter(schema => !alreadyShown.has(schema.operatorType)),
        ].slice(0, MAX_RESULTS);
        this.semanticLoading = false;
      })
      .catch(() => {
        if (queryId !== this.latestQueryId) {
          return;
        }
        // A failed model download or a corrupt index leaves the keyword results
        // standing, which is exactly the palette's previous behaviour.
        this.semanticLoading = false;
      });
  }

  /**
   * handles the event when an operator search option is selected.
   * adds the operator to the canvas and clears the text in the search box
   */
  onSelectionChange(e: NzAutocompleteOptionComponent): void {
    const selectSchema = e.nzValue as OperatorSchema;
    // add the operator to the graph on select (position relative to the current viewpoint)
    const origin = this.workflowActionService.getJointGraphWrapper().getMainJointPaper()?.translate();
    const point = { x: 400 - (origin?.tx ?? 0), y: 200 - (origin?.ty ?? 0) };
    this.workflowActionService.addOperator(
      this.workflowUtilService.getNewOperatorPredicate(selectSchema.operatorType),
      point
    );

    // asynchronously immediately clear the search input and suggestions
    // because ng-zorro shows the selected value if it's synchronously
    setTimeout(() => {
      this.searchInputValue = "";
      this.autocompleteOptions = [];
    }, 0);
  }
}
