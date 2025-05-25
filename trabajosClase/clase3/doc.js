const URL = "https://pokeapi.co/api/v2/pokemon";
/*
https://pokeapi.co/api/v2/

"https://pokeapi.co/api/v2/ability/"
"https://pokeapi.co/api/v2/pokemon/"
"https://pokeapi.co/api/v2/pokemon-species/"
"https://pokeapi.co/api/v2/move-category/"
"https://pokeapi.co/api/v2/pokemon-color/"
*/

//let arregloAux = new Set();
let arregloAux = [];

async function obtenerPokemonPorNombre (nombre, callback){
    const url_consulta = `${URL}/${nombre}`;
    const response = await fetch(url_consulta);

    if(!response.ok) throw new Error('HTTP' +  response.status);

    const data = await response.json();
    //console.log(data);
    
    return data;
}


async function obtenerPokemonPorHabilidad (habilidad, callback){
    
    const url_consulta = `${URL}`;
    const response = await fetch(url_consulta);

    if(!response.ok) throw new Error('HTTP' +  response.status);

    const data = await response.json();

    //console.log(data)

    //arregloAux.clear;

    let dataSecundaria;

    arregloAux = [];

    for(let i=0 ; i<data.results.length ; i++){

        let urlSecundaria = data.results[i].url;

        const responseSecundaria = await fetch(urlSecundaria);

        if(!responseSecundaria.ok) throw new Error('HTTP' +  responseSecundaria.status);

        dataSecundaria = await responseSecundaria.json();

        //console.log(dataSecundaria);

        if(dataSecundaria.abilities[0].ability.name == habilidad){
            arregloAux.push(dataSecundaria);
        }
        
    }

    let resultados = document.querySelector(".resultados");
    let aux = "";

    let i=0;

    arregloAux.forEach((e)=>{
        console.log(e);
        
        aux += 
        `<div class="resultado" onclick="mostrarPokemon(${i})">
            ${e.name}
        </div>`;

        i++;
    })

    resultados.innerHTML = aux;

    //console.log(data);
    
    return data;
}


async function obtenerPokemonPorColor (nombre, callback){
    const url_consulta = `${URL}/${nombre}`;
    const response = await fetch(url_consulta);

    if(!response.ok) throw new Error('HTTP' +  response.status);

    const data = await response.json();
    //console.log(data);
    
    return data;
}


async function cargarInfo (infoPokemon, type){

    let data;

    //habilidad
    if(type == 0){
        data = await obtenerPokemonPorHabilidad(infoPokemon, ()=>{});
        //nombre
    }else if(type == 1){
        data = await obtenerPokemonPorNombre(infoPokemon, ()=>{});
        //color
    }else{
        data = await obtenerPokemonPorColor(infoPokemon, ()=>{});
    }
    
    htmlDinamico(data);
}


document.getElementById("searchForm").addEventListener("submit", (event)=>{
    event.preventDefault();

    let infoPokemon;
    let type;

    //console.log(event.target.habilidadPokemon.value)

    if(event.target.habilidadPokemon.value != ""){
        infoPokemon = event.target.habilidadPokemon.value;
        type = 0;
    }else if(event.target.nombrePokemon.value != ""){
        infoPokemon = event.target.nombrePokemon.value;
        type = 1;
    }else if(event.target.colorPokemon.value != ""){
        infoPokemon = event.target.colorPokemon.value;
        type = 2;
    }

    cargarInfo(infoPokemon, type);
});


function htmlDinamico(data){

    let imgPokemon = document.querySelector(".img_pokemon");

    imgPokemon.innerHTML = `<img src="${data.sprites.front_default}" class="animate__animated animate__tada">`

    console.log(data.abilities[0].ability.name);
    console.log(data.abilities[1].ability.name);
    console.log(data.height);
    console.log(data.name);
    console.log(data.types[0].type.name);

}

//nombre
//tipo
//altura
//descripcion del pokemon

//Uso de promiseAll para el uso de varias peticiones a la vez en lugar de usar async/await

/*El uso de formularios ayuda mucho para evitar que nostros tengamos muchos querySelector y simplemente lo hagamos con un event.target*/

//HACE CLICK EN LAS OPCIONES DE SALIDA

function mostrarPokemon(pokemon){

    htmlDinamico(arregloAux[pokemon]);
}