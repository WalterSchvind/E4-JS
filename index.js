// Variables para la pagina
const baseURL = "https://pokeapi.co/api/v2/pokemon/";
const caja = document.querySelector("#caja");
const form = document.getElementById("search-form");
const pokeId = document.getElementById("Numero");

const renderPokemon = (pokemon) => {
  // creamos la función para renderizar los pokemones
  const { id, name, sprites, height, weight, types } = pokemon;
  console.log(pokemon);
  return ` 
    <div class="poke"> 
        <img  src="${sprites.other["official-artwork"].front_default}"/>
        <h2>${name.toUpperCase()}</h2>
        
        <div class="tipo-poke">
            ${types
              .map((tipo) => {
                return `<span class="${tipo.type.name} poke__type">${tipo.type.name}</span>`;
              })
              .join("")}
        </div>
        <p class="id-poke">#${id}</p>
        <p class="height">Height: ${height / 10}m</p>
        <p class="weight">Weight: ${weight / 10}Kg</p>
    </div>
  `;
};

const renderPokemonList = (pokeList) => {
  // creamos la función para renderizar la lista de pokemones

  caja.innerHTML = renderPokemon(pokeList); // renderizamos en el html
};

/*Creamos la función para traernos la data del pokemon.*/
const fetchPokemons = async () => {
  const newUrl = baseURL + pokeId.value;
  const res = await fetch(`${newUrl}`); // llamamos a la api
  const data = await res.json(); // obtenemos la data

  return data; // retornamos la data
};

function init() {
  // creamos la función para inicializar la app
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log(pokeId);
    // obtenemos la data de la api

    if (pokeId.value == 0) {
      form.reset();
      return alert("Por favor ingrese un numero mayor que 0");
    } else if (pokeId.value > 905) {
      form.reset();
      return alert("No se encotro pokemon proba con un numero mas bajo");
    }
    let results = await fetchPokemons();
    renderPokemonList(results);
  });
}

/*Llamamos la función init */
init();
