<script setup lang="ts">
import DrawingPad from '@/components/mainArea/DrawingPad.vue';
import MessageArea from '@/components/MessageArea.vue';
import PlayerList from '@/components/PlayerList.vue';
import StatusBar from '@/components/StatusBar.vue';
import WaitingRoom from '@/components/mainArea/WaitingRoom.vue';
import { Game } from '@/models/Game';
import { GameState } from '@/models/types';
import Awarding from '@/components/mainArea/Awarding.vue';
import ShowingPad from '@/components/mainArea/ShowingPad.vue';
import WaitingOtherSelecting from '@/components/mainArea/WaitingOtherSelecting.vue';
import Revealing from '@/components/mainArea/Revealing.vue';
import SelectingWord from '@/components/mainArea/SelectingWord.vue';

function backToHome() {
    Game.gameState.value = GameState.homepage;
}

function changeState(state: GameState) {
    Game.gameState.value = state;
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
                    <SelectingWord v-if="Game.gameState.value === GameState.selecting" />
                    <DrawingPad v-if="Game.gameState.value === GameState.drawing" />
                    <ShowingPad v-if="[GameState.guessing, GameState.guessed].includes(Game.gameState.value)" />
                    <WaitingOtherSelecting v-if="Game.gameState.value === GameState.waitingOtherSelecting" />
                    <Revealing v-if="Game.gameState.value === GameState.revealing" />
                    <Awarding v-if="Game.gameState.value === GameState.awarding" />
                </div>
            </div>
            <MessageArea />
        </div>
        <div>
            [Test] change state to:
            <button @click="changeState(GameState.waitingOtherSelecting)"> waitingOtherSelecting </button>
            <button @click="changeState(GameState.guessing)"> guessing </button>
            <button @click="changeState(GameState.guessed)"> guessed </button>
            <button @click="changeState(GameState.selecting)"> selecting </button>
            <button @click="changeState(GameState.drawing)"> drawing </button>
            <button @click="changeState(GameState.revealing)"> revealing </button>
            <button @click="changeState(GameState.awarding)"> awarding </button>
        </div>
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
