//LEER LIBROS


const fs = require('fs');

let datos;


function leerArchivo(callback){

    fs.readFile('libros.json', 'utf-8', (rej, res) => {
        if(rej){
            callback(rej, null);
        }else{
            const parsedData = JSON.parse(res);
            callback(null, parsedData);
        }
    })
};


//ACTUALIZAR DISPONIBILIDAD


//AGREGAR LIBROS
//CONSULTAR EL INVENTARIO



//MOSTRAR MENÚ
const readline = require('readline');

// Función que pide la información del libro con callbacks
function solicitarInformacion(callback) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Titulo: ', (titulo) => {
        rl.question('Autor: ', (autor) => {
            rl.question('Género: ', (genero) => {
                rl.close();

                const libro = {
                    titulo: titulo,
                    autor: autor,
                    genero: genero,
                    disponible: false
                };

                callback(libro); // solo aquí llamamos al callback
            });
        });
    });
}


function mostrarMenu(){

    leerArchivo((error, data)=>{
        
        if(error){
            console.log("ERROR: " + error);
        }else{
            console.log("MENU\n1. Actualizar Disponibilidad\n2. Agregar libros\n3. Consultar inventario\n\n");


            let res = 1;

            if(res == 1){

                solicitarInformacion((libro) => {
                    
                    // Buscar el libro por título y cambiar la disponibilidad
                    const lib = data.libros.find(l => l.titulo === libro.titulo);

                    if (lib) {
                        if(lib.disponible == true) lib.disponible = false;
                        else lib.disponible = true;

                        console.log("✅ Disponibilidad actualizada.");
                    } else {
                        console.log("⚠️ Libro no encontrado.");
                    }
                
                    // Escribir de nuevo el archivo con la actualización
                    fs.writeFile('libros.json', JSON.stringify(data, null, 2), (err) => {
                        if (err) {
                            console.error('❌ Error al escribir el archivo:', err);
                        } else {
                            console.log('✅ Archivo actualizado correctamente.');
                        }
                    });

                });



            }else if (res == 2) {

                solicitarInformacion((libro) => {
                    console.log("\n📚 Libro AGREGADO CORRECTAMENTE\n");
                    console.log("Título:", libro.titulo);
                    console.log("Autor:", libro.autor);
                    console.log("Género:", libro.genero);
                    console.log("Disponible:", libro.disponible);


                    let nuevoLibro = {
                        titulo : libro.titulo,
                        autor : libro.autor,
                        genero : libro.genero,
                        disponible : true
                    }
                    
                    data.libros.push(nuevoLibro);

                    fs.writeFile('libros.json', JSON.stringify(data, null, 2), (err) => {
                        if (err) {
                            console.error('❌ Error al escribir el archivo:', err);
                        } else {
                            console.log('✅ Libro agregado correctamente.');
                        }
                    });

                });


            }else if(res == 3){
                
                leerArchivo((error, data)=>{
                
                    if(error){
                        console.log("ERROR: " + error);
                    }else{
                        data.libros.forEach(element => {
                            console.log("Titulo: " + element.titulo);
                            console.log("Autor: " + element.autor);
                            console.log("Genero: " + element.genero);
                        
                            if(element.disponible){
                                console.log("Disponibilidad: + Disponible");
                            }else{
                                console.log("Disponibilidad: No disponible");
                            }
                
                            console.log("\n-----------------------------------\n\n");
                        });
                    }
                    
                });

            }
        }
        
    });

}

mostrarMenu();