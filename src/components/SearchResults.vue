<script setup>
import axios from 'axios';
import { ref } from 'vue';
import playerStore from '../playerStore';

// Refs
const details = ref(null);

// Props
const props = defineProps({
  songs : {
    type : Array,
    required : true
  },
  songPlaying : {
    type : [Object, null],
    required : true
  }
})

// Emits
const emits = defineEmits(['set-song-playing']);

// Methods
const setSong = (song) => {
  emits('set-song-playing', song);
  setTimeout(() => {
    playerStore.setPlayerSong(song)
    axios.get(`https://itunes.apple.com/lookup?id=${song.collectionId}&entity=song`).then((detailResponse) => {
      details.value = detailResponse.data.results.filter((d) => d.wrapperType === 'track');
    })
  }, 200);
}
</script>

<template>
  <div class="flex">
    <ul>
      <li v-for="song of props.songs" :key="song.trackId" @click="setSong(song)" :class="['song-item cursor-pointer flex space-x-4 block sm:max-w-sm p-6 bg-white border border-gray-200 shadow', props.songPlaying && props.songPlaying.trackId === song.trackId ? 'bg-red-700' : 'bg-slate-200 hover:bg-gray-100']" >
        <img :src="song.artworkUrl60"/>
        <div>
          <h5 class=" text-2xl font-bold tracking-tight text-gray-900">{{ song.artistName }}</h5>
          <p class="font-normal leading-tight text-gray-700">{{ song.trackName }}</p>
        </div>
      </li>
    </ul>
    <div v-if="details" class="hidden sm:block w-full">
      <img :src="props.songPlaying.artworkUrl100" class="p-6 mx-auto"/>
      <ul>
        <li v-for="detail of details" @click="setSong(detail)" :key="detail.trackId" :class="['song-item cursor-pointer flex space-x-4 block p-6 bg-white border border-gray-200 shadow', props.songPlaying && props.songPlaying.trackId === detail.trackId ? 'bg-slate-500' : 'bg-white-200 hover:bg-gray-100']" >
          <div>
            <p class="font-normal leading-tight text-gray-700">{{ detail.trackName }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.song-item img {
  height: 60px;
  width: 60px;
}
</style>
