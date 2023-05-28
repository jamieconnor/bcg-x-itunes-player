<script setup>
import { onMounted, ref } from 'vue';

// Refs
const mounted = ref(false);

// Cycle Hooks
onMounted(() => {
  mounted.value = true;
})

// Props
const props = defineProps({
  songPlaying : {
    type : Object,
    required : true
  }
})
</script>

<template>
  <div :class="['audio-player bg-primary bottom-0 fixed flex items-center left-0 font-oswald uppercase justify-center w-full z-10', {'active': mounted}]">
    <div class="audio-player-js mt-2" />
  </div>
  <div :class="['audio-player-shim', {'active': mounted}]"></div>
</template>

<style>
.audio-player {
  transition: all 1s;
  transform: translateY(100%);
  height: 120px;
  width: 100%;
}
.shikwasa {
  width: 100%;
}
.audio-player-js {
  display: flex;
  justify-content: center;
  width: 100%;
}
.audio-player.active {
  transform: translateY(0);
}
.audio-player-shim {
  transition: height 1s;
  height: 0;
}
.audio-player-shim.active {
  height: 120px;
}
.audio-player-js a:hover {
  color: black;
}
.audio-player-js .shk-bar {
  background: rgb(255 255 255 / 28%);
}
.audio-player-js .shk-cover {
  background-position: center;
}
.audio-player-js .shk-title {
  font-weight: normal;
}
</style>
