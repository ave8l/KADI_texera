# Guion de presentación — 3 minutos en vivo

Dos personas. **A** narra y maneja la pantalla, **B** entra en resultados y Q&A.
Los `[CAPTURA n]` son los huecos; la numeración es la de la lista de capturas.

---

## 1 · El problema — 30 s · habla A

> "Texera tiene **166 operadores** repartidos en 26 grupos. Para usar uno,
> primero hay que encontrarlo."

`[CAPTURA 7 — la paleta con todos los grupos plegados]`

> "El buscador de la paleta compara lo que escribes contra **el nombre** del
> operador. Nada más. Su descripción, que existe en los 166, no se consulta
> nunca."

**El remate, que es el hallazgo del proyecto:**

> "Eso significa que el buscador solo sirve **si ya sabes la respuesta**."

---

## 2 · Demo en vivo — 90 s · maneja A

El corazón de la presentación. **No narrar de más: que se vea.**

**Paso 1 — el estado actual.** Toggle apagado. Escribir:

```
remove duplicate rows
```

Silencio dos segundos mientras el jurado ve la lista vacía.

> "Cero resultados. Y esto es inglés, el idioma de la interfaz."

`[CAPTURA 3 — toggle apagado, sin resultados]`

**Paso 2 — encender.** Sin borrar el texto, activar el toggle.

> "Misma consulta."

`[CAPTURA 4 — toggle encendido, Distinct arriba con su score]`

**Paso 3 — cerrar el ciclo.** Clic en Distinct → el operador aparece en el canvas.

`[CAPTURA 6 — el operador ya colocado en el workflow]`

> "No es una lista: lo añade al workflow."

**Paso 4 — el bis en español.** Apagar, escribir `quitar duplicados`, encender.

`[CAPTURAS 1 y 2]`

> "El mismo modelo, sin traducir nada."

---

## 3 · Cómo funciona — 30 s · habla B

> "Los vectores de los 166 operadores se calculan **una vez, fuera de línea**, y
> viven versionados en el repositorio. Cuando escribes, lo único que se calcula
> es el vector de **tu frase** — y se calcula **dentro de tu navegador**."

`[CAPTURA 9 — pestaña de red vacía durante una búsqueda]`

> "Sin servidor. Sin clave de API. Sin coste por consulta. Esa pestaña de red
> está vacía porque no hay a quién preguntarle."

---

## 4 · Lo que medimos — 30 s · habla B

> "Comparamos contra el buscador actual, sin tocar su configuración."

| Conjunto | Buscador actual | Búsqueda semántica |
|---|---|---|
| 10 consultas simples, español | 0 / 10 | **10 / 10** |
| 10 consultas simples, inglés | 0 / 10 | **8 / 10** |
| 20 consultas realistas, inglés | **0 / 20** | ~10 / 20 claras |

> "El dato que no cambia en ninguna tanda: el buscador actual devuelve **cero**
> resultados en las cuarenta consultas. En su propio idioma."

---

## 5 · Hasta dónde llega — 30 s · habla B

**Decir esto nosotros, antes de que lo pregunten.**

> "En consultas compuestas acierta aproximadamente la mitad. 'Combine two
> datasets based on a shared column' devuelve Split en vez de Hash Join."

> "Investigamos por qué. La descripción de Hash Join en Texera es, literalmente,
> **'join two inputs'**. Tres palabras. El techo no lo pone el modelo: lo pone
> la calidad de los metadatos del propio Texera."

> "Probamos enriquecer el índice con los campos de configuración de cada
> operador. **Empeoró** — los nombres de campo son genéricos y diluyen la señal.
> Lo revertimos y lo dejamos documentado."

**Siguiente paso, en una frase:**

> "La mejora con más recorrido no es cambiar de modelo: es que los 166
> operadores tengan una descripción decente."

---

## Preguntas que van a caer

**"¿Esto necesita internet / una API de pago?"**
No. El modelo se descarga una vez desde un CDN público y queda en la caché del
navegador. Después funciona sin red. No hay clave de API en ningún punto.

**"¿Cuánto tarda?"**
La primera consulta del navegador descarga el modelo. A partir de ahí, la
búsqueda es instantánea: comparar contra 166 vectores no es trabajo.

**"¿Por qué no usasteis GPT / un LLM?"**
Porque no hace falta y añade dependencia, coste y latencia. Esto es comparación
de vectores. Además el entorno local de Texera trae litellm, pero sin clave
configurada — una solución que dependiera de eso no habría funcionado hoy.

**"¿Escala a más operadores?"**
El índice son 486 KB para 166. Diez veces más operadores siguen siendo unos
pocos megas y la comparación sigue siendo lineal y trivial.

**"¿Por qué un modelo multilingüe si Texera está en inglés?"**
Lo medimos: el monolingüe no encontraba `CSV File Scan` para "leer un archivo".
Cuesta unos segundos más de carga inicial y abre la herramienta a quien no
piensa en inglés.

**"¿Funciona el buscador de antes si lo necesito?"**
Sí. El toggle cambia entre los dos y, si el modelo fallara, cae solo al
buscador original en vez de quedarse muerto.

---

## Checklist antes de subir

- [ ] **Calentar el modelo**: hacer una búsqueda cualquiera 10 min antes.
      Si la primera es delante del jurado, ven "loading model…" durante la descarga.
- [ ] Navegador en la pestaña correcta, zoom al 100 %
- [ ] Un workflow abierto con la paleta visible
- [ ] Toggle **apagado** de salida — la demo empieza en el estado "antes"
- [ ] El repositorio abierto en otra pestaña por si lo piden
