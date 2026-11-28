<script setup lang="ts">
import { Game } from '@/models/Game';
import { GameState } from '@/models/types';

/**
 * used to show other's drawing.
 */

// TODO: show the real drawing from the drawer
</script>

<template>
    <!-- guessing: empty board, waiting to show the drawing from the others -->
    <div v-if="Game.gameState.value === GameState.guessing" class="board"></div>

    <!-- guessed: already guessed correctly, waiting for the others -->
    <div v-else class="board center">
        <div class="big-emoji">🎉</div>
        <h1 class="ok">Correct!</h1>
        <div class="code sm">{{ Game.answer.value }}</div>
        <p>Waiting for the others to guess…</p>
    </div>
</template>

<style scoped></style>