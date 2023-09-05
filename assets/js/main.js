function covertPokemonToLi(pokemon){
    return `
    <li class="pokemon">
        <span class="number">1</span>
        <span class="name">${pokemon.name}</span>
        
        <div class="detail">
            <ol class="types">
                <li>grass</li>
                <li>poison</li>
            </ol>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg" alt="${pokemon.name}">
        </div> 
    </li>
    `
}

const pokemonOl = document.getElementById('pokemonList')

pokeApi.getPokemons().then((pokemonList = []) => {
    pokemonOl.innerHTML += pokemonList.map(covertPokemonToLi).join('')
})
    
 