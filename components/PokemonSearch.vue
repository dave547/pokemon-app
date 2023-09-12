<template>
    <div>
      <input
        class="search-input"
        type="text"
        v-model="searchQuery"
        placeholder="Search Pokémon by name"
      />
    </div>
  </template>
  
  <script>
  export default {
    props: {
      value: String, // The search query passed as a prop
    },
    data() {
      return {
        searchQuery: this.value, // Initialize with the passed search query
      };
    },
    watch: {
      searchQuery(newQuery) {
        // Emit an event with the updated search query
        this.$emit("input", newQuery);
      },
    },
  };
  </script>
    
<style scoped>
.search-input {
  width: 80%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  font-size: 1rem;
}
</style>


  