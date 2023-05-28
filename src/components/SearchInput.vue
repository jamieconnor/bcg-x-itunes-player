<script setup>
import axios from 'axios';
import { ref } from 'vue';
const search = ref('')
const timeout = ref(null);

// Methods
const searchLookup = (event, value) => {
  // Debounce api requests
  timeout.value = setTimeout(() => {
    axios.get(`https://itunes.apple.com/search?entity=song&attribute=artistTerm&media=music&limit=25&term=${search.value}`).then(
      (response) => {
        emits('set-songs', response.data.results);
      })
  }, 150);
}

// Emits
const emits = defineEmits(['set-songs']);
</script>

<template>
  <div class="p-4 bg-gradient-to-r from-indigo-500">
    <label for="search" class="block mb-2 text-sm font-medium text-gray-900">Search</label>
    <input v-model="search" @keyup="searchLookup" type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Artist" required>
  </div>
</template>

<style>
</style>
