// Define the base URL of the Pokémon API
const BASE_URL = 'https://pokeapi.co/api/v2';

// Function to fetch Pokémon details by ID
export async function fetchPokemonById(id) {
  try {
    // Construct the URL for the specific Pokémon using the ID
    const url = `${BASE_URL}/pokemon/${id}`;

    // Make an HTTP request to fetch Pokémon details
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch Pokémon details');
    }

    // Parse the response JSON
    const data = await response.json();

    // Extract and return the relevant Pokémon details
    const { name, height, weight, abilities } = data;

    return {
      name,
      height,
      weight,
      abilities: abilities.map((ability) => ability.ability.name),
    };
  } catch (error) {
    // Handle any errors (e.g., network errors)
    throw new Error(`Failed to fetch Pokémon details: ${error.message}`);
  }
}
