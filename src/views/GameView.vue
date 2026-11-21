<script setup lang="ts">
import DrawingPad from '@/components/mainArea/DrawingPad.vue';
import MessageArea from '@/components/MessageArea.vue';
import PlayerList from '@/components/PlayerList.vue';
import StatusBar from '@/components/StatusBar.vue';
import WaitingRoom from '@/components/mainArea/WaitingRoom.vue';
import { Game } from '@/models/Game';
import { GameState } from '@/models/types';
import { onMounted } from 'vue';
import TextPad from '@/components/mainArea/TextPad.vue';
import Rewarding from '@/components/mainArea/Rewarding.vue';
import ShowingPad from '@/components/mainArea/ShowingPad.vue';

function backToHome() {
    Game.gameState.value = GameState.homepage;
}

function test() {
    Game.gameState.value = GameState.revealing;
}

</script>

<template>
    <div class="page-wrapper">
        <button @click="backToHome" class=not-stretch> Back to home </button>
        <StatusBar />
        <div class="center-wrapper">
            <PlayerList />
            <div>
                Main Area:
                <div class="main-area">
                    <WaitingRoom v-if="Game.gameState.value === GameState.waitingRoom" />
                    <DrawingPad v-if="[GameState.selecting, GameState.drawing].includes(Game.gameState.value)" />
                    <ShowingPad v-if="[GameState.guessing, GameState.guessed].includes(Game.gameState.value)" />
                    <TextPad
                        v-if="[GameState.waitingOtherSelecting, GameState.revealing].includes(Game.gameState.value)" />
                    <Rewarding v-if="Game.gameState.value === GameState.awarding" />
                </div>
            </div>
            <MessageArea />
        </div>
        <button @click="test"> test </button>
    </div>
</template>

<style scoped>
.page-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    align-self: flex-start;
    width: 98vw;
}

.center-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.center-wrapper>div {
    padding: 1rem;
}

.main-area {
    border: 2px solid;
    padding-top: 1rem;
    padding-bottom: 1rem;
    height: 70vh;
    aspect-ratio: 4 / 3;
}

.not-stretch {
    align-self: flex-start;
}
</style>
