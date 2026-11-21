<script setup lang="ts">
import { Game } from './models/Game';
import { GameState } from './models/types';
import GameView from './views/GameView.vue';
import HomeView from './views/HomeView.vue';

</script>

<template>
    <HomeView v-if="Game.gameState.value === GameState.homepage" />
    <GameView v-if="Game.gameState.value !== GameState.homepage" />
</template>