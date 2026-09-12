# Slide outline — 15 min + 5 for questions

18 slides. Time and speaker marked per block.

---

## The problem — 2 min · A

**1 · Title**
KADI · *Making Texera's 166 operators findable* · your two names · UP Hackathon 2026

**2 · The scale**
**166** in large type · *operators, across 26 groups* · screenshot of the palette

**3 · How it searches today**
`keys: ["additionalMetadata.userFriendlyName"]` in large type · *the search reads the name. Nothing else.*

**4 · The line that lands**
One sentence alone: **"The search only helps you if you already know the answer."**

---

## Semantic search — 4 min · A demos, B explains

**— LIVE DEMO, two screens —**
`remove repeated rows` on stock Texera → nothing · same phrase on ours → Distinct 0.71 · type `Sort` to show nothing was broken

**5 · The three pieces**
Diagram: `166 operators → [offline generator] → embeddings.json (486 KB) → browser`

**6 · No server**
Screenshot of the empty network tab · **No backend · No API key · No cost**

**7 · Why this model**
The five-model benchmark table (the smallest wins: 14/19)

---

## Context on hover — 2:30 · B

**8 · The problem**
Screenshot of a canvas showing only names · *The palette explains an operator until you drop it.*

**— LIVE DEMO —**
Hover `Count per department` — it has two outgoing branches

**9 · Where it comes from**
Two columns: *Description → Texera's metadata* · *Connections → the workflow graph* · neither is a model

---

## Next operator — 3 min · A

**10 · The idea**
*Instead of searching, be offered.*

**— LIVE DEMO —**
Select → click → places and wires → stays selected → click again. **Chain three.**

**11 · Why embeddings are NOT used here**
```
"what comes after Sort?"
  embeddings → Sort Partitions, Stable Merge Sort
               (the operators most LIKE Sort)
```
*Similarity is not sequence.*

**12 · Where the rules come from**
26 rules → all 166 operators covered · ordered by **29 real links** from Texera's own example workflows · they corrected 4 of our groups

---

## How it is built — 2 min · B

**13 · The footprint**
**822 lines added, 16 removed** · 2 new services, 7 files touched · **0 backend changes**

**14 · The 16 removed lines**
10 were the original search routing · the other 6 reindentation · *the original search still runs on every query*

---

## What we measured — 1 min · B

**15 · The number**

| | Top-3 |
|---|---|
| Texera's search | **2 / 166** |
| Ours | **138 / 166** |

166 queries, one per operator, written without seeing the index

**16 · And nothing was lost**
Exact names: **10/10** · suggestion coverage: **166/166**

---

## Limits and close — 30 s · A

**17 · What doesn't work**
28 misses · some are duplicates in the catalogue itself (KNN Classifier / K-nearest Neighbors) · we left them counted as failures

**18 · Close + repository URL**
*"The next step isn't a bigger model. It's giving the operators descriptions that say when to use them."*

---

## If you run short

Cut in this order: **7** → second half of **14** → **16**.
**Never:** the live demos, slide 15, or the limits block.
