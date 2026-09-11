# Metodo de medicion — y su estado actual

## Advertencia: el numero de ahora mismo NO es limpio

El conjunto de 19 consultas con respuesta conocida se uso primero para medir, y
despues para decidir a que operadores anadir phrasings. Los de `Sort`,
`Aggregate`, `Split`, `Regular Expression` y `Keyword Search` se escribieron
sabiendo que esas intenciones estaban en la prueba.

Se redactaron describiendo lo que hace el operador, no copiando la consulta,
pero eso no basta: **el conjunto dejo de ser independiente en el momento en que
se miro un fallo y se actuo sobre el**. El 17/19 actual mide cuanto se ha
ajustado el indice a esas 19 frases, no cuanto funciona la busqueda.

## Como obtener un numero que si valga

1. Persona B termina los phrasings de los operadores prioritarios, trabajando
   **desde la documentacion y el comportamiento de cada operador**, sin abrir el
   conjunto de consultas.
2. Con los phrasings ya congelados, se escribe un conjunto **nuevo** de
   consultas — quien las escriba no debe haber leido `operator-hints.json`.
3. Se fija la respuesta esperada de cada una **antes** de ejecutar nada.
4. Se mide una sola vez. Ese numero es el que se presenta.

Si tras medir se vuelve a tocar el indice, el conjunto queda quemado y hace
falta uno nuevo. No se negocia: es la diferencia entre un resultado y una
ilusion.

## Lo que si se puede afirmar sin reservas

Estas dos medidas no dependen del indice y no se han tocado:

- **El buscador actual devuelve cero resultados en las 40 consultas probadas**,
  en espanol y en ingles. No es un problema de idioma: fuse.js compara la frase
  entera contra el nombre del operador, asi que solo acierta si el usuario ya
  sabe como se llama.
- **Las consultas con el nombre exacto siguen dando 10/10.** La busqueda por
  significado no quita nada de lo que el buscador ya hacia.
