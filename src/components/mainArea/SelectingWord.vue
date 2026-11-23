<script setup lang="ts">
import { computed } from 'vue';
import { Game } from '@/models/Game';
import { GameState } from '@/models/types';

// TODO: get the real 3 word choices from the server
// ตอนนี้ตัวเลือกแรกคือ Game.answer ส่วนอีกสองตัวเป็นคำชั่วคราว
const words = computed(() => [Game.answer.value, 'rocket', 'banana'])

function pickWord(_word: string) {
    // TODO: tell the server which word was picked
    Game.gameState.value = GameState.drawing;
}
</script>

<template>
    <div class="board center">
        <h1>Choose what you want to draw</h1>
        <div class="words">
            <button v-for="word in words" :key="word" class="word" @click="pickWord(word)">
                {{ word }}
            </button>
        </div>
    </div>
</template>

<style scoped>
.words {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
    justify-content: center;
}

.word {
    min-width: 170px;
    height: 82px;
    border-radius: 999px;
    border: 3px solid var(--yellow-d);
    background: linear-gradient(#ffdb7a, #ffcd57);
    color: var(--ink);
    font-family: var(--display);
    font-weight: 800;
    font-size: 22px;
    padding: 0 24px;
    transition: transform 0.12s, background 0.15s, border-color 0.15s, color 0.15s;
}

.word:hover {
    background: linear-gradient(#a898f5, #8f7cf0);
    border-color: var(--purple-d);
    color: #fff;
}

.word:active {
    transform: translateY(3px);
}
</style>