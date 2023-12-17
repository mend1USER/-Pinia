<template>
  <form @submit.prevent="searchStore.getMovies(searchMovie)">
    <input
      type="text"
      class="search-input"
      v-model="searchMovie"
      placeholder="Input movie"
    />
  </form>
  <Loader v-if="searchStore.loader" />
  <div v-else>
    <Movie
      v-for="movie of searchStore.movies"
      :key="movie.id"
      :movie="movie"
      :is-search="true"
    />
  </div>
</template>

<script setup>
import Loader from "../components/Loader.vue";

import { ref } from "vue";
import { useSearchStore } from "../stores/SearchStore";
import Movie from "../components/Movie.vue";

const searchStore = useSearchStore();
const searchMovie = ref("");
</script>

<style lang="css">
.search-input {
  border: 10px solid #e7e7e7;
  width: 100%;
  height: 40px;
  padding: 0 10px;
  margin-bottom: 10px;
  border-radius: 10px;
}
</style>
