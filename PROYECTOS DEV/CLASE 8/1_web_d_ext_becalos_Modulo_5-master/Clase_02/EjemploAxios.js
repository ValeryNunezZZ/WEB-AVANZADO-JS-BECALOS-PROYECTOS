const axios = require('axios');

const BASE_URL = "https://fakestoreapi.com"

/* EJEMPLO GET */

/* 1- Definir como llamaremos a la API */
function obtenerProducto(id, callback) {

    axios.get(`${BASE_URL}/products/${id}`)
        .then(respuesta => callback(null, respuesta.data)) // Caso exitoso
        .catch(error => callback(error, null)); // Caso error

}

function obtenerProductoErrorForzado(id, callback) {

    axios.get(`${BASE_URL}/product/${id}`)
        .then(respuesta => callback(null, respuesta.data)) // Caso exitoso
        .catch(error => callback(error, null)); // Caso error

}

/* Definimos el Callback o la funcion que maneja la respuesta o el error */
function callback(error, producto) {
    if (error) {
        console.error('Error: ', error.message)
    } else {
        console.log(`Producto: ${producto.title} - $ ${producto.price}`);
    }
}

/* Ejecutamos la llamada a la API */
/* obtenerProducto(2, callback);
obtenerProducto(8, callback);
obtenerProducto(20, callback);
obtenerProducto(50, callback);
obtenerProductoErrorForzado(100, callback); */


/* EJEMPLO POST */

function guardarProductoNuevo(objeto, callback) {

    const body = JSON.stringify(objeto)

    axios.post(`${BASE_URL}/products`, body)
        .then(respuesta => callback(null, respuesta.data))
        .catch(error => callback(error, null))
}

function callbackNuevoProd(error, producto) {
    if (error) {
        console.error('Error: ', error.message)
    } else {
        console.warn(`Producto ID: ${producto.id}`);
    }
}


const nuevoProducto = {
    title: "POCO Phone X5",
    price: 99.99,
    description: "Telefono de gama media",
    category: "Celulares",
    //image:"dsadbhskadhsakvdhas",
    image: "https://dummy.com"
}
/* Creamos un producto nuevo */
guardarProductoNuevo(nuevoProducto, callbackNuevoProd);



function obtenerProductosPorCategoria(categoria, callback) {


    axios.get(`${BASE_URL}/products`)
        .then(respuesta => callback(categoria, null, respuesta.data))
        .catch(error => callback(categoria, error, null))

}

function filtrarProductosPorCategoria(categoria, error, products) {
    if (error) {
        console.error('Error: ', error.message)
    } else {
        const productosCat = products.filter(product => product.category === categoria)
        console.warn(productosCat)
    }
}

//obtenerProductosPorCategoria('jewelery', filtrarProductosPorCategoria)
obtenerProductosPorCategoria('jewelery', (categoria, error, products) => {
    if (error) {
        console.error('Error: ', error.message)
    } else {
        const productosCat = products.filter(product => product.category === categoria)
        console.warn(productosCat)
    }
})


/* CALLBACK HELL */

/* obtenerProducto(1, (error, producto1) => {
    if (error) {
        console.error(error);
    } else {
        console.log(producto1.title);
        obtenerProducto(2, (error, producto2) => {
            if (error) {
                console.error(error);
            } else {
                console.log(producto2.title);
                obtenerProducto(3, (error, producto3) => {
                    if (error) {
                        console.error(error);
                    } else {
                        console.log(producto3.title);
                    }
                });
            }
        });
    }
}); */


function handleProducto1(err, producto) {
    if (err) return console.error(err);
    console.log(producto.title);
    obtenerProducto(2, handleProducto2);
}

function handleProducto2(err, producto) {
    if (err) return console.error(err);
    console.log(producto.title);
    obtenerProducto(3, handleProducto3);
}

function handleProducto3(err, producto) {
    if (err) return console.error(err);
    console.log(producto.title);
}

/* obtenerProducto(1, handleProducto1); */




async function asincronaPadre() {
    const result1 = await handleProducto1()

    const result2 = await handleProducto2()

}