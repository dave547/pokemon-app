// Define the base URL of the Pokémon API
const BASE_URL = 'https://pokeapi.co/api/v2';

// Function to fetch Pokémon details by ID
export async function fetchPokemonById(id) {
  try {
    const url = `${BASE_URL}/pokemon/${id}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch Pokémon details: ${response.statusText}`);
    }

    const data = await response.json();

    // Check if the expected data structure is present
    if (!data || !data.name || !data.height || !data.weight || !data.abilities) {
      throw new Error('Invalid Pokémon data received');
    }

    const { name, height, weight, abilities } = data;

    return {
      name,
      height,
      weight,
      abilities: abilities.map((ability) => ability.ability.name),
    };
  } catch (error) {
    // Handle any errors, including network errors and invalid data
    throw new Error(`Failed to fetch Pokémon details: ${error.message}`);
  }
}

// Function to fetch a list of Pokémon
export async function fetchPokemonList() {
  try {
    const url = `${BASE_URL}/pokemon?limit=60`; 
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch Pokémon list: ${response.statusText}`);
    }

    const data = await response.json();

    // Check if the expected data structure is present
    if (!data || !data.results) {
      throw new Error('Invalid Pokémon list data received');
    }

    const pokemonList = data.results.map((pokemon) => ({
      id: extractIdFromUrl(pokemon.url), 
      name: pokemon.name,
    }));

    return pokemonList;
  } catch (error) {
    // Handle any errors, including network errors and invalid data
    throw new Error(`Failed to fetch Pokémon list: ${error.message}`);
  }
}

// Helper function to extract the Pokémon ID from its API URL
function extractIdFromUrl(url) {
  const parts = url.split('/');
  return parseInt(parts[parts.length - 2]);
}
