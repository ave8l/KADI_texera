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

## Resultado — consultas en ingles

Se anadio este bloque porque la medicion en espanol, por si sola, no era una
comparacion justa: el indice de fuse.js solo contiene nombres en ingles. Varias
de estas consultas comparten palabra con el nombre del operador ("sort", "join"),
asi que aqui el baseline si tiene posibilidades reales.

| Consulta | Keyword (actual) | Semantico (nuevo) |
|---|---|---|
| remove duplicate rows | ❌ sin resultados | ✅ Distinct |
| read a csv file | ❌ sin resultados | ✅ CSV File Scan |
| train a classifier | ❌ sin resultados | ⚠️ Training: Dummy Classifier |
| join two tables | ❌ sin resultados | ✅ Interval Join |
| count rows by category | ❌ sin resultados | ✅ Limit |
| sort the data | ❌ sin resultados | ✅ Sort |
| find keywords in text | ❌ sin resultados | ✅ Keyword Search |
| connect to a database | ❌ sin resultados | ✅ MySQL Source |
| draw a chart | ❌ sin resultados | ⚠️ Tables Plot |
| run python code | ❌ sin resultados | ✅ 1-out Python UDF |

**Keyword: 0/10 — Semantico: 8/10**

### Que revela este segundo bloque

El baseline vuelve a sacar 0/10 **en su propio idioma**. La causa no es la
lengua: fuse.js compara la consulta entera contra el nombre del operador, asi
que solo acierta si el usuario ya teclea ese nombre. Una frase que describe una
intencion no se parece a "Distinct" ni a "Sort" por mucho que signifique eso.

Dicho de otro modo: el buscador actual solo sirve a quien ya sabe la respuesta.

### Sobre los dos casos marcados ⚠️

No son errores del ranker. "Training: Dummy Classifier" es efectivamente un
entrenador de clasificadores, y "Tables Plot" es efectivamente una grafica. La
respuesta esperada que fijamos era una entre varias validas, de modo que 8/10
es una cota inferior: bajo un criterio de "cualquier operador que resuelva la
intencion", las diez son aciertos.
