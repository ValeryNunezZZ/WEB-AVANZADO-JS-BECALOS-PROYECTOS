function prueba(nombre, callback){
    callback();
    console.log(nombre);
}

prueba("vALERY", ()=>{
    console.log("ejecutando el callback");
})

let promesa = new Promise((res, rej) => {
    if(5 == 2){
        return res('hola');
    }else{
        return rej("adios")
    }
});

promesa.then(res => {
    console.log(res)
}).catch(rej => {
    console.log(rej);
})