<script setup lang="ts">
import { Game } from '@/models/Game';
import { GameState } from '@/models/types';

function startGame() {
    // TODO: really start a game
    Game.gameState.value = GameState.drawing;
}
</script>

<template>
    <div class="board center">
        <h1>This is the waiting room</h1>
        <p>Share the room id with your friends</p>
        <div class="code">{{ Game.roomId.value }}</div>
        <button class="yellow-btn" @click="startGame" :disabled="!Game.isHoster.value">
            ▶ Start the game
        </button>
    </div>
</template>

<style scoped></style>