<template>
  <div>
    <div class="pokemon-container">
      <!-- Display image -->
      <img :src="spriteUrl" alt="Pokemon" />
      <h1>{{ pokemonData.name }}</h1>
      <p>Height: {{ pokemonData.height }}</p>
      <p>Weight: {{ pokemonData.weight }}</p>

      <!-- Display formatted abilities -->
      <div v-if="formattedAbilities">
        <h2>Abilities:</h2>
        <p>{{ formattedAbilities }}</p>
      </div>

      <nuxt-link to="/">Back to Pokemon Search</nuxt-link>
    </div>
  </div>
</template>

<script>
import { fetchPokemonById } from '~/api/pokemonApi';


const getPokemonSprite = async (pokemonName) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    if (response.ok) {
      const data = await response.json();
      const spriteUrl = data.sprites.front_default;
      return spriteUrl;
    } else {
      console.error('Failed to fetch Pokémon data');
      return null;
    }
  } catch (error) {
    console.error('Failed to fetch Pokémon data:', error);
    return null;
  }
};

export default {
  async asyncData({ params }) {
    const { id } = params;
    try {
      // Fetch Pokémon details using the 'id' parameter
      const pokemonData = await fetchPokemonById(id);
      // Fetch the sprite URL using the Pokémon's name
      const spriteUrl = await getPokemonSprite(pokemonData.name);
      return { pokemonData, spriteUrl };
    } catch (error) {
      console.error('Failed to fetch Pokémon details _id.vue:', error);
      return { pokemonData: null, spriteUrl: null };
    }
  },
  computed: {
    formattedAbilities() {
      // Check if abilities are available
      if (this.pokemonData && this.pokemonData.abilities.length > 0) {
        // Capitalize the first letter of each ability and join them with commas
        return this.pokemonData.abilities
          .map((ability) => ability.charAt(0).toUpperCase() + ability.slice(1))
          .join(', ');
      } else {
        return ''; // Return an empty string if there are no abilities
      }
    },
  },
};
</script>

<style>
.pokemon-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  max-width: 960px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 8px;;
  h1{
    color: #000;
  }
}
</style>
