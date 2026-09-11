# Hoja de defensa — las preguntas difíciles

**Las respuestas van en inglés** (es lo que vais a decir).
**Las notas en español** explican por qué esa es la respuesta y qué trampa evita.

---

## "¿Esto es estadística?"

> "No. It's a small set of observations, and we treat it as such."

**Nota — esta es la pregunta más peligrosa del día.**

No es estadística y no hay que llamarlo así. Lo que tenemos son **29 enlaces de 2
workflows** escritos por una sola fuente como material didáctico. No hay muestreo,
no hay población, no hay significancia, no hay intervalo de confianza. Un "3x" es
*tres apariciones en dos documentos*.

La palabra correcta es **evidencia**, no estadística. Y "observado en los ejemplos
del propio Texera", no "basado en datos".

Si insisten:

> "Twenty-nine links from two curated examples isn't a sample — it's an anecdote
> we took seriously. What it was good for was correcting us: four of our groups
> were wrong and we'd never have known. What it can't do is prove the rest."

**Eso convierte una debilidad en una señal de criterio.** Un equipo que sabe qué
NO puede afirmar es más creíble que uno que lo afirma todo.

---

## "¿De dónde salen las recomendaciones?"

> "Two sources, and we label which is which. Texera ships two example workflows
> built by its own team — we extracted all 29 links between their operators and
> let them set the order. Where they contradicted our first draft, they won."

> "The groups with no observed data are ordinary engineering expectations we
> wrote ourselves. Those are documented as assumptions, not findings."

**Nota.** La honestidad aquí es el argumento. Enseñad
`next-operator-provenance.md` si hace falta: tiene la tabla de frecuencias y la
lista de los cuatro grupos donde la evidencia nos corrigió.

---

## "¿Qué os corrigió la evidencia?"

> "Four groups. The clearest: after a utility operator we suggested Filter,
> Projection and Aggregate. None of those three ever appears in the real
> workflows — in practice it feeds model training. All three of our guesses were
> plausible and all three were wrong."

**Nota.** Contad este caso concreto. Es específico, es autocrítico, y demuestra
que la evidencia se usó de verdad en vez de decorar una decisión ya tomada.

---

## "¿Por qué no un LLM?"

> "For the search, it isn't needed — it's vector comparison, and it runs in the
> browser with no key and no cost. For the suggestions, a model would have to
> justify itself, and a table of 26 rules is inspectable and can't invent an
> operator that doesn't exist."

> "Texera's local setup does ship litellm, but with no API key configured.
> Anything we'd built on it wouldn't have run today."

**Nota.** El último dato es cierto y es el que más convence: no es purismo, es
que la dependencia habría fallado hoy mismo.

---

## "¿Por qué no usasteis la búsqueda semántica para las sugerencias?"

> "Because embeddings measure similarity, not sequence. Ask what follows Sort and
> you get Sort Partitions and Stable Merge Sort — the operators most like Sort,
> which are exactly the ones you don't want next."

**Nota.** Es la mejor respuesta técnica que tenéis. Demuestra que conocéis el
límite de vuestra propia herramienta en vez de aplicarla a todo.

---

## "¿Reemplazasteis la búsqueda original?"

> "No. Both rankers answer every query. The keyword search runs first and keeps
> its places, so typing a name behaves exactly as it always did — instantly, and
> first. The ranked results fill what is left, which is where a phrase lands
> since it matches no name."

**Nota.** Esta pregunta la hará Chen Li o alguien que conozca Texera. La
respuesta corta que convence: **teclea `Sort` y compruébalo**. Enseñadlo en vivo
si hace falta, es instantáneo.

Había un toggle para elegir motor. Lo quitamos por indicación suya: obligaba al
usuario a saber que existían dos y a adivinar cuál necesitaba su consulta. Si
alguien pregunta por qué no hay modo, esa es la razón — **y decid que la
sugerencia fue suya**, porque es verdad y demuestra que escucháis.

---

## "¿Qué es ese número junto a cada resultado?"

> "Cosine similarity between your sentence and the operator's text. It is not an
> accuracy percentage. What matters is the gap: 0.71 over 0.52 is confident,
> 0.59 over 0.55 is a tie."

**Nota.** Nunca digáis "accuracy" ni "confidence". Si alguien pregunta si 0.59
es bueno, la respuesta es *"depends on what's second"*.

---

## "¿Cómo elegisteis las consultas de evaluación?"

> "One per operator, all 166, written by a teammate from the operator catalogue
> before seeing the index or the phrasings behind it. Expected answers were
> fixed before anything ran, and we measured once."

**Nota.** Esa independencia es lo que hace que el 83% valga algo. Decidla
siempre junto al número, nunca el número solo.

---

## "¿Hay algún número que no podáis defender?"

> "Yes. An earlier 19-query set was used both to measure and to decide where to
> add phrasings, so its score reflects how well we fitted it. We don't quote it."

**Nota — decidlo vosotros antes de que lo encuentren.** Un equipo que señala su
propia medición inválida gana más de lo que pierde. Está en `metodo.md`.

---

## "¿Qué haría falta para que esto fuera sólido?"

> "For the suggestions: real user workflows. A deployed Texera stores them in
> exactly the format we mined, so the same script would run over thousands
> instead of two — without changing a line."

> "For the search: better operator descriptions. Hash Join is documented as
> 'join two inputs'. Three words. That's the ceiling, and it isn't the model's."

**Nota.** Buen cierre. Demuestra que sabéis qué falta y por dónde se consigue,
que es distinto de no haber llegado.

---

## Lo que NO hay que decir

| No digáis | Decid |
|---|---|
| "estadística", "data-driven" | "observed in Texera's own examples" |
| "accuracy" (del score) | "similarity" / "relevance" |
| "el modelo aprendió" | "we wrote a table and the evidence reordered it" |
| "funciona siempre" | "83% in the top three, and here are the 28 misses" |
| ocultar el 19/19 viejo | señalarlo antes de que pregunten |
