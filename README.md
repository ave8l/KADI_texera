# KADI_texera

Repositorio para integración de ideas dentro del proyecto Texera, para el
Hackaton UP 11/09/2026.

---

## Búsqueda semántica de operadores

Texera expone **166 operadores** en 26 grupos. El buscador de la paleta indexa
únicamente el nombre del operador, así que una consulta expresada como
intención no encuentra nada — aunque la descripción del operador diga
exactamente eso. Las descripciones existen para los 166 y nunca se consultan.

Este trabajo añade búsqueda por significado, calculada **entera en el
navegador**: sin backend, sin API key y sin coste por consulta.

### Resultado medido

Sobre 10 consultas en lenguaje natural, acierto en el top 3:

| | Buscador actual | Búsqueda semántica |
|---|---|---|
| Aciertos | **0 / 10** | **10 / 10** |

El método, los datos y las limitaciones conocidas de esa medición están en
[`KADI/evaluacion.md`](KADI/evaluacion.md).

### Cómo funciona

Los vectores de los 166 operadores se generan **offline** y se versionan en el
repositorio. En ejecución solo se embebe la consulta del usuario, con el modelo
multilingüe `paraphrase-multilingual-MiniLM-L12-v2` corriendo en WASM dentro
del navegador.

Detalles de diseño y decisiones en [`KADI/README.md`](KADI/README.md).

---

## Sobre el proyecto base

Este repositorio es un fork de [Apache Texera (incubating)](https://github.com/apache/texera),
una plataforma de código abierto para ciencia de datos colaborativa entre
humanos e IA mediante workflows visuales.

La documentación original del proyecto está en [`docs/`](docs/), y las
instrucciones de instalación y contribución en
[`CONTRIBUTING.md`](CONTRIBUTING.md).
