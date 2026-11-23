<script setup lang="ts">
import { computed } from 'vue';
import { Game } from '@/models/Game';

const drawerName = computed(
    () => Game.players.value.find(p => p.isDrawer)?.nickname ?? 'Someone'
)
</script>

<template>
    <div class="board center">
        <div class="big-emoji">🤔</div>
        <h1>{{ drawerName }} is choosing a word</h1>
        <p>Get ready to guess!</p>
    </div>
</template>

<style scoped></style>