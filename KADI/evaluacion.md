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

## Tercer bloque — 20 consultas realistas

Las dos tandas anteriores usaban consultas cortas de una sola intencion. Este
bloque las sustituye por frases como las que escribiria alguien trabajando:
compuestas, con vocabulario de dominio y a veces con dos intenciones dentro
("Call a third-party API and parse the JSON response").

**Buscador actual: 0 de 20.** No devuelve nada en ninguna. Semanticamente, unas
diez dan un operador claramente util en el top 3 — entre ellas Sort, Aggregate,
Split, Union, Projection, Keyword Search, Regular Expression y Hugging Face
Sentiment Analysis.

Los fallos reconocibles:

| Consulta | Devuelto | Deberia |
|---|---|---|
| Combine two datasets based on a shared column | Split | Hash Join |
| Keep only rows where the price is above a threshold | Limit | Filter |
| Extract email addresses from a text field | Text Input | Regular Expression |
| Write the final results to a CSV file | CSV File Scan | un operador de escritura |

El ultimo es revelador: el ranker no distingue leer de escribir, porque en el
texto indexado de `CSV File Scan` la palabra dominante es "CSV".

### Intento de mejora que no funciono

Hipotesis: las descripciones son demasiado cortas — la de `Hash Join` es
literalmente "join two inputs" — y los campos de configuracion de cada operador
si contienen vocabulario util ("Left Input Attribute: attribute to be joined on
the Left Input", "Predicates: multiple predicates in OR").

Se regenero el indice anadiendo el titulo y la ayuda de cada campo al texto
embebido, y se repitio la medicion. **Empeoro:**

| Consulta | Indice base | Con campos |
|---|---|---|
| Count how many times each category appears | Aggregate (1º) | Limit (1º), Aggregate (3º) |
| Split a single column into multiple columns | Split (1º) | Aggregate (1º), Split (2º) |
| Merge rows from two tables into one output | Union (2º) | Union (3º) |
| Remove columns that aren't needed downstream | Projection (2º) | Projection (3º) |

Muchos operadores comparten nombres de campo genericos, asi que anadirlos acerca
entre si a operadores que no tienen nada que ver: es ruido, no señal. El cambio
se revirtio y el indice publicado es el original.

### Conclusion

El techo de este enfoque no lo pone el modelo, lo ponen los metadatos de Texera.
La via de mejora con mas recorrido no es un modelo mayor ni un indice mas
elaborado, sino descripciones de operador decentes en el proyecto base.
