<script setup>
import { ref } from 'vue';
import AudioPlayer from './components/AudioPlayer.vue';
import SearchInput from './components/SearchInput.vue';
import SearchResults from './components/SearchResults.vue';
import "./style.css";

// Refs
const songs = ref([])
const songPlaying = ref(null)

// Methods
const setSongPlaying = (song) => {
  songPlaying.value = song;
}
const setSongs = (songsResponse) => {
  songs.value = songsResponse;
}

</script>

<template>
  <SearchInput @set-songs="setSongs" />
  <SearchResults :songs="songs" :song-playing="songPlaying" @set-song-playing="setSongPlaying"/>
  <AudioPlayer v-if="songPlaying" :song-playing="songPlaying" />
</template>
