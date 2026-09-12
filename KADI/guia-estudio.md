# Guía de estudio

Lo que hay que poder explicar sin mirar. Si algo de aquí no lo sabéis decir con
vuestras palabras, es un agujero.

---

## Los tres conceptos base

**Embedding.** Convertir un texto en una lista de números (aquí, 384) que
representa su significado. Textos con sentido parecido dan listas parecidas.
No es una traducción ni un resumen: es una posición en un espacio.

**Similitud coseno.** Mide cuánto apuntan en la misma dirección dos de esas
listas. Va de −1 a 1. Como normalizamos los vectores, el producto escalar **ya
es** la similitud — por eso el cálculo es una suma de 384 multiplicaciones y
tarda nada.

**No es un porcentaje de acierto.** Un acierto puede salir 0.25 y un fallo 0.54.
Lo que importa es **la distancia entre el primero y el segundo**.

---

## Feature 1 · Búsqueda semántica

**Qué resuelve.** La paleta indexaba solo `userFriendlyName`. Una frase no se
parece a "Distinct", así que no encontraba nada.

**Cómo funciona.**
1. Un script offline lee los metadatos de los 166 operadores
2. Construye un texto por operador: nombre + grupo + descripción + phrasings
3. Lo embebe con `all-MiniLM-L6-v2` y guarda los vectores en un JSON de 486 KB
4. Ese JSON **se commitea** al repositorio
5. En el navegador solo se embebe **la consulta del usuario**
6. Coseno contra los 166, se ordena, salen los mejores

**Dónde corre el modelo.** En el navegador, vía Transformers.js sobre
WebAssembly. Se descarga una vez (23 MB) desde un CDN público y queda en caché.
**Sin backend, sin API key, sin coste por consulta.**

**La fusión de los dos buscadores.** Una sola caja. `fuse.js` (el original)
responde primero y **conserva sus puestos**; los semánticos rellenan lo que
queda. Por eso teclear `Sort` sigue siendo instantáneo y exacto, y una frase
—que no coincide con ningún nombre— cae entera en el lado semántico.

**Si el modelo falla al cargar**, los resultados de fuse se quedan solos: es el
comportamiento original de Texera.

**El número:** 2/166 contra 138/166 en top-3.

**Lo que hay que saber aunque no lo preguntéis:** el modelo multilingüe daba
6/19 y el de inglés 14/19. Los modelos grandes afinados para recuperación
(mpnet, bge, gte) **no mejoraron nada** porque el texto de un operador son doce
palabras, no un párrafo.

---

## Feature 2 · Contexto al pasar el cursor

**Qué resuelve.** En el canvas solo se ve el nombre. Si alguien renombró el
operador, ni eso.

**Cómo funciona.** Dos mitades, **ninguna es un modelo**:
- La **descripción** sale de los metadatos de Texera, que el frontend ya tenía cargados y nunca mostraba
- Las **conexiones** se leen del grafo del workflow en el momento

**Por qué es reactivo.** Al dibujar un enlace el cursor nunca sale del operador,
así que no hay un `mouseenter` nuevo que refresque la tarjeta. Se suscribe a los
flujos del grafo — enlace añadido, borrado, operador renombrado, borrado — y se
reconstruye en el sitio.

**Detalle que suelen preguntar:** no se puede equivocar, porque no infiere nada.
O el grafo está bien o no lo está.

---

## Feature 3 · Siguiente operador

**Qué resuelve.** A veces no tienes una intención que buscar: tienes un workflow
y quieres saber qué sigue.

**Por qué NO se usan embeddings.** Miden **parecido**, no **secuencia**. Qué va
después de `Sort` devolvería `Sort Partitions` y `Stable Merge Sort` — los más
parecidos a Sort, justo los que no quieres. **Esta es la respuesta técnica más
fuerte que tenéis; aprendedla literal.**

**Cómo funciona.** Una tabla JSON de 26 reglas, una por grupo de operadores. 26
reglas cubren los 166 porque van por grupo, no por operador.

**De dónde sale el orden.** De los 2 workflows de ejemplo que trae Texera: 29
enlaces reales entre operadores. Donde contradecían nuestra primera versión,
**ganaron ellos**. Corrigieron 4 grupos.

**Qué pasa al hacer clic.** Coloca el operador a la derecha, lo conecta, y lo
deja seleccionado — así el panel ofrece inmediatamente el siguiente paso y se
puede encadenar. Todo en una sola acción deshacible.

**Cobertura:** 166/166. Los 50 operadores de gráficas apuntan a lista vacía
**a propósito** y dicen *"nothing usually follows this"*.

---

## Lo que NO es

| No es | Es |
|---|---|
| Estadística | 29 observaciones de 2 documentos |
| Un LLM | Comparación de vectores |
| Aprendizaje automático entrenado por nosotros | Un modelo preexistente + una tabla escrita a mano |
| Un reemplazo del buscador | Una capa encima; el original sigue corriendo |

---

## Los números, de memoria

| | |
|---|---|
| Operadores en Texera | **166**, en 26 grupos |
| Consultas de evaluación | **166**, una por operador |
| Buscador original, top-3 | **2 / 166** |
| Nuestro, top-3 | **138 / 166** (83%) |
| Nuestro, top-1 | **102 / 166** (61%) |
| Nombres exactos | **10 / 10** |
| Índice | 486 KB, 384 dimensiones |
| Modelo | 23 MB, en el navegador |
| Código | +822 / −16, 0 en backend |
| Enlaces minados | **29**, de 2 workflows |

---

## Los tres agujeros que debéis reconocer

1. **29 enlaces no son estadística.** Son evidencia suficiente para corregirnos,
   insuficiente para probar el resto.
2. **Un conjunto viejo de 19 consultas no es citable** — se usó para medir y
   luego para decidir dónde añadir phrasings.
3. **Grupos mezclados.** `Utilities` da la misma sugerencia a sus 5 operadores, y
   para `Unnest String` no encaja. Diagnosticado, no corregido.
