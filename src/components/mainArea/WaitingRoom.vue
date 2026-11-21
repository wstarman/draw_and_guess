<script setup lang="ts">
import { Game } from '@/models/Game';
import { GameState } from '@/models/types';
import { ref } from 'vue';

function startGame() {
    // TODO: really start a game
    Game.gameState.value = GameState.drawing;
}
</script>

<template>
    <div class="main-container">
        This is the waiting room.
        The room id is {{ Game.roomId }}
        <button @click="startGame" v-bind:disabled=!Game.isHoster.value> START THE GAME </button>
    </div>
</template>

<style scoped>
.main-container {
    display: flex;
    flex-direction: column;
}
</style>