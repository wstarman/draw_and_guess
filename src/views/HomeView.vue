<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Room from './RoomView.vue'

const router = useRouter()

function startGame() {
    router.replace('/room')
}

</script>

<template>
    <div class="h1">Drow and Guess</div>
    <br>
    <button start class="h1" @click="startGame"> GAME START </button>
</template>

<style scoped>
.h1 {
    font-weight: 1000;
    font-size: 3rem;
    display: flex;
}
</style>
