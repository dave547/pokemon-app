// import { fetchPokemonById } from './api/pokemonApi';
import { fetchPokemonList } from './api/pokemonApi';

export default {
  target: 'static', // default is 'server'
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'pokemon-app',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [], 

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // Router config
  generate: {
    routes: async () => {
      try {
        const pokemonList = await fetchPokemonList();
        return pokemonList.map((pokemon) => `/pokemon/${pokemon.id}`);
      } catch (error) {
        console.error('Failed to fetch Pokémon list:', error);
        return [];
      }
    },
  },
};
