
const pokemonOl = document.getElementById('pokemonList')
const LoadMoreButton = document.getElementById('LoadMoreButton')
const LoadLessButton = document.getElementById('LoadLessButton')
const Title = document.getElementById('Title')
let limit = 16;
let offset = 0;

function covertPokemonToLi(pokemon){
    return `
    <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        
        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div> 
    </li>
    `
}


function loadMorePokemon(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemonList = []) => {
        pokemonOl.innerHTML = pokemonList.map(covertPokemonToLi).join('')
    })
}

loadMorePokemon(offset , limit);

LoadMoreButton.addEventListener('click', () =>{
    offset += 16;
    limit += 16;
    loadMorePokemon(offset, limit)
    LoadLessButton.removeAttribute('disabled', true)
    Title.scrollIntoView({ behavior: 'auto' });
})

LoadLessButton.addEventListener('click', () =>{
    if(offset != 0){
        offset -= 16;
        limit -= 16;
        loadMorePokemon(offset, limit)
        Title.scrollIntoView({ behavior: 'auto' });
    }
})
 