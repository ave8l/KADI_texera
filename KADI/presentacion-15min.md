# Esquema de diapositivas — 15 min + 5 de preguntas

18 diapositivas. Al lado de cada bloque, el tiempo y quién habla.

---

## El problema — 2 min · A

**1 · Portada**
KADI · *Making Texera's 166 operators findable* · vuestros nombres · Hackathon UP 2026

**2 · La escala**
El número **166** en grande · *operators, across 26 groups* · captura de la paleta

**3 · Cómo busca hoy**
`keys: ["additionalMetadata.userFriendlyName"]` en grande · *the search reads the name. Nothing else.*

**4 · El remate**
Una frase sola: **"The search only helps you if you already know the answer."**

---

## Búsqueda semántica — 4 min · A demo, B técnica

**— DEMO EN VIVO, dos pantallas —**
`remove repeated rows` en Texera de serie → nada · la misma frase en la vuestra → Distinct 0.71 · escribir `Sort` para probar que no rompisteis nada

**5 · Las tres piezas**
Diagrama: `166 operators → [offline generator] → embeddings.json (486 KB) → browser`

**6 · Sin servidor**
Captura de la pestaña de red vacía · **No backend · No API key · No cost**

**7 · Por qué ese modelo**
Tabla del benchmark de 5 modelos (gana el más pequeño: 14/19)

---

## Contexto al pasar el cursor — 2:30 · B

**8 · El problema**
Captura de un canvas con solo nombres · *The palette explains an operator until you drop it.*

**— DEMO EN VIVO —**
Hover sobre `Count per department` (tiene dos ramas de salida)

**9 · De dónde sale**
Dos columnas: *Description → Texera's metadata* · *Connections → the workflow graph* · ninguna es un modelo

---

## Siguiente operador — 3 min · A

**10 · La idea**
*Instead of searching, be offered.*

**— DEMO EN VIVO —**
Seleccionar → clic → coloca y conecta → sigue seleccionado → clic otra vez. **Encadenad tres.**

**11 · Por qué NO usamos embeddings aquí**
```
"what comes after Sort?"
  embeddings → Sort Partitions, Stable Merge Sort
               (los más PARECIDOS a Sort)
```
*Similarity is not sequence.*

**12 · De dónde salen las reglas**
26 reglas → los 166 operadores cubiertos · ordenadas por **29 enlaces reales** de los workflows de ejemplo de Texera · corrigieron 4 de nuestros grupos

---

## Cómo está construido — 2 min · B

**13 · El alcance**
**822 líneas añadidas, 16 eliminadas** · 2 servicios nuevos, 7 archivos tocados · **0 cambios en el backend**

**14 · Las 16 eliminadas**
10 eran el enrutado de búsqueda original · las otras 6, reindentado · *the original search still runs on every query*

---

## Lo que medimos — 1 min · B

**15 · La cifra**

| | Top-3 |
|---|---|
| Texera's search | **2 / 166** |
| Ours | **138 / 166** |

166 consultas, una por operador, escritas sin ver el índice

**16 · Y no perdimos nada**
Nombres exactos: **10/10** · cobertura de sugerencias: **166/166**

---

## Límites y cierre — 30 s · A

**17 · Lo que no funciona**
28 fallos · algunos son duplicados del propio catálogo (KNN Classifier / K-nearest Neighbors) · los dejamos contados como fallos

**18 · Cierre + URL del repo**
*"The next step isn't a bigger model. It's giving the operators descriptions that say when to use them."*

---

## Si vais cortos

Recortad en este orden: **7** → segunda mitad de **14** → **16**.
**Nunca**: las demos en vivo, la diapositiva 15, ni el bloque de límites.
