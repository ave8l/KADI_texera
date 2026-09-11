# KADI — Semantic operator search for Texera

UP Hackathon, 11–12 September 2026. Team of two.

## The problem

Texera exposes **166 operators** across 26 groups. The palette's search box is
configured like this:

```ts
keys: ["additionalMetadata.userFriendlyName"]
```

It indexes **the name only**. Each operator's description — which exists for all
166 and is already loaded in the frontend — is never consulted. So you search
for what you want to do and find nothing; the box only works if you already know
what the operator is called.

## The solution

Search by meaning, computed **entirely in the browser**:

- `Xenova/all-MiniLM-L6-v2` through Transformers.js
- All 166 operators indexed **offline**, their vectors committed
- At runtime only the user's query is embedded
- Cosine similarity against the 166 vectors, top 3

**No backend. No API key. No cost.** The model runs in WebAssembly and is cached
after the first download.

## Why this model

We benchmarked four English models and one multilingual model against 19 intent
queries with known answers.

| Model | top-1 | top-3 |
|---|---|---|
| **all-MiniLM-L6-v2** | **14 / 19** | **17 / 19** |
| all-mpnet-base-v2 | 11 / 19 | 17 / 19 |
| bge-small-en-v1.5 | 11 / 19 | 14 / 19 |
| gte-small | 10 / 19 | 12 / 19 |
| paraphrase-multilingual-MiniLM-L12-v2 | 6 / 19 | 15 / 19 |

The smallest and fastest model won. Larger retrieval-tuned models gained
nothing: an operator's indexed text is a dozen words, not a paragraph, and
ranking short labels is not what those models are trained for.

The multilingual model was our first choice and cost the most. A multilingual
model spreads its capacity across languages, and on text this short there is
none to spare.

## Phrasings

Texera's descriptions are often three words — `Hash Join` is documented as
*"join two inputs"*. That leaves the ranker almost nothing to match against, and
it is the ceiling on how well **any** search over this metadata can work.

[`operator-hints.json`](operator-hints.json) adds, per operator, the wording a
user would actually reach for. Plain JSON keyed by the operator's display name,
meant to be edited by hand.

Concretely: for *"remove repeated rows"*, `Distinct` led `Limit` by 0.04 — the
right answer with no real separation, because *"limit the number of output
rows"* shares the vocabulary of rows and of producing fewer of them. With
phrasings the gap became 0.19.

## What we tried that did not work

We enriched the index with every operator's configuration fields, on the theory
that `Hash Join`'s *"Left Input Attribute: attribute to be joined on"* carries
the meaning its description omits.

**It ranked worse.** Many operators share generic field names, so adding them
pulls unrelated operators toward each other: noise, not signal. Reverted; the
numbers are kept in [`evaluacion.md`](evaluacion.md) so nobody repeats it.

## Layout

| Path | What it is |
|---|---|
| `frontend/scripts/generate-operator-embeddings.mjs` | Index generator (offline) |
| `frontend/src/assets/operator-embeddings.json` | 166 operators × 384 dims, 486 KB |
| `frontend/src/app/workspace/service/semantic-search/` | The ranker |
| `KADI/operator-hints.json` | Hand-written phrasings |
| `KADI/evaluacion.md` | Measurements |
| `KADI/metodo.md` | Which numbers are trustworthy |

Rebuild the index:

```bash
node frontend/scripts/generate-operator-embeddings.mjs \
  <metadata.json> frontend/src/assets/operator-embeddings.json KADI/operator-hints.json
```

where `<metadata.json>` is the response of `GET /api/resources/operator-metadata`.
