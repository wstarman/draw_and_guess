<script setup lang="ts">
import { ref } from 'vue'
import Icon from '@/components/Icon.vue'
import { Game } from '@/models/Game.ts'
import { GameState } from '@/models/types.ts'

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

// TODO: remove this this for testing only
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
    <div class="home">
        <div class="home-form">
            <h1 class="logo"><span class="draw">Draw</span> and<br><span class="guess">Guess</span></h1>

            <label class="field pill">
                <Icon name="user" />
                <input v-model="inputName" placeholder="input your name">
            </label>

            <button class="big create pill" @click="createRoom">
                <Icon name="plus" /> Create Room
            </button>

            <label class="field pill">
                <Icon name="hash" />
                <input v-model="inputRoomId" placeholder="input room id">
            </label>

            <button class="big join pill" @click="joinRoom">
                <Icon name="exit" /> Join Room
            </button>
        </div>
    </div>
</template>

<style scoped>
.home {
    position: relative;
    z-index: 1;
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 24px;
}

.home-form {
    width: min(460px, 100%);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 18px;
}

.logo {
    font-size: clamp(52px, 12vw, 80px);
    padding-bottom: 10px;
}

.field {
    display: flex;
    align-items: center;
    gap: 12px;
    background: #fff;
    border: 3px solid var(--line);
    padding: 0 23px;
    height: 66px;
    box-shadow: 0 10px 30px rgba(110, 100, 200, 0.18);
}

.field:focus-within {
    border-color: var(--purple);
}

.field input {
    flex: 1;
    min-width: 0;
    border: 0;
    outline: 0;
    background: none;
    font: inherit;
    font-size: 17.6px;
    color: var(--ink);
}

.field input::placeholder {
    color: var(--mute);
}

.big {
    height: 74px;
    font-family: var(--display);
    font-weight: 800;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border: 3px solid;
    transition: transform 0.12s;
}

.big:active {
    transform: translateY(3px);
}

.create {
    background: linear-gradient(#ffdb7a, #ffcd57);
    border-color: var(--yellow-d);
    color: var(--ink);
    box-shadow: 0 6px 0 var(--yellow-d), 0 12px 20px rgba(242, 165, 74, 0.3);
}

.create :deep(svg) {
    stroke: var(--ink);
    stroke-width: 3.2;
}

.join {
    background: linear-gradient(#a898f5, #8f7cf0);
    border-color: var(--purple-d);
    color: #fff;
    box-shadow: 0 6px 0 var(--purple-d), 0 12px 20px rgba(111, 91, 216, 0.3);
}

.join :deep(svg) {
    stroke: #fff;
}
</style>