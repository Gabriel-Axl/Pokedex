const pokeApi ={}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    pokemon.hp = pokeDetail.stats[0].base_stat
    pokemon.attack = pokeDetail.stats[1].base_stat
    pokemon.defense = pokeDetail.stats[2].base_stat
    pokemon.speed = pokeDetail.stats[5].base_stat
    pokemon.height = pokeDetail.height
    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) =>{
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset, limit) =>{
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons)=> pokemons.map((pokeApi.getPokemonDetail)))
        .then((detailRequest)  => Promise.all(detailRequest))
        .then((pokemonDetails) => pokemonDetails)
}

pokeApi.getPokemon = (order) =>{
    const url = `https://pokeapi.co/api/v2/pokemon/${order}/`
    return fetch(url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

  

