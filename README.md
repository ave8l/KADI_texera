# KADI_texera

Submission for the UP Hackathon, 11–12 September 2026, built on Apache Texera.

---

## Semantic operator search

Texera ships **166 operators** across 26 groups. The palette's search box
compares what you type against the operator's **name** and nothing else, so a
query phrased as an intent finds nothing — even when the operator's own
description says exactly that. All 166 descriptions exist. None is ever read.

Put plainly: **the current search only helps someone who already knows the
answer.**

This work adds search by meaning, computed **entirely in the browser**: no
backend, no API key, no per-query cost.

### What we measured

Across 40 natural-language queries, in English and in Spanish, the existing
search returned **zero results every time**. Not a language problem — fuse.js
matches the whole query against the operator name, so only the name works.

Queries that *do* name the operator still rank it first, **10 out of 10**: the
new ranking gives up nothing the old one could do.

Method, results and their limits: [`KADI/evaluacion.md`](KADI/evaluacion.md).
Read [`KADI/metodo.md`](KADI/metodo.md) before quoting any accuracy figure — it
explains which numbers are trustworthy and which are not yet.

### How it works

Vectors for all 166 operators are generated **offline** and committed to the
repository. At runtime only the user's query is embedded, by a 23 MB model
running in WebAssembly inside the browser, cached after first use.

Design decisions and what we tried that failed:
[`KADI/README.md`](KADI/README.md).

---

## Operator context on hover

The palette explains an operator until you drop it. After that the canvas shows
a name and nothing else, and a renamed operator shows not even that — so reading
someone else's workflow means clicking every box in turn.

Hovering an operator now gives its group and description together with **its
neighbours in this workflow**:

```
Count per department
Aggregate
Calculate different types of aggregation values
──────────────────────────────────────────────
←  from  Drop unknown
→  to    Busiest first, Share of tickets
```

The wiring is the half that cannot be read off the operator alone, and it comes
from the workflow graph rather than a model: it cannot be wrong, and it updates
as you connect and disconnect — including while the card is open, which is when
it matters, since drawing a link never takes the cursor off the operator.

It stays quiet while the Performance overlay is on, which already owns the
hover, and still renders for an operator whose type is missing from the metadata.

## Try it

[`KADI/workflows/`](KADI/workflows/) holds a demo workflow. Import it from the
Workflows page with the upload button next to *Create Workflow*.

It sources its rows from a Text Input rather than a file, so it runs on a fresh
instance with no dataset uploaded. `Count per department` deliberately feeds two
branches, which is the operator worth hovering.

---

## How it was built

The palette's search already existed. We left it in place and added a second
ranker beside it, so the two can be compared and either can be switched off.

**1 · An offline index.**
[`frontend/scripts/generate-operator-embeddings.mjs`](frontend/scripts/generate-operator-embeddings.mjs)
reads the response of `GET /api/resources/operator-metadata`, builds one line of
text per operator from its name, group, description and any hand-written
phrasings, and embeds each one. The result is committed as
`frontend/src/assets/operator-embeddings.json` — 166 operators × 384 dimensions,
486 KB. This runs on a developer's machine, never in the app.

**2 · A ranker in the browser.**
[`semantic-operator-search.service.ts`](frontend/src/app/workspace/service/semantic-search/semantic-operator-search.service.ts)
loads that index, lazily imports Transformers.js on first use, embeds the user's
query and scores it against all 166 vectors by cosine similarity. Both sides are
normalised, so a dot product is the similarity. One shared warm-up promise means
a burst of keystrokes cannot start several model downloads.

**3 · A toggle in the palette.**
[`operator-menu.component.ts`](frontend/src/app/workspace/component/left-panel/operator-menu/operator-menu.component.ts)
routes each keystroke to whichever ranker is active. Queries carry a sequence
number, so a slow answer for an earlier keystroke cannot overwrite a newer one,
and any failure to load the model falls back to the keyword search rather than
leaving the box unresponsive.

**4 · The hover card.** `workflow-editor.component.ts` builds it from the
operator's schema plus the graph's links, and subscribes to link, rename and
delete streams so an open card follows the graph instead of the cursor.

Nothing in the Texera backend was touched.

## How to use it

**Type what you want to do, not what it is called.** "remove repeated rows"
rather than "Distinct". The box accepts both — an exact name still ranks first.

**The first query in a fresh browser downloads the model** (23 MB) and shows
*loading model…*. After that it is cached and instant.

**Each result carries three things:** the operator's name, its relevance score,
and its own description. The description is there so you can choose without
opening anything.

**Read the gap, not the number.** The score is cosine similarity, not an
accuracy percentage. `Distinct 0.71` above `Limit 0.52` is a confident answer;
`0.59` above `0.55` is a tie, and the descriptions are what settle it.

**Clicking a result places the operator on the canvas**, at the current viewport
position — the same behaviour the old search had.

**Turning the toggle off restores the original keyword search.** If it then
returns nothing, the palette says so and offers to switch back.

**Phrasings are how you improve it.** [`KADI/operator-hints.json`](KADI/operator-hints.json)
maps an operator's display name to the wordings a user would reach for. Edit it,
re-run the generator, and the ranking changes. No model training involved.

---

## About the base project

A fork of [Apache Texera (incubating)](https://github.com/apache/texera), an
open-source platform for human-AI collaborative data science through visual
workflows.

Texera's own documentation lives in [`docs/`](docs/); build and contribution
instructions in [`CONTRIBUTING.md`](CONTRIBUTING.md).
