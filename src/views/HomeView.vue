<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import GameView from './GameView.vue'
import { Game } from '@/models/Game.ts'

const router = useRouter()

function startGame() {
    // TODO: remove testing data
    Game.messages = [
        {
            sender: "aaa",
            content: "test",
            isAnswer: false
        },
        {
            sender: "bbb",
            content: "test2",
            isAnswer: false
        },
        {
            sender: "aaa",
            content: "answer",
            isAnswer: true
        }
    ];
    Game.players = [
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
    router.replace('/game/1234')
}

</script>

<template>
    <h1>Drow and Guess</h1>
    <br>
    <input placeholder="input your name">
    <br>
    <button start class="h1" @click="startGame"> GAME START </button>
</template>

<style scoped>
h1 {
    font-weight: 1000;
    font-size: 3rem;
    display: flex;
}
</style>
