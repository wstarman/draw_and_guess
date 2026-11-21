<script setup lang="ts">
import { ref } from 'vue'
import GameView from './GameView.vue'
import { Game } from '@/models/Game.ts'
import { GameState } from '@/models/types.ts';

const inputName = ref("");
const inputRoomId = ref("")

function createRoom() {
    if (inputName.value != "") {
        Game.myNickname.value = inputName.value;
    } else {
        Game.myNickname.value = "player" + Math.floor(Math.random() * 10000)
    }
    // TODO: really start a game
    Game.isHoster.value = true;
    Game.gameState.value = GameState.waitingRoom;
    Game.roomId.value = String(Math.floor(Math.random() * 10000));
    setTestData();
}

function joinRoom() {
    // TODO: really join a game
    if (inputRoomId.value !== "") {
        Game.gameState.value = GameState.waitingRoom;
    }
    if (inputName.value != "") {
        Game.myNickname.value = inputName.value;
    } else {
        Game.myNickname.value = "player" + Math.floor(Math.random() * 10000)
    }
    Game.isHoster.value = false;
    Game.roomId.value = inputRoomId.value;
    setTestData();
}

// TODO: remove this
function setTestData() {
    Game.hintWord.value = "a _ _ w _ r (6)";
    Game.answer.value = "answer";
    Game.messages.value = [
        {
            sender: "aaa",
            content: "answer",
            isAnswer: true
        }
    ];
    Game.players.value = [
        {
            nickname: "aaa",
            score: 100,
            isDrawer: true,
            isMe: false,
        },
        {
            nickname: "bbb",
            score: 9999,
            isDrawer: false,
            isMe: true,
        },
        {
            nickname: "ccc",
            score: 0,
            isDrawer: false,
            isMe: false,
        },
    ]
}
</script>

<template>
    <div class="main-wrapper">
        <h1>Drow and Guess</h1>
        <input v-model="inputName" placeholder="input your name">
        <br>
        <button start class="home-button create" @click="createRoom"> CREATE ROOM </button>
        <br>
        <input v-model="inputRoomId" placeholder="input room id">
        <button start class="home-button join" @click="joinRoom"> JOIN ROOM </button>
    </div>
</template>

<style scoped>
.main-wrapper {
    display: flex;
    flex-direction: column;
    place-items: center center;
    gap: 1rem;
}

h1 {
    font-weight: 1000;
    font-size: 3rem;
}

.home-button {
    width: 15vw;
    height: 4rem;
    font-size: 2rem;
}
</style>
