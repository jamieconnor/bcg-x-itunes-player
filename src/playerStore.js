import { Player } from 'shikwasa';
import 'shikwasa/dist/style.css';
import { reactive } from 'vue';

export default reactive({
  player : null,
  song: null,
  display: false,
  playing: false,
  loading: true,
  setPlayerSong(song) {
    if(this.player !== null && this.song.trackId === song.trackId) {
      if(this.playing) {
        this.pause();
      } else {
        this.play();
      }
      return;
    }
    if(this.player === null) {
      this.player = new Player({
        container: () => document.querySelector('.audio-player-js'),
        audio: {
          title: song.trackName,
          artist: song.artistName,
          cover: song.artwork60,
          src: song.previewUrl,
          duration: song.trackTimeMillis / 1000,
        },
        speedOptions: [1.5, 2, 5],
        theme: 'light',
        fixed: {
          type: 'static',
        },
        themeColor: '#252525',
        preload: 'none',
        download: true
      })
      this.player.on('play', () => {
        this.playing = true;
      })
      this.player.on('pause', () => {
        this.playing = false;
      })
      this.player.on('error', () => {
        console.err('you got problems tiger');
        console.err('insatiable 🐅');
      })
    } else {
      this.player.update({
        title: song.trackName,
        artist: song.artistName,
        cover: song.artwork60,
        src: song.previewUrl,
        duration: song.trackTimeMillis / 1000,
      });
    }
    this.player.play();
    this.song = song;
    this.display = true;
  },
  play() {
    this.playing = true;
    this.player.play();
  },
  pause() {
    this.playing = false;
    this.player.pause();
  },
})
