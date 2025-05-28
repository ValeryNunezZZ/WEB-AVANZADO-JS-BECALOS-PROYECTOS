
const URL = "https://rickandmortyapi.com/api/character";
let personajes = [];
let personajesAxios = [];

///PARTE DE FETCH

const obtnerPersonajes = async () => {

    const res = await fetch(URL);

    if(!res.ok){
        console.log("ERROR EN LA CARGA DE LA INFO D:");
        return;
    }

    const data = await res.json();
    personajes = [...data.results]
    
    let card = document.querySelector(".card");
    cargarPersonaje(data.results[0], card);
}

///PARTE DE AXIOS

axios.get(URL)
.then(response => {
    console.log(response.data.results)
    personajesAxios = [...response.data.results]
    
    let card = document.querySelector(".cardAxios");
    cargarPersonaje(response.data.results[0], card);
})
.catch(error => console.error("Error: " + error));


//RELLENAR CARTAS

const cargarPersonaje = (personaje, card) => {
    
    card.value = "";

    let interior = `
        <img src="${personaje.image}" alt="Imagen del personaje">

        <div class="info">
            <h2>${personaje.name}</h2>
            <p><strong>Localidad: </strong>${personaje.location.name}</p>
            <p><strong>Planeta de origen:</strong>${personaje.origin.name}</p>
        </div>
    `;

    card.innerHTML = interior;
}



let pos = 0;

obtnerPersonajes();

document.querySelector(".anterior").addEventListener("click", ()=>{
    pos--;

    if(pos < 0) pos = 19;

    cargarPersonaje(personajes[pos], document.querySelector(".card"));
});

document.querySelector(".siguiente").addEventListener("click", ()=>{
    pos++;

    if(pos > 19) pos = 0;

    cargarPersonaje(personajes[pos], document.querySelector(".card"));
});

document.querySelector(".anteriorAxios").addEventListener("click", ()=>{
    pos--;

    if(pos < 0) pos = 19;

    cargarPersonaje(personajes[pos], document.querySelector(".cardAxios"));
});

document.querySelector(".siguienteAxios").addEventListener("click", ()=>{
    pos++;

    if(pos > 19) pos = 0;

    cargarPersonaje(personajes[pos], document.querySelector(".cardAxios"));
});



