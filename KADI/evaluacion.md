# Evaluation

## The measurement that counts

**166 queries — one per operator.** Written by a team member from the operator
catalogue alone, before opening `operator-hints.json`, so the set is independent
of the index it measures. A hit means the expected operator is returned; strict,
with no partial credit.

| | top-1 | top-3 |
|---|---|---|
| Keyword search (unchanged fuse.js) | 1 / 166 — **1 %** | 2 / 166 — **1 %** |
| Semantic search | 102 / 166 — **61 %** | 138 / 166 — **83 %** |

The keyword search finds one operator out of 166. Not because of phrasing or
language: fuse.js compares the whole query against the operator's name, so the
only queries it can answer are the ones that already contain the name.

## By group

The two largest groups in the catalogue are also two of the strongest.

| Group | Operators | Semantic top-3 | Keyword top-3 |
|---|---|---|---|
| Sklearn | 28 | 89 % | 0 % |
| Sklearn Training | 26 | 85 % | 8 % |
| Basic (charts) | 16 | 81 % | 0 % |
| Scientific | 14 | 79 % | 0 % |
| Statistical | 8 | 63 % | 0 % |
| Financial | 5 | 60 % | 0 % |
| Hugging Face | 5 | 80 % | 0 % |
| Data Cleaning, Data Input, Python, Sort, Utilities, External API, Media, Database Connector, R, Java | 45 | **100 %** | 0 % |
| Set | 4 | 50 % | 0 % |
| Advanced Sklearn | 4 | 0 % | 0 % |

## What the failures revealed

Of the 28 queries that missed the top 3, several are not ranking failures at
all — Texera lists the same capability under more than one operator:

| Query | Expected | Returned |
|---|---|---|
| Classify data points by their k nearest neighbors | KNN Classifier | K-nearest Neighbors |
| Classify data using a support vector machine | SVM Classifier | Linear Support Vector Machine |
| Predict a continuous value using a support vector machine | SVM Regressor | Linear Support Vector Machine |

`KNN Classifier` and `K-nearest Neighbors` are the same thing under two names,
as are `Radar Chart` and `Radar Plot`, and `Tables Plot` and `Figure Factory
Table`. No ranker can separate operators the catalogue itself does not separate.
That accounts for the whole of the Advanced Sklearn group's 0 %.

**These are left in the failure count.** Excusing them would need a second,
looser metric, and 61 % against 1 % does not need help.

The genuine failures cluster in chart selection — `Histogram` against
`Empirical Cumulative Distribution Plot`, `Line Chart` against `Time Series
Plot` — where the distinction is one of convention rather than of meaning, and
the descriptions ("Visualize data in a Histogram Chart") repeat the name instead
of saying when to reach for it.

## Two claims that need no caveat

- **Nothing is lost.** Queries that name the operator still rank it first, 10 out
  of 10. Semantic search is a superset of what the box already did.
- **The keyword search fails in its own language.** Measured in English and in
  Spanish, across three separate sets, it never exceeded 1 %.

## An earlier attempt that failed

We enriched the index with every operator's configuration fields, reasoning that
`Hash Join`'s *"Left Input Attribute: attribute to be joined on"* carries meaning
its three-word description omits. It ranked **worse**:

| Query | Base index | With fields |
|---|---|---|
| Count how many times each category appears | Aggregate (1st) | Limit (1st), Aggregate (3rd) |
| Split a single column into multiple columns | Split (1st) | Aggregate (1st), Split (2nd) |
| Merge rows from two tables into one output | Union (2nd) | Union (3rd) |

Generic field names are shared across unrelated operators, so adding them pulls
those operators together: noise, not signal. Reverted.

## Method

See [`metodo.md`](metodo.md). The short version: the 166-query set is
independent and its numbers stand. An earlier 19-query set was used both to
measure and to decide where to add phrasings, so its score is not quotable.
