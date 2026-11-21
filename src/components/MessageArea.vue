<script setup lang="ts">
import { Game } from '@/models/Game';
import { ref } from 'vue';

const messages = ref(Game.messages)
const inputMessage = ref("")

// TODO: Really send the message
function sendMessage() {
    Game.messages.value.push(
        {
            sender: Game.myNickname.value,
            content: inputMessage.value,
            isAnswer: false
        }
    );
    inputMessage.value = "";
}

// TODO: auto scroll down when received a new message

</script>

<template>
    <div>
        Messages:
        <div class="message-container">
            <div v-for="message in messages" class="message-item">
                {{ message.sender }} : {{ message.content }}
            </div>
        </div>
        <div class="input-container">
            <input class="input-item" v-model="inputMessage" placeholder="guess your word here"
                v-on:keyup.enter="sendMessage" />
            <button @click="sendMessage"> send </button>
        </div>
    </div>
</template>

<style scoped>
.message-container {
    height: 67vh;
    width: 15vw;
    border: 2px solid;
    overflow: auto;
}

.message-item {
    padding: 0.2rem;
    margin: 0px;
    white-space: pre-wrap;
}

.input-container {
    display: flex;
    flex-direction: row;
    padding-top: 2px;
}
</style>