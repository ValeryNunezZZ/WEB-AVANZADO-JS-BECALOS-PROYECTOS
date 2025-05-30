// Aquí tienes un código incompleto para tomar como base. Cada función está definida, pero los pasos cruciales aún no están implementados.

// Simulando una base de datos de mesas
const mesasDisponibles = 5;  // Número de mesas disponibles para reservar

// Función que simula la verificación de disponibilidad de mesas
function verificarDisponibilidad(mesasSolicitadas) {
return new Promise((resolve, reject) => {
    setTimeout(() => {
    // Completa la lógica aquí: Si hay suficientes mesas disponibles, resuelve la promesa, 
    // de lo contrario, recházala con un mensaje adecuado.
    if(mesasSolicitadas <= mesasDisponibles){
        resolve("MESAS DISPONIBLES :D");
    }else{
        reject (new Error(`NO HAY SUFICIENTES MESAS PARA LA SOLICITUD HECHA...`));
    }
    }, 2000);  // Simula un retraso en la verificación (2 segundos)
});
}

// Función que simula el envío de un correo de confirmación
function enviarConfirmacionReserva(nombreCliente) {
return new Promise((resolve, reject) => {
    setTimeout(() => {
    // Completa la lógica aquí: Simula un envío de correo. Usa Math.random() 
    // para simular si el correo se envió correctamente o si ocurrió un error.
    let randomValido = Math.floor((Math.random() * 10) + 1);

    if(randomValido%2 == 0){
        resolve("Solicitud Enviada correctamente " + nombreCliente)
    }else{
        reject(new Error('ERROR AL ENVIAR CORREO DE CONFIRMACIÓN'))
    }
    }, 1500);  // Simula el envío de un correo (1.5 segundos)
});
}

// Función principal para manejar una reserva
async function hacerReserva(nombreCliente, mesasSolicitadas) {
try {
    console.log("Verificando disponibilidad de mesas...");
    const disponibilidad = await verificarDisponibilidad(mesasSolicitadas);  // Llama a la función de verificación
    console.log(disponibilidad);
    
    let confirmacion = await enviarConfirmacionReserva(nombreCliente);
    // Completa el flujo aquí: Si hay mesas disponibles, llama a la función para enviar la confirmación.
    console.log(confirmacion)
    // Si no hay mesas disponibles o si ocurre un error, captura el error.
} catch (error) {
    console.log(error.message);  // Maneja los errores en la promesa
}
}

const probarConMasValores = async (nombre, num) => {
    //MESAS DEBEN DE ESTAR DISPONIBLES

    console.log("Nombre : " + nombre + "\n");

    for(let i=1 ; i<=num ; i++){
        await hacerReserva(nombre, i);
        console.log("\n");
    }

    //MESAS DEBEN DE ESTAR NO DISPONIBLES
    for(let i=mesasDisponibles+1 ; i<=mesasDisponibles+3 ; i++){
        await hacerReserva(nombre, i);
        console.log("\n");
    }
}

async function llamar(){
    await probarConMasValores("Valery Nuñez",3);
    await probarConMasValores("Blanca Núñez",5);
    await probarConMasValores("Alejandro Jiménez",7);
}

llamar();
// Llamada de prueba
  // Intenta hacer una reserva para 3 personas