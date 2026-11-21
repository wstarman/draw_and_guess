<script setup lang="ts">
import { Game } from '@/models/Game';
import { ref } from 'vue';

const players = ref(Game.players)

</script>

<template>
    <div>
        Player List:
        <div class="player-container">
            <div v-for="player in players" class="player-cell">
                Name: {{ player.nickname }} Score: {{ player.score }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.player-container {
    height: 70vh;
    width: 15vw;
    border: 2px solid;
    overflow: auto
}

.player-cell {
    border: 2px solid #ffa94d;
    border-radius: 50px;
    background-color: #ffd8a8;
    padding: 10px;
    margin: 5px
}
</style>