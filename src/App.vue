<script setup lang="ts">
import { Game } from './models/Game'
import { GameState } from './models/types'
import GameView from './views/GameView.vue'
import HomeView from './views/HomeView.vue'
</script>

<template>
  <div class="cloud c1"></div>
  <div class="cloud c2"></div>
  <div class="cloud c3"></div>
  <svg class="star" style="left:12vw;top:38vh" width="30" height="30" viewBox="0 0 24 24">
    <path fill="#ffcd57" d="m12 2 3 7 7.5.6-5.7 4.9 1.8 7.4L12 18l-6.6 3.9 1.8-7.4L1.5 9.6 9 9z" />
  </svg>
  <svg class="star" style="right:15vw;top:30vh" width="24" height="24" viewBox="0 0 24 24">
    <path fill="#ffcd57" d="m12 2 3 7 7.5.6-5.7 4.9 1.8 7.4L12 18l-6.6 3.9 1.8-7.4L1.5 9.6 9 9z" />
  </svg>
  <svg class="star" style="left:68vw;bottom:10vh" width="32" height="32" viewBox="0 0 24 24">
    <path fill="#8f7cf0" d="M12 1c.8 6 3.6 9.2 11 11-7.4 1.8-10.2 5-11 11-.8-6-3.6-9.2-11-11C8.4 10.2 11.2 7 12 1z" />
  </svg>

  <HomeView v-if="Game.gameState.value === GameState.homepage" />
  <GameView v-else />
</template>

<style>
.cloud { position: fixed; background: #f0f4ff; border-radius: 50%; z-index: 0; pointer-events: none; }
.c1 { width: 36vw; height: 240px; left: -10vw; top: -12px; }
.c2 { width: 46vw; height: 280px; right: -12vw; top: -50px; }
.c3 { width: 58vw; height: 320px; left: 20vw; bottom: -60px; }
.star { position: fixed; z-index: 0; pointer-events: none; }
</style>