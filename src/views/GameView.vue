<script setup lang="ts">
import { computed } from 'vue'
import DrawingPad from '@/components/mainArea/DrawingPad.vue';
import MessageArea from '@/components/MessageArea.vue';
import PlayerList from '@/components/PlayerList.vue';
import StatusBar from '@/components/StatusBar.vue';
import WaitingRoom from '@/components/mainArea/WaitingRoom.vue';
import Icon from '@/components/Icon.vue';
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

const stateName = computed(() => GameState[Game.gameState.value])

const drawerName = computed(
    () => Game.players.value.find(p => p.isDrawer)?.nickname ?? 'Someone'
)

// หัวข้อ + คำใบ้ ที่แถบบนของ main area (ตามดีไซน์แต่ละสถานะ)
const topbar = computed(() => {
    switch (Game.gameState.value) {
        case GameState.waitingRoom:
            return { title: 'Waiting room', hint: '' }
        case GameState.selecting:
            return { title: 'Your turn — pick a word', hint: 'Pick a word' }
        case GameState.drawing:
            return { title: 'You are drawing…', hint: Game.answer.value }
        case GameState.guessing:
            return { title: `${drawerName.value} is drawing…`, hint: Game.hintWord.value }
        case GameState.guessed:
            return { title: 'You guessed it!', hint: Game.answer.value }
        case GameState.waitingOtherSelecting:
            return { title: `${drawerName.value} is picking a word…`, hint: '? ? ? ? ? ?' }
        case GameState.revealing:
            return { title: 'The word was…', hint: Game.answer.value }
        case GameState.awarding:
            return { title: 'Round results', hint: '' }
        default:
            return { title: '', hint: '' }
    }
})
</script>

<template>
    <div class="room">
        <div class="header">
            <h1 class="logo"><span class="draw">Draw</span> and <span class="guess">Guess</span></h1>
            <StatusBar />
            <button @click="backToHome" class="back pill">
                <Icon name="exit" /> Back to home
            </button>
        </div>

        <div class="grid">
            <PlayerList class="pl" />

            <section class="card canvas">
                <div class="topbar">
                    <h2>{{ topbar.title }}</h2>
                    <span class="chip">{{ stateName }}</span>
                    <span v-if="topbar.hint" class="hintpill">
                        <Icon name="bulb" /> {{ topbar.hint }}
                    </span>
                </div>

                <div class="stage">
                    <WaitingRoom v-if="Game.gameState.value === GameState.waitingRoom" />
                    <SelectingWord v-if="Game.gameState.value === GameState.selecting" />
                    <DrawingPad v-if="Game.gameState.value === GameState.drawing" />
                    <ShowingPad v-if="[GameState.guessing, GameState.guessed].includes(Game.gameState.value)" />
                    <WaitingOtherSelecting v-if="Game.gameState.value === GameState.waitingOtherSelecting" />
                    <Revealing v-if="Game.gameState.value === GameState.revealing" />
                    <Awarding v-if="Game.gameState.value === GameState.awarding" />
                </div>
            </section>

            <MessageArea class="ml" />
        </div>

        <div class="test-row">
            [Test] change state to:
            <button class="chip" @click="changeState(GameState.waitingOtherSelecting)"> waitingOtherSelecting </button>
            <button class="chip" @click="changeState(GameState.guessing)"> guessing </button>
            <button class="chip" @click="changeState(GameState.guessed)"> guessed </button>
            <button class="chip" @click="changeState(GameState.selecting)"> selecting </button>
            <button class="chip" @click="changeState(GameState.drawing)"> drawing </button>
            <button class="chip" @click="changeState(GameState.revealing)"> revealing </button>
            <button class="chip" @click="changeState(GameState.awarding)"> awarding </button>
        </div>
    </div>
</template>

<style scoped>
.room {
    position: relative;
    z-index: 1;
    max-width: 1400px;
    margin: 0 auto;
    padding: 14px 18px 20px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    min-height: 100vh;
}

.header {
    display: flex;
    align-items: center;
    gap: 14px;
    flex-wrap: wrap;
}

.header .logo {
    font-size: 35px;
    -webkit-text-stroke-width: 2.5px;
    text-shadow: none;
    text-align: left;
}

.back {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--card);
    padding: 10px 18px;
    font-weight: 800;
    font-size: 16px;
}

.grid {
    display: grid;
    grid-template-columns: 270px minmax(0, 1fr) 300px;
    grid-template-rows: minmax(0, 1fr);
    gap: 16px;
    flex: 1;
    min-height: 640px;
}

.canvas {
    padding: 0 18px 18px;
}

.topbar {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 2px 12px;
    flex-wrap: wrap;
}

.topbar h2 {
    margin: 0;
    font-family: var(--display);
    font-weight: 800;
    font-size: 22px;
    flex: 1;
    min-width: 140px;
}

.stage {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
}

.stage> :deep(*) {
    flex: 1;
    min-height: 0;
}

.test-row {
    font-size: 14px;
    color: var(--mute);
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    align-items: center;
}

@media (max-width: 1100px) {
    .grid {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto auto;
        grid-template-areas: "main main" "players msgs";
    }

    .canvas {
        grid-area: main;
        min-height: 560px;
    }

    .pl {
        grid-area: players;
        min-height: 340px;
    }

    .ml {
        grid-area: msgs;
        min-height: 340px;
    }

    .pl :deep(.plist),
    .ml :deep(.msgs) {
        max-height: 360px;
    }
}

@media (max-width: 640px) {
    .header {
        justify-content: space-between;
    }

    .header :deep(.status) {
        order: 3;
        flex-basis: 100%;
    }

    .grid {
        grid-template-columns: 1fr;
        grid-template-rows: auto auto auto;
        grid-template-areas: "main" "players" "msgs";
    }

    .canvas {
        min-height: 520px;
        padding: 0 12px 12px;
    }
}
</style>