<script setup lang="ts">
import Icon from '@/components/Icon.vue'
import { Game } from '@/models/Game';
import { nextTick, ref, watch } from 'vue';

const messages = ref(Game.messages)
const inputMessage = ref("")
const listEl = ref<HTMLElement | null>(null)

// TODO: Really send the message
function sendMessage() {
    if (inputMessage.value.trim() === "") return;
    Game.messages.value.push(
        {
            sender: Game.myNickname.value,
            content: inputMessage.value,
            isAnswer: false
        }
    );
    inputMessage.value = "";
}

// auto scroll down when received a new message
watch(
    () => messages.value.length,
    async () => {
        await nextTick();
        if (listEl.value) listEl.value.scrollTop = listEl.value.scrollHeight;
    },
    { flush: 'post' }
)
</script>

<template>
    <section class="card">
        <div class="card-h">
            <Icon name="chat" /> Messages
        </div>

        <div class="msgs" ref="listEl">
            <div v-for="(message, i) in messages" :key="i" class="msg" :class="{ win: message.isAnswer }">
                {{ message.sender }}: {{ message.content }}
            </div>
        </div>

        <div class="send">
            <input v-model="inputMessage" placeholder="guess your word here" v-on:keyup.enter="sendMessage" />
            <button @click="sendMessage">Send</button>
        </div>
    </section>
</template>

<style scoped>
.msgs {
    flex: 1;
    min-height: 0;
    overflow: auto;
    padding: 4px 14px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
}

.msg {
    background: var(--soft);
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 16px;
    white-space: pre-wrap;
    word-break: break-word;
    max-width: 100%;
}

.msg.win {
    background: #d3f7e8;
    color: #0b6b4b;
}

.send {
    display: flex;
    align-items: center;
    margin: 12px 14px 14px;
    background: #fff;
    border: 3px solid var(--line);
    border-radius: 999px;
    padding: 3px;
}

.send:focus-within {
    border-color: var(--purple);
}

.send input {
    flex: 1;
    min-width: 0;
    border: 0;
    outline: 0;
    background: none;
    font: inherit;
    font-size: 16px;
    padding: 8px 4px 8px 14px;
    color: var(--ink);
}

.send button {
    background: linear-gradient(#a898f5, #8f7cf0);
    color: #fff;
    font-family: var(--display);
    font-weight: 800;
    font-size: 18px;
    padding: 6px 18px;
    border-radius: 999px;
}
</style>