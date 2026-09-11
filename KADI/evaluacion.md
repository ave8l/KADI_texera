# Evaluacion

Metodo: 10 consultas en lenguaje natural. Se cuenta acierto si el operador
esperado aparece en el **top 3**. El baseline es la configuracion de fuse.js
que Texera usa hoy, sin modificar (`threshold: 0.3`, `keys: ["userFriendlyName"]`).

## Resultado — consultas en espanol

| Consulta | Keyword (actual) | Semantico (nuevo) |
|---|---|---|
| quitar duplicados | ❌ sin resultados | ✅ Distinct |
| leer un archivo csv | ❌ sin resultados | ✅ CSV File Scan |
| entrenar un modelo de clasificacion | ❌ sin resultados | ✅ Training: Decision Tree |
| unir dos tablas | ❌ sin resultados | ✅ Interval Join |
| contar cuantos hay por categoria | ❌ sin resultados | ✅ Aggregate |
| ordenar los datos | ❌ sin resultados | ✅ Sort |
| buscar palabras clave en texto | ❌ sin resultados | ✅ Keyword Search |
| conectarme a una base de datos | ❌ sin resultados | ✅ MySQL Source |
| hacer una grafica | ❌ sin resultados | ✅ Scatter3D Chart |
| ejecutar codigo python | ❌ sin resultados | ✅ 1-out Python UDF |

**Keyword: 0/10 — Semantico: 10/10**

## Limitacion conocida de esta medicion

Las diez consultas estan en espanol y el indice de fuse.js solo contiene
nombres en ingles, asi que el 0/10 del baseline es en parte esperable y no
constituye por si solo una comparacion justa.

**Pendiente:** anadir un bloque de consultas en ingles expresadas por intencion
(p.ej. "remove repeated rows" en vez de "Distinct") donde el baseline si tiene
posibilidad de acertar. Si el semantico gana tambien ahi, la comparacion queda
cerrada.
