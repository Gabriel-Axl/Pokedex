document.addEventListener('DOMContentLoaded', () => {
    const pokemonOl = document.getElementById('pokemonList');
    const detailCard = document.getElementById('detailCard');
    const LoadMoreButton = document.getElementById('LoadMoreButton');
    const LoadLessButton = document.getElementById('LoadLessButton');
    const Title = document.getElementById('detailCard');
    let limit = 16;
    let offset = 0;
    let openModal = null;
  
    function covertPokemonToLi(pokemon) {
      return `
        <li class="pokemon ${pokemon.type} ${pokemon.number}">
          <span class="number">#${pokemon.number}</span>
          <span class="name">${pokemon.name}</span>
          <div class="detail">
            <ol class="types">
              ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
          </div> 
        </li>
      `;
    }

    function detailModal(pokemon){
      return `
          <dialog id="pokeDetail" class="${pokemon.type}" open>
              <button id="btnClose">X</button>
              <div class="imgDetail"> <img class="detailImg" src="${pokemon.photo}">
              </div>
              <h1 id="pokeModalName">${pokemon.name}</h1>
              <div class="card">
                  <ol class="attributs">
                      <li>
                          <h3 class="label">HP</h3>
                          <h3>${pokemon.hp}</h3>
                      </li>                     
                      <li>
                          <h3 class="label">ATTACK</h3>
                          <h3>${pokemon.attack}</h3>
                      </li>                   
                      <li>
                          <h3 class="label">DEFENSE</h3>
                          <h3>${pokemon.defense}</h3>
                      </li>                   
                      <li>
                          <h3 class="label">SPEED</h3>
                          <h3>${pokemon.speed}</h3>
                      </li>                      
                      <li>
                          <h3 class="label">HEIGHT</h3>
                          <h3>${pokemon.height}</h3>
                      </li>
                  </ol>  
              </div> 
          </dialog>
      `;
    }
  
    function loadMorePokemon(offset, limit) {
      pokeApi.getPokemons(offset, limit).then((pokemonList = []) => {
        pokemonOl.innerHTML = pokemonList.map(covertPokemonToLi).join('');
      });
    }

    function ePokemon(order) {
      return pokeApi.getPokemon(order)
    }

    loadMorePokemon(offset, limit);

    pokemonOl.addEventListener('click', (event) => {
      const target = event.target;
      const pokemonElement = target.closest('li.pokemon');
    
      if (pokemonElement) {
        const number = parseInt(pokemonElement.classList[2]);
        if(openModal){
          openModal.remove()
        }
        ePokemon(number).then((pokemon) =>  {

          const modalContent = detailModal(pokemon);
    
          const div = document.createElement('div');
          div.innerHTML = modalContent;
          div.id = "divPokeDetail"
          const btnClose = div.querySelector('#btnClose');
          const modalPoke = div.querySelector('#pokeDetail');
    
          btnClose.addEventListener('click', () => {
            console.log('ref')
            modalPoke.close();
            div.remove();
          });
    
          detailCard.appendChild(div);
          Title.scrollIntoView({ behavior: 'smooth' });
          openModal = div;
        });

      }
    });
    
    LoadMoreButton.addEventListener('click', () => {
      offset += 16;
  
      loadMorePokemon(offset, limit);
      LoadLessButton.removeAttribute('disabled', true);
      Title.scrollIntoView({ behavior: 'auto' });
    });
  
    LoadLessButton.addEventListener('click', () => {
      if (offset !== 0) {
        offset -= 16;
        loadMorePokemon(offset, limit);
        Title.scrollIntoView({ behavior: 'auto' });
      }
    });

   

  });
  