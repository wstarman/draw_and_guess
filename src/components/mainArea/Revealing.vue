<script setup lang="ts">
import { Game } from '@/models/Game';

// TODO: show the real drawing under the answer
</script>

<template>
    <div class="board center top">
        <h1>It was</h1>
        <div class="answer">{{ Game.answer.value }}</div>
    </div>
</template>

<style scoped>
.top {
    justify-content: flex-start;
    padding-top: 28px;
    gap: 8px;
}

.answer {
    font-family: var(--display);
    font-weight: 800;
    font-size: clamp(48px, 9vw, 96px);
    line-height: 1.1;
    color: var(--purple-d);
    word-break: break-word;
}
</style>