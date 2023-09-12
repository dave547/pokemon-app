<template>
    <div>
      <h1>{{ pokemonData.name }}</h1>
      <p>Height: {{ pokemonData.height }}</p>
      <p>Weight: {{ pokemonData.weight }}</p>
  
      <!-- Display image -->
      <img :src="constructImageUrl(pokemonData.name)" alt="Pokemon" />
  
      <!-- Display formatted abilities -->
      <div v-if="formattedAbilities">
        <h2>Abilities:</h2>
        <p>{{ formattedAbilities }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { fetchPokemonById } from '~/api/pokemonApi'; // Adjust the import path
  
  export default {
    async asyncData({ params }) {
      const { id } = params;
      // Fetch Pokémon details using the 'id' parameter
      const pokemonData = await fetchPokemonById(id);
      return { pokemonData };
    },
    computed: {
      formattedAbilities() {
        // Check if abilities are available
        if (this.pokemonData.abilities.length > 0) {
          // Capitalize the first letter of each ability and join them with commas
          return this.pokemonData.abilities
            .map((ability) => ability.charAt(0).toUpperCase() + ability.slice(1))
            .join(', ');
        } else {
          return ''; // Return an empty string if there are no abilities
        }
      },
    },
    methods: {
      constructImageUrl(pokemonName) {
        // Define the base URL for Pokémon images (adjust the URL as needed)
        const baseUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
        // Construct the full image URL based on the Pokémon's name
        return `${baseUrl}${pokemonName.toLowerCase()}.png`;
      },
    },
  };
  </script>
  
  
  

<style>
.pokemon-containter {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  max-width: 960px;
  margin: 20px auto;
  padding: 20px;
  h1{
    color: #000;
  }
}
</style>
