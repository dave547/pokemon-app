// Define the base URL of the Pokémon API
const BASE_URL = 'https://pokeapi.co/api/v2';

// Function to fetch Pokémon details by ID
export async function fetchPokemonById(id) {
  try {
    const url = `${BASE_URL}/pokemon/${id}`;
    const response = await fetch(url);

    // console.log('API Response:', response);

    if (!response.ok) {
      // Log the full response for debugging
      console.error('API Response:', response);

      throw new Error(`Failed to fetch Pokémon details: ${response.statusText}`);
    }

    const data = await response.json();

    // console.log('API Data:', data);

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


