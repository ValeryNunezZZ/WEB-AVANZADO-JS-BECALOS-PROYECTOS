/* Esto si debería devolver lo mismo siempre */
const BASE_URL_API = "https://pokeapi.co/api/v2";
const formNombre = document.querySelector('#searchForm');
const salida = document.querySelector('#output')


/* Esto no devuelve lo mismo siempre */
const obtenerPokemonPorNombre = async (nombre) => {
    const url_consulta = `${BASE_URL_API}/pokemon/${nombre}`;

    const response = await fetch(url_consulta);

    /*fetch(url_consulta)
            .then(response => {
                response.json().then(data => {
                    console.log("CON PROMESAS: ", data)
    
                    if (!response.ok) {
                        throw new Error('HTTP ' + response.status)
                    }
    
                    fetch(url_consulta) //Supongamos que ahora hago una petición con data
                        .then(response => {
                            response.json().then(data => {
                                console.log("CON PROMESAS: ", data)
    
                                if (!response.ok) {
                                    throw new Error('HTTP ' + response.status)
                                }
    
                            })
                        })
                })
            }) */


    if (!response.ok) {
        throw new Error('HTTP ' + response.status)
    }

    const data = await response.json()

    //console.log(data);

    return data;
}

function buildPokemonCard({ id, name, sprites, abilities, types }) {
    const liAbilities = abilities
        .map(a => `<li>${a.ability.name}</li>`)
        .join('');

    const chips = types
        .map(t => `<span class="types">${t.type.name}</span>`)
        .join('');

    return `
      <div class="card show">
        <img src="${sprites.front_default}" alt="${name}">
        <h2>#${id} – ${name}</h2>
        <ul>${liAbilities}</ul>
        ${chips}
      </div>`;
}

formNombre.addEventListener('submit', async (event) => {
    event.preventDefault()
    const nombre = event.target.nombrePokemon;
    // console.log(nombre.value);
    const pokemonData = await obtenerPokemonPorNombre(nombre.value)

    console.log(pokemonData)

    salida.innerHTML = buildPokemonCard(pokemonData)
})

/* Código traido de POSTMAN */

/* 
const requestOptions = {
    method: "GET",
    redirect: "follow"
};

fetch("https://pokeapi.co/api/v2/pokemon/pikachu/", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error)); */