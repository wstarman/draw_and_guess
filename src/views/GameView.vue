<script setup lang="ts">
import { Game } from '@/models/Game';
import { useRoute } from 'vue-router'
const route = useRoute()
const roomId = route.params.roomId
</script>

<template>
    <div>Id: {{ roomId }}</div>
    <div>Name: {{ Game.myNickname }}</div>
</template>

<style scoped></style>
