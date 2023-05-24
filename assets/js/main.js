const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const cardPokeModal = document.getElementById('cardPokeModal');
const nameModalLabel = document.getElementById('nameModalLabel');

const maxRecords = 150;
const limit = 12;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
    <div type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" 
        onclick="abrirModal('${encodeURIComponent(JSON.stringify(pokemon))}')">
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                
                <img src="${pokemon.photo}"
                     alt="${pokemon.name}"
                     id="myDialog">
            </div>

        </li>
    </div>
    `;
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;
    });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNextPage = offset + limit;

    if (qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
});

function abrirModal(pokemon) {
    const pokemonObj = JSON.parse(decodeURIComponent(pokemon));
    console.log(pokemonObj);
    nameModalLabel.innerHTML = pokemonObj.name;
    cardPokeModal.innerHTML = 
    `    
    <li class="pokemon ${pokemonObj.type}">
        <span class="number">#${pokemonObj.number}</span>
        <span class="name">${pokemonObj.name}</span>

        <div class="detail">
            <ol class="types">
                ${pokemonObj.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <div style="display:block">
                <div> Experience: ${pokemonObj.baseExperience}</div>
                <div> Height: ${pokemonObj.height}</div>
                <div> Weight: ${pokemonObj.weight}</div>
            </div>
            <img src="${pokemonObj.photo}"
                alt="${pokemonObj.name}">   
        </div>
    </li>
    `
}
