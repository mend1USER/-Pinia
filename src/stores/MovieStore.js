import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";

export const useMovieStore = defineStore("movieStore", () => {
  const movies = ref([]);
  const activeTab = ref(2);

  const movieInLocalStorage = localStorage.getItem("movies");
  if (movieInLocalStorage) {
    movies.value = JSON.parse(movieInLocalStorage)._value;
  }

  const watchedMovies = computed(() =>
    movies.value.filter((el) => el.isWatched)
  );

  const totalCountMovies = computed(() => movies.value.length);

  const setActiveTab = (id) => {
    activeTab.value = id;
  };

  const toggleWatched = (id) => {
    const idx = movies.value.findIndex((el) => el.id === id);
    movies.value[idx].isWatched = !movies.value[idx].isWatched;
  };

  const deleteMovie = (id) => {
    movies.value = movies.value.filter((el) => el.id !== id);
  };

  watch(
    () => movies,
    (state) => {
      localStorage.setItem("movies", JSON.stringify(state));
    },
    { deep: true }
  );

  return {
    movies,
    activeTab,
    watchedMovies,
    toggleWatched,
    totalCountMovies,
    deleteMovie,
    setActiveTab,
  };
});
