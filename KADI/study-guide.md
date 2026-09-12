# Study guide

What you have to be able to explain without looking. If you can't say something
here in your own words, that's a gap.

---

## The three base concepts

**Embedding.** Turning a text into a list of numbers (384 here) that stands for
its meaning. Texts that mean similar things get similar lists. It isn't a
translation or a summary — it's a position in a space.

**Cosine similarity.** Measures how far two of those lists point in the same
direction. Runs from −1 to 1. Because we normalise the vectors, the dot product
**is** the similarity — which is why the computation is 384 multiplications and
takes no time at all.

**It is not an accuracy percentage.** A correct answer can score 0.25 and a
wrong one 0.54. What matters is **the gap between the first result and the
second**.

---

## Feature 1 · Semantic search

**What it fixes.** The palette indexed only `userFriendlyName`. A phrase looks
nothing like "Distinct", so it found nothing.

**How it works.**
1. An offline script reads the metadata of all 166 operators
2. Builds one text per operator: name + group + description + phrasings
3. Embeds it with `all-MiniLM-L6-v2` and writes the vectors to a 486 KB JSON
4. That JSON **is committed** to the repository
5. In the browser, only **the user's query** is embedded
6. Cosine against the 166, sorted, best ones shown

**Where the model runs.** In the browser, through Transformers.js on
WebAssembly. Downloaded once (23 MB) from a public CDN and cached.
**No backend, no API key, no cost per query.**

**How the two searches merge.** One box. `fuse.js` — the original — answers
first and **keeps its places**; the ranked results fill what is left. That is
why typing `Sort` is still instant and exact, and why a phrase, which matches no
name, lands entirely on the semantic side.

**If the model fails to load**, the fuse results stand alone: Texera's original
behaviour.

**The number:** 2/166 against 138/166 in the top three.

**Worth knowing even unasked:** the multilingual model scored 6/19 and the
English one 14/19. The larger retrieval-tuned models (mpnet, bge, gte)
**gained nothing**, because an operator's text is a dozen words, not a paragraph.

---

## Feature 2 · Context on hover

**What it fixes.** On the canvas you only see a name. If someone renamed the
operator, not even that.

**How it works.** Two halves, **neither is a model**:
- The **description** comes from Texera's own metadata, already loaded in the frontend and never shown
- The **connections** are read from the workflow graph at that moment

**Why it is reactive.** Drawing a link starts on the operator's own port, so the
cursor never leaves it and no fresh `mouseenter` refreshes the card. It
subscribes to the graph's streams — link added, removed, operator renamed,
deleted — and rebuilds in place.

**The detail people ask about:** it cannot be wrong, because it infers nothing.
Either the graph is right or it isn't.

---

## Feature 3 · Next operator

**What it fixes.** Sometimes you don't have an intent to search for: you have a
workflow, and you want to know what comes next.

**Why embeddings are NOT used.** They measure **similarity**, not **sequence**.
Asking what follows `Sort` would return `Sort Partitions` and `Stable Merge
Sort` — the operators most like Sort, exactly the ones you don't want. **This is
the strongest technical answer you have; learn it word for word.**

**How it works.** A JSON table of 26 rules, one per operator group. Twenty-six
rules cover all 166 because they key on the group, not the operator.

**Where the order comes from.** Texera's own two example workflows: 29 real
links between operators. Where they contradicted our first draft, **they won**.
They corrected four groups.

**What a click does.** Places the operator to the right, wires it, and leaves it
selected — so the panel immediately offers the next step and you can chain. All
one undoable action.

**Coverage:** 166/166. The 50 chart operators map to an empty list **on
purpose** and say *"nothing usually follows this"*.

---

## What this is not

| Not | Is |
|---|---|
| Statistics | 29 observations from 2 documents |
| An LLM | Vector comparison |
| Machine learning we trained | A pre-existing model plus a hand-written table |
| A replacement for the search | A layer on top; the original still runs |

---

## The numbers, from memory

| | |
|---|---|
| Operators in Texera | **166**, across 26 groups |
| Evaluation queries | **166**, one per operator |
| Original search, top-3 | **2 / 166** |
| Ours, top-3 | **138 / 166** (83%) |
| Ours, top-1 | **102 / 166** (61%) |
| Exact-name queries | **10 / 10** |
| Index | 486 KB, 384 dimensions |
| Model | 23 MB, in the browser |
| Code | +822 / −16, none in the backend |
| Links mined | **29**, from 2 workflows |

---

## The three gaps to admit

1. **29 links are not statistics.** Evidence enough to correct us, not enough to
   prove the rest.
2. **An older 19-query set is not quotable** — it was used to measure and then to
   decide where to add phrasings.
3. **Mixed groups.** `Utilities` gives the same suggestion to all five of its
   operators, and for `Unnest String` it doesn't fit. Diagnosed, not fixed.
