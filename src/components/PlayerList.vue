<script setup lang="ts">
import Icon from '@/components/Icon.vue'
import { Game } from '@/models/Game';
import { GameState } from '@/models/types';
import { ref } from 'vue';

const players = ref(Game.players)

// Avatars by player order (no need to change the model)
const avatars = [
    { emoji: '🐰', bg: '#ffe3a8' },
    { emoji: '🐻', bg: '#e3c9a8' },
    { emoji: '🐱', bg: '#ffd0c0' },
    { emoji: '🐥', bg: '#fff1a0' },
    { emoji: '🐶', bg: '#d0e8ff' },
    { emoji: '🦊', bg: '#ffd9b0' },
    { emoji: '🐼', bg: '#e6e6f0' },
    { emoji: '🐸', bg: '#d9f2d0' },
]
const avatarOf = (i: number) => avatars[i % avatars.length]

function copyRoomId() {
    navigator.clipboard?.writeText(String(Game.roomId.value))
}
</script>

<template>
    <section class="card">
        <div class="card-h">
            <Icon name="players" /> Players
        </div>

        <div class="plist">
            <div v-for="(player, i) in players" :key="player.nickname" class="player" :class="{ me: player.isMe }">
                <div class="avatar" :style="{ background: avatarOf(i).bg }">{{ avatarOf(i).emoji }}</div>
                <div class="pname">
                    <b>{{ player.nickname }}{{ player.isMe ? ' (You)' : '' }}</b>
                    <small>{{ player.score }} pts</small>
                </div>
                <span class="tag" :class="{ on: player.isDrawer }">
                    {{ player.isDrawer ? 'Drawing…' : '—' }}
                </span>
            </div>
        </div>

        <button class="invite" @click="copyRoomId" v-if="Game.gameState.value == GameState.waitingRoom">
            <Icon name="plus" /> Invite Friends · {{ Game.roomId.value }}
        </button>
    </section>
</template>

<style scoped>
.plist {
    flex: 1;
    min-height: 0;
    overflow: auto;
    padding: 6px 12px 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.player {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 10px;
    border-radius: 18px;
}

.player.me {
    background: #fff0c9;
}

.avatar {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    border: 3px solid #fff;
    display: grid;
    place-items: center;
    font-size: 26px;
    flex: none;
}

.pname {
    flex: 1;
    min-width: 0;
}

.pname b {
    display: block;
    font-size: 17px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.pname small {
    color: var(--mute);
    font-size: 13px;
}

.me .pname small {
    color: #a56a1d;
}

.tag {
    background: var(--soft);
    color: var(--mute);
    font-size: 14px;
    padding: 5px 12px;
    border-radius: 999px;
    white-space: nowrap;
}

.tag.on {
    background: var(--yellow);
    color: #7a4a05;
}

.invite {
    margin: 0 12px 12px;
    background: var(--soft);
    border-radius: 18px;
    padding: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-weight: 800;
    font-size: 16px;
}

.invite :deep(svg) {
    stroke: var(--ink);
}
</style>