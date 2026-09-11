# Guion de presentación — 3 minutos en vivo

**Lo que decís va en inglés** (el jurado solo habla inglés).
**Las acotaciones van en español** — son para vosotros, no se dicen.

**A** narra y maneja la pantalla. **B** entra en el "cómo funciona" y en Q&A.
Los `[CAPTURA n]` son los huecos de imagen.

---

## 1 · El problema — 30 s · habla A

> "Texera ships **166 operators** across 26 groups. Before you can use one, you
> have to find it."

`[CAPTURA 7 — la paleta con los grupos plegados]`

> "The search box compares what you type against the operator's **name**. That's
> all. Every operator has a description — all 166 of them — and the search never
> reads it."

**El remate. Pausa antes y después:**

> "Which means the search only helps you **if you already know the answer**."

---

## 2 · Demo en vivo — 90 s · maneja A

Lo importante: **que se vea, no que se narre.**

**Paso 1 — el estado actual.** Toggle apagado. Escribir:

```
remove repeated rows
```

Callarse dos segundos. Dejar que vean la caja vacía y el mensaje.

> "No results. And that's English — the language of the interface."

`[CAPTURA 3 — toggle apagado, mensaje "No results. Try search by meaning"]`

**Paso 2 — encender.** Clic en el propio mensaje, sin borrar el texto.

> "Same query."

`[CAPTURA 4 — Distinct arriba, con su score y su descripción]`

**Paso 3 — leer el resultado en voz alta.** Señalar la pantalla:

> "Distinct, at 0.71. Below it, Limit at 0.52 — so the top answer stands clear.
> And each one shows what it does, so you decide without opening anything."

**Paso 4 — cerrar el ciclo.** Clic en Distinct → aparece en el canvas.

`[CAPTURA 6 — el operador ya colocado en el workflow]`

> "It doesn't just find it. It places it."

**Paso 5 — el hover, sin cambiar de tema.** Conectarlo y dejar el cursor encima
del operador. Sale la tarjeta sola.

`[CAPTURA 10 — la tarjeta sobre Count per department, con from y to]`

> "And once it's on the canvas, the canvas explains it. What it does — and what
> it's wired to, right here in this workflow."

**Señalar las dos líneas de abajo:**

> "That part isn't a guess. It's read from the graph, so it updates as you wire."

---

## 3 · Cómo funciona — 30 s · habla B

> "The vectors for all 166 operators are computed **once, offline**, and
> committed to the repository. When you type, the only thing computed is the
> vector for **your sentence** — and it's computed **inside your browser**."

`[CAPTURA 9 — pestaña de red sin peticiones durante una búsqueda]`

> "No server. No API key. No cost per query. That network tab is empty because
> there's nobody to ask."

---

## 4 · Lo que medimos — 30 s · habla B

> "We measured against the existing search, with its configuration untouched."

**Enseñar la cifra en pantalla mientras se dice:**

> "One hundred and sixty-six queries. One per operator. Written by my teammate
> from the catalogue alone, before seeing anything about how the index works."

> "The existing search finds the right operator **twice**. Out of a hundred and
> sixty-six."

**Pausa. Dejar que ese número aterrice.**

> "Ours finds it in the top three **a hundred and thirty-eight times**. Eighty-three
> percent, against one."

**Si hay tiempo, el dato que remata:**

> "The Sklearn operators are a third of the catalogue — fifty-four of them. That's
> where we expected to fail. We get eighty-five to eighty-nine percent."

---

## 5 · Hasta dónde llega — 30 s · habla B

**Decirlo nosotros, antes de que lo pregunten.**

> "Twenty-eight queries miss. We looked at every one of them."

> "Some aren't ours to fix. Texera lists **KNN Classifier** and **K-nearest
> Neighbors** as separate operators. Same for **Radar Chart** and **Radar Plot**.
> No search can separate what the catalogue doesn't separate — and we left those
> counted as failures rather than write ourselves a kinder metric."

> "The real misses are charts. Histogram against cumulative distribution plot.
> The descriptions just repeat the name — 'Visualize data in a Histogram Chart' —
> so there's nothing to tell them apart by."

> "We also tried enriching the index with each operator's configuration fields.
> It got **worse**. We reverted it and wrote down the numbers."

**El cierre:**

> "The highest-value next step isn't a bigger model. It's giving Texera's
> operators a description that says when to use them."

---

## Preguntas que van a caer

**"Does this need internet or a paid API?"**
No. The model is downloaded once from a public CDN and cached by the browser.
After that it works offline. There is no API key anywhere in this.

**"How did you pick the queries?"**
One per operator, all 166, written by a team member working from the operator
catalogue before seeing the index or the phrasings it was built from. The
expected answer was fixed before anything was run.

**"How fast is it?"**
The first query in a fresh browser downloads a 23 MB model. After that it's
instant — comparing against 166 vectors is nothing.

**"Why not use an LLM?"**
It isn't needed, and it would add a dependency, a cost and latency. This is
vector comparison. Texera's local setup does ship litellm, but with no API key
configured — anything built on that wouldn't have run today.

**"Does it scale to more operators?"**
The index is 486 KB for 166. Ten times the operators is a few megabytes, and the
comparison stays linear.

**"What is that number next to each result?"**
Cosine similarity between your sentence and the operator's text. It is **not** an
accuracy percentage. What matters is the gap between the first and the second:
0.71 against 0.52 is a confident answer, 0.59 against 0.55 is a tie.

**"Where does the hover text come from?"**
Two places, and neither is a model. The description is Texera's own metadata,
which the palette already had and the canvas never showed. The connections are
read from the workflow graph, so they cannot be wrong and they update live as
you wire.

**"Can I still use the old search?"**
Yes. The toggle switches between them, and if the model ever failed to load it
falls back to the keyword search instead of going dead.

---

## Checklist antes de subir

- [ ] **Calentar el modelo**: una búsqueda cualquiera 10 min antes de presentar
- [ ] Navegador en la pestaña correcta, zoom al 100 %
- [ ] Un workflow abierto con la paleta visible
- [ ] Toggle **apagado** de salida — la demo empieza en el estado "antes"
- [ ] El repositorio abierto en otra pestaña por si lo piden
- [ ] Repasar la respuesta de "what is that number" — es la que más se pregunta
