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

## About the base project

A fork of [Apache Texera (incubating)](https://github.com/apache/texera), an
open-source platform for human-AI collaborative data science through visual
workflows.

Texera's own documentation lives in [`docs/`](docs/); build and contribution
instructions in [`CONTRIBUTING.md`](CONTRIBUTING.md).
