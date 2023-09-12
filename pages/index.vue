<template>
  <div>
    <header>
      <h1>Pokémon List</h1>
      <PokemonSearch v-model="searchQuery" />
    </header>
    <div class="pokemon-card-grid">
      <div v-for="pokemon in filteredPokemons" :key="pokemon.name">
        <!-- Link to the Pokémon profile page -->
        <nuxt-link :to="`/pokemon/${pokemon.name}`">
          <img :src="pokemon.thumbnail" alt="Pokemon" />
          <p>{{ pokemon.name }}</p>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import PokemonSearch from "~/components/PokemonSearch.vue";

export default {
  components: {
    PokemonSearch,
  },
  data() {
    return {
      searchQuery: "",
      pokemons: [], // Initialize as an empty array
    };
  },
  async fetch() {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=60');
      if (response.ok) {
        const data = await response.json();
        const pokemonList = data.results;
        for (const pokemon of pokemonList) {
          const detailsResponse = await fetch(pokemon.url);
          if (detailsResponse.ok) {
            const details = await detailsResponse.json();
            const { name, sprites } = details;
            this.pokemons.push({
              name,
              thumbnail: sprites.front_default,
            });
          }
        }
      } else {
        // Handle fetch error (e.g., show an error message)
        console.error('Failed to fetch Pokémon data');
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error('Failed to fetch Pokémon data:', error);
    }
  },
  computed: {
    filteredPokemons() {
      const query = this.searchQuery.toLowerCase();
      return this.pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(query)
      );
    },
  },
};
</script>

<style>
html, body {
  font-family: sans-serif;
  background: linear-gradient(to bottom, #6441A5, #2a0845);
}

header {
  text-align: center;
  margin-bottom: 20px;
}

h1 {
  color: #fff;
}

.pokemon-card-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  div{
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 20px;
    text-align: center;
    background: #fff;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
 }
}

.pokemon-card {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  text-align: center;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>
