# KADI — Busqueda semantica de operadores para Texera

Hackathon UP, 11-12 septiembre 2026. Equipo de dos.

## El problema

Texera expone **166 operadores** repartidos en 26 grupos. El buscador de la
paleta usa fuse.js y esta configurado asi:

```ts
keys: ["additionalMetadata.userFriendlyName"]
```

Indexa **solo el nombre**. La descripcion de cada operador — que existe y esta
cargada en el frontend (`operatorDescription`, presente en los 166) — no se
consulta nunca. El resultado es que buscas por lo que quieres hacer y no
encuentras nada; solo funciona si ya sabes como se llama el operador.

## La solucion

Busqueda por significado, calculada **enteramente en el navegador**:

- Modelo `Xenova/paraphrase-multilingual-MiniLM-L12-v2` via Transformers.js
- Los 166 operadores se indexan **offline** y sus vectores se commitean
- En tiempo de ejecucion solo se embebe la consulta del usuario
- Similitud coseno contra los 166 vectores, top 3

**Sin backend. Sin API key. Sin coste.** El modelo corre en WASM dentro del
navegador y queda en cache tras la primera descarga.

## Por que un modelo multilingue

El modelo monolingue ingles (`all-MiniLM-L6-v2`) carga mas rapido pero falla en
espanol: la consulta "leer un archivo" no devolvia `CSV File Scan` en el top 3.
El multilingue lo resuelve y mantiene la calidad en ingles, a cambio de unos
segundos mas en la carga inicial.

| Consulta | Monolingue | Multilingue |
|---|---|---|
| quitar duplicados | Distinct 0.296 | **Distinct 0.538** |
| remove repeated rows | Distinct 0.559 | Distinct 0.547 |
| leer un archivo | no lo encuentra | **CSV File Scan 0.364** |

## Estructura

| Ruta | Que es |
|---|---|
| `frontend/scripts/generate-operator-embeddings.mjs` | Generador del indice (offline) |
| `frontend/src/assets/operator-embeddings.json` | 166 operadores x 384 dims, 486 KB |
| `KADI/evaluacion.md` | Resultados medidos |

Regenerar el indice:

```bash
node frontend/scripts/generate-operator-embeddings.mjs <metadata.json> frontend/src/assets/operator-embeddings.json
```

donde `<metadata.json>` es la respuesta de `GET /api/resources/operator-metadata`.
