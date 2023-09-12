<template>
    <div>
      <h1>{{ pokemonDetails.name }}</h1>
      <img :src="pokemonDetails.image" alt="Pokemon" />
      <div>
        <h2>Details:</h2>
        <ul>
          <li><strong>Name:</strong> {{ pokemonDetails.name }}</li>
          <li><strong>Height:</strong> {{ pokemonDetails.height }} decimetres (dm)</li>
          <li><strong>Weight:</strong> {{ pokemonDetails.weight }} hectograms (hg)</li>
        </ul>
      </div>
      <div>
        <h2>Abilities:</h2>
        <ul>
          <li v-for="ability in pokemonDetails.abilities" :key="ability.name">{{ ability.name }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    async asyncData({ params }) {
      const pokemonIdOrName = params.id;
      const pokemonDetails = await fetchPokemonDetails(pokemonIdOrName);
      return { pokemonDetails };
    },
  };
  </script>
  