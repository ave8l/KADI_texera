# What this fork changes in Texera

Measured against `4d7fd493a`, the Apache Texera commit this work branched from:

```bash
git diff 4d7fd493a HEAD --stat
```

## Headline

**822 lines of code added, 16 removed** across 9 files.
The work is almost entirely additive: no existing behaviour was replaced,
only extended. Nothing in the backend was touched.

## New source files

| File | Added | Removed | Purpose |
|---|---|---|---|
| `frontend/src/app/workspace/service/next-operator/next-operator.service.ts` | +88 | −0 | Reads the rule table and returns what to add after a given operator group |
| `frontend/src/app/workspace/service/semantic-search/semantic-operator-search.service.ts` | +118 | −0 | Loads the index, embeds the query in the browser, ranks by cosine similarity |

## Texera files modified

| File | Added | Removed | What changed |
|---|---|---|---|
| `frontend/src/app/workspace/component/left-panel/operator-menu/operator-menu.component.ts` | +189 | −10 | Search toggle, suggestion panel, add-and-connect |
| `frontend/src/app/workspace/component/workflow-editor/workflow-editor.component.ts` | +139 | −1 | Hover card and the graph subscriptions that keep it current |
| `frontend/src/app/workspace/component/left-panel/operator-menu/operator-menu.component.scss` | +128 | −1 | Styles for the toggle, the ranked results and the suggestion panel |
| `frontend/src/app/workspace/component/left-panel/operator-menu/operator-menu.component.html` | +62 | −2 | Toggle, relevance score, per-result description, suggestions |
| `frontend/src/app/workspace/component/workflow-editor/workflow-editor.component.scss` | +48 | −0 | Hover card styling |
| `frontend/src/app/workspace/component/workflow-editor/workflow-editor.component.html` | +34 | −0 | Hover card markup |
| `build.sbt` | +16 | −2 | Windows launcher classpath fix — a development-environment fix, not a feature |
| `frontend/package.json` | +1 | −0 | Adds the @xenova/transformers dependency |

## The 16 removed lines

Worth naming, since it is the only existing behaviour that was displaced.

**Ten** are in `operator-menu.component.ts`: the original `onInput`, which
called fuse.js directly. It was replaced by a router that chooses between
fuse.js and the semantic ranker. **The original search is still there and
still works** — it simply stopped being the only path.

The remaining six are not behaviour at all:

| File | Removed | What |
|---|---|---|
| `build.sbt` | 2 | The two settings lines the fix extends |
| `operator-menu.component.html` | 2 | Reindented tags around the search box |
| `operator-menu.component.scss` | 1 | The `#spacer` height, replaced by a named sum |
| `workflow-editor.component.ts` | 1 | The constructor's last parameter line, now followed by another |

## Data and generator

| File | Size | Purpose |
|---|---|---|
| `frontend/scripts/generate-operator-embeddings.mjs` | 3 KB | Builds the index offline; never runs in the app |
| `frontend/src/assets/next-operator-rules.json` | 2 KB | What follows each operator group |
| `frontend/src/assets/operator-embeddings.json` | 485 KB | The 166 operator vectors, 384 dimensions each |

## What was not touched

- The entire backend: Scala, the Amber engine, all ten microservices, the
  database and every API
- Workflow execution, persistence, versioning and real-time collaboration
- The other ~520 TypeScript files in the frontend

Two components of the frontend carry the whole feature set: the operator
palette and the canvas editor.

## Documentation added

Twelve files under `KADI/`, listed in [`cierre.md`](cierre.md), plus the
repository's own `README.md` (+147 / −92), which is documentation rather than
code and is excluded from the counts above.

## Reviewing it

```bash
git diff 4d7fd493a HEAD --stat                 # everything
git diff 4d7fd493a HEAD -- '*.ts'              # only TypeScript
git log --oneline --no-merges 4d7fd493a..HEAD  # commit by commit
```
