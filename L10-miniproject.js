async function fetchPokemonData(pokemonName) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
      if (!response.ok) throw new Error('Pokémon not found');
      return await response.json();
    } catch (error) {
      return null;
    }
  }
  
  function displayPokemonInfo(data) {
    const pokemonInfoElement = document.getElementById('pokemon-info');
  
    if (!data) {
      pokemonInfoElement.innerHTML = `<p style="color:red;">Pokémon not found. Please try again.</p>`;
      return;
    }
 
    // Task 3. Display pokemon details in a styled and readable format
    pokemonInfoElement.innerHTML = `
      <h2>${data.name}</h2>
      <img src="${data.sprites.front_default}" alt="${data.name}">
      
      <h3>Abilities:</h3>
      <ul>
        ${data.abilities.map(ability => `<li>${ability.ability.name}</li>`).join('')}
      </ul>
      
      <h3>Type:</h3>
      <p>${data.types.map(t => t.type.name).join(', ')}</p>
      
      <h3>Stats:</h3>
      <ul>
        ${data.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
      </ul>
    `;
  }
  
  
document.addEventListener('DOMContentLoaded', async () => {
    const defaultData = await fetchPokemonData('pikachu');
    displayPokemonInfo(defaultData);
  
    
    document.getElementById('search-button').addEventListener('click', async () => {
      const searchInput = document.getElementById('search-input').value.trim();
      if (searchInput) {
        const data = await fetchPokemonData(searchInput);
        displayPokemonInfo(data);
      }
    });
  });
  