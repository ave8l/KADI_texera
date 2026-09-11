# Where the next-operator rules come from

The suggestions in `frontend/src/assets/next-operator-rules.json` have two
different origins, and the difference matters when someone asks how we know.

## Observed

Texera ships two example workflows written by its own team, in
`bin/single-node/examples/workflows/`. Together they hold 27 operators and 29
links. Every link is a real editorial decision about what follows what, so we
extracted them and let them set the order.

| Transition | Times observed |
|---|---|
| Data Input → Projection | 3 |
| Data Cleaning → Aggregate | 2 |
| Data Cleaning → Split | 2 |
| Data Cleaning → Word Cloud | 2 |
| Aggregate → Bar Chart | 2 |
| Python → Filter | 2 |
| Sklearn → Sklearn Prediction | 2 |
| Sklearn → Scatter Plot | 2 |
| Utilities → Split | 2 |
| Utilities → Linear Perceptron | 2 |
| Utilities → Decision Tree | 2 |
| Utilities → Sklearn Prediction | 2 |
| Aggregate → Pie Chart | 1 |
| Python → Aggregate | 1 |
| Data Cleaning → Python UDF | 1 |
| Data Input → Scatter Matrix Chart | 1 |

Where this evidence contradicted the first draft of the table, the evidence
won. It corrected four groups:

- **Aggregate** led with `Sort`, which never appears; the corpus goes straight
  to a chart.
- **Sklearn** did not offer `Sklearn Prediction` at all, the most frequent real
  continuation for that group.
- **Data Cleaning** did not offer `Split`, which appears twice.
- **Utilities** offered `Filter`, `Projection` and `Aggregate`, **none** of which
  is observed; in practice it feeds model training and prediction.

## Reasoned

The remaining groups have no observed transitions, because two example
workflows cannot cover 26 groups. Their entries are ordinary data-engineering
expectations — a database source is usually filtered or projected, a search is
usually aggregated — written by us and not derived from anything.

They are ordinary and defensible, but they are **not evidence**, and should not
be presented as such.

## What would make this solid

Two curated demo workflows are a small and biased corpus: they are teaching
material, not a record of how people work. The rules would become genuinely
data-driven with a body of real user workflows — which a deployed Texera
instance already stores, one row per workflow, in exactly the format mined
here. The same script would run over it unchanged.
