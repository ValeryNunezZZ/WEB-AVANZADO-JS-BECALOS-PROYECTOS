function sumar(a, b, mifuncionexterna) {
    const resultado = a + b;
    console.log("Antes de ejecutar el callback")
    mifuncionexterna(resultado)
}

function funcionPanchito(resultado) {
    console.log(resultado)
}

/* Función anonima que no puedo ejecutar */
/* ¿cual es su nombre? */
(resultado) => {
    console.log(resultado)
}

console.log("Antes de ejecutar suma")

/* Ejemplo de callback con función anónima */
sumar(5, 10, (resultado) => console.log("SUMA:", resultado))

/* Ejemplo de callback con función anónima */
sumar(5, 10, funcionPanchito)

/* Ejemplo de callback para manipulación del DOM */

/* const inputNombre = document.querySelector("#Nombre-Usuario");

inputNombre.addEventListener("focus", ()=>{
}) */


/* JSON */

const jsonExample = `{
    "nombre": "Jesus",
    "edad": 34,
    "estudia": false
}`

console.log("(JSON) Nombre:", jsonExample.nombre)

const objectExample = JSON.parse(jsonExample);

console.log("Nombre:", objectExample.nombre)