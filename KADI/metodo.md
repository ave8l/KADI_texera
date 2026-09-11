# Method — and which numbers hold up

## The measurement that counts

The set of **166 queries**, one per operator, in
[`consultas-evaluacion.md`](consultas-evaluacion.md), is independent of the
index it measures:

- A team member wrote them from [`catalogo-operadores.md`](catalogo-operadores.md)
  alone, which contains only Texera's own metadata.
- They were written **before opening** [`operator-hints.json`](operator-hints.json),
  so they cannot echo the phrasings the index was built from.
- The expected operator for each query was fixed **before** anything was run.
- They were measured **once**.

Its numbers are in [`evaluacion.md`](evaluacion.md) and can be quoted.

## An earlier set that cannot be quoted

A first set of 19 intent queries was used to measure, and then used again to
decide which operators needed phrasings. Those for `Sort`, `Aggregate`, `Split`,
`Regular Expression` and `Keyword Search` were written knowing those intents
were on the test.

They were written by describing what the operator does, not by copying the
query — but that is not enough. **The set stopped being independent the moment a
failure was looked at and acted upon.** Its score measures how closely the index
was fitted to those 19 sentences, not how well the search works.

**Do not present that number.**

## If the index changes again

Any further tuning burns the 166-query set the same way. A new number then needs
a new set, written by someone who has not read the phrasings, with expected
answers fixed before running. This is not a formality — it is the whole
difference between a result and a reflection of one's own work.

## What holds regardless of the index

Neither of these depends on tuning, and neither has been touched:

- **The keyword search returns nothing.** Across three separate sets, in English
  and in Spanish, it never exceeded 1%. Not a language problem: fuse.js compares
  the whole query against the operator's name, so the only queries it can answer
  are the ones that already contain the name.
- **Nothing was taken away.** Queries that name the operator still rank it first,
  10 out of 10. The new ranking is a superset of the old behaviour.

## The hover card needs no evaluation

It has nothing to measure. The description is Texera's own metadata and the
connections are read from the workflow graph, so the card is either correct or
the graph is — there is no ranking, no model and no failure mode to quantify.
