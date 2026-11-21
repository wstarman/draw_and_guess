<script setup lang="ts">
import { Game } from '@/models/Game';
import { GameState } from '@/models/types';
import { ref } from 'vue';

const players = ref(Game.players)

</script>

<template>
    <div class="main-container">
        <div>
            <div>Room: {{ Game.roomId }}</div>
            <div>Name: {{ Game.myNickname }}</div>
            <div>GameState: {{ GameState[Game.gameState.value] }}</div>
        </div>
        <div>
            {{ Game.hintWord }}
        </div>
        <div>
            Time: {{ Game.countDown }}
        </div>
    </div>
</template>

<style scoped>
.main-container {
    display: flex;
    border: 2px solid;
    padding: 1rem;
    flex-direction: row;
    justify-content: space-between;
    width: 80%;
}
</style>