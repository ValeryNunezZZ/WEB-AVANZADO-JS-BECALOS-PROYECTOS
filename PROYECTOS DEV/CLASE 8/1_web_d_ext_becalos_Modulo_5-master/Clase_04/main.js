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

    const cardColor = tipoColores[types[0].type.name] || "#fff"
    const cardColorClass = tipoColores[types[0].type.name] || ""

    return `
      <div class="card show ${cardColorClass}" style="background-color:${cardColor}">
        <img src="${sprites.front_default}" alt="${name}">
        <h2>#${id} – ${name}</h2>
        <ul>${liAbilities}</ul>
        ${chips}
      </div>`;
}

formNombre.addEventListener('submit', async (event) => {
    event.preventDefault()
    const nombre = event.target.nombrePokemon;
    if (!nombre) return;

    showLoader();
    salida.innerHTML = '';
    // console.log(nombre.value);

    setTimeout(async () => {
        try {
            const pokemonData = await obtenerPokemonPorNombre(nombre.value)
            saveHistory(nombre.value)
            console.log(pokemonData)
            salida.innerHTML = buildPokemonCard(pokemonData)
        } catch (err) {
            salida.innerHTML = `<p id=errorMsg>El pokemon no se encuentra! (${err.message})</p>`
        } finally {
            hideLoader()
        }
    }, 2000);
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

/* ##### Loader ##### */

const showLoader = () => document.querySelector("#loader").classList.remove('hidden')

const hideLoader = () => document.querySelector("#loader").classList.add('hidden')

/* ##### historial ###### */

const MAX_HISTORY = 5;

function saveHistory(nombre) {
    let history = JSON.parse(localStorage.getItem('pokeHistory')) || [];
    history = [nombre, ...history.filter(item => item !== nombre)]
    if (history.length > MAX_HISTORY)
        history = history.slice(0, MAX_HISTORY);
    localStorage.setItem('pokeHistory', JSON.stringify(history));
    renderHistory();
}


function renderHistory() {
    const container = document.querySelector('#recentSearch');
    const history = JSON.parse(localStorage.getItem('pokeHistory')) || [];

    if (!history.length)
        return container.innerHTML = '';

    container.innerHTML = `
    <h3>Recientes:</h3>
    <div class="history-buttons">
      ${history.map(name => `<button class="history-btn">${name}</button>`).join('')}
    </div>
  `;

    document.querySelectorAll('.history-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('[name=nombrePokemon]').value = btn.textContent;
            formNombre.dispatchEvent(new Event('submit'));
        });
    });
}

// Inicialízalo en el primer load
renderHistory();


/* ###### Cambiar color dependiendo del tipo ####### */

const tipoColores = {
    fire: '#f86306',
    water: '#06d0f8',
    wind: '#DEE8DEFF',
    grass: '#1AF806FF',
    earth: '#7C5F3BFF',
    rock: '#7C7C7CFF',
    ghost: '#4D1F92FF',
    electric: '#EFE518FF',
}

