# Cierre del proyecto — KADI, Hackathon UP 2026

Estado a 11/09/2026. Todo en `main` de `ave8l/KADI_texera`.

---

## Lo que se entrega

| # | Funcionalidad | Qué resuelve |
|---|---|---|
| 1 | **Búsqueda semántica de operadores** | La paleta solo buscaba por nombre; ahora entiende lo que quieres hacer |
| 2 | **Tarjeta de contexto al pasar el cursor** | El canvas mostraba un nombre; ahora explica el operador y a qué está conectado |
| 3 | **Recomendación del siguiente operador** | En vez de buscar, se sugiere y se conecta con un clic |

**24 commits propios. 14 archivos cambiados, 1193 líneas añadidas.**
Ningún cambio en el backend de Texera.

---

## Las cifras que se pueden defender

| Medida | Resultado |
|---|---|
| Búsqueda actual sobre 166 consultas | **2 aciertos** (1%) |
| Búsqueda semántica, mismas consultas | **138 aciertos en top-3** (83%) |
| Consultas que nombran el operador | **10/10** — no se pierde nada |
| Cobertura de sugerencias | **166/166 operadores**, ningún hueco |
| Coste por consulta | **0** — sin backend, sin API key |

La independencia del conjunto de 166 es lo que hace que el 83% valga: una
persona del equipo las escribió desde el catálogo, sin ver el índice ni los
phrasings, con la respuesta esperada fijada antes de ejecutar nada.

**No citar el 17/19 de la tanda anterior** — está ajustado a su propio
conjunto. Ver `metodo.md`.

---

## Documentación

| Archivo | Para qué |
|---|---|
| `README.md` (raíz) | Lo que ve quien entra al repo |
| `KADI/README.md` | Diseño, benchmark de 5 modelos, lo que falló |
| `KADI/evaluacion.md` | Las mediciones y sus límites |
| `KADI/metodo.md` | Qué números valen y cuáles no |
| `KADI/next-operator-provenance.md` | De dónde sale cada regla de sugerencia |
| `KADI/defensa.md` | **Las 9 preguntas difíciles con su respuesta** |
| `KADI/presentacion.md` | Guion de 3 minutos, repartido entre dos |
| `KADI/catalogo-operadores.md` | Los 166 operadores |
| `KADI/consultas-evaluacion.md` | Las 166 consultas de prueba |

---

## Puntos de retorno

```bash
git checkout presentacion-v2   # las tres funcionalidades
git checkout presentacion-v1   # sin las sugerencias — plan B
```

Si mañana algo falla en el ensayo y no da tiempo a entenderlo, `v1` es una
demo completa y probada de dos funcionalidades.

---

## Antes de presentar

- [ ] **Calentar el modelo**: una búsqueda cualquiera 10 min antes. La primera
      de cada navegador descarga 23 MB y se ve un "loading model…"
- [ ] Workflow 4 (`KADI demo - tickets by department`) abierto
- [ ] **Segunda máquina** con Texera de serie encendida y con sesión iniciada —
      es el "antes" de la comparación
- [ ] Zoom al 100 %, repo abierto en otra pestaña
- [ ] Releer `defensa.md`, sobre todo *"¿esto es estadística?"*

---

## El recorrido de la demo

Un solo gesto continuo que toca las tres funcionalidades:

1. Escribir `remove repeated rows` en el Texera de serie → no sale nada
2. La misma frase en el nuestro → sale `Distinct`, con score y descripción
3. Clic en `Distinct` → se coloca en el canvas
4. Pasar el cursor por encima → la tarjeta lo explica
5. Sigue seleccionado → el panel ofrece qué va después
6. Clic en una sugerencia → se coloca **y se conecta**
7. Repetir → pipeline construido sin volver a buscar

---

## Lo que queda sin hacer, y se sabe

- **Capturas de pantalla.** El guion tiene huecos marcados `[CAPTURA n]`.
- **Ensayo cronometrado.** El recorrido de 7 pasos no se ha hecho entero.
- **Las sugerencias en grupos mezclados.** `Utilities` sugiere lo mismo a sus
  cinco operadores, y para `Unnest String` no encaja. Diagnosticado, no
  corregido: se arregla admitiendo excepciones por operador (~25 min).
- **Corpus real.** Las reglas salen de 29 enlaces de 2 workflows de ejemplo.
  Es evidencia, no estadística. Una instancia desplegada guarda workflows
  reales en el mismo formato, y el script que los extrae correría igual.
