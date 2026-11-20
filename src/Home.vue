<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)

function increment() {
    count.value++
}
</script>

<template>
    <div class="h1">Count: {{ count }}</div>
    <br>
    <button @click="increment"> +1 </button>
</template>

<style scoped>
.h1 {
    font-weight: 1000;
    font-size: 3rem;
    position: relative;
    text-align: center;
}
</style>
