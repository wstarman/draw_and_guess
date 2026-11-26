<script setup lang="ts">
import { computed } from 'vue';
import { Game } from '@/models/Game';

// Sort by score, then arrange as 2nd | 1st | 3rd (1st place in the middle and tallest)
const podium = computed(() => {
    const top = [...Game.players.value].sort((a, b) => b.score - a.score).slice(0, 3)
    const view = (rank: number) => {
        const p = top[rank]
        if (!p) return null
        return {
            rank,
            name: (rank === 0 ? '👑 ' : '') + (p.isMe ? 'You' : p.nickname),
            score: p.score,
        }
    }
    return [view(1), view(0), view(2)].filter(Boolean) as { rank: number; name: string; score: number }[]
})
</script>

<template>
    <div class="board center">
        <h1>🏆 Round results</h1>
        <div class="podium">
            <div v-for="p in podium" :key="p.rank" class="step" :class="'rank' + p.rank">
                <span>{{ p.name }}</span>
                <b>{{ p.score }} pts</b>
            </div>
        </div>
    </div>
</template>

<style scoped>
.podium {
    display: flex;
    align-items: flex-end;
    gap: 12px;
}

.step {
    width: 104px;
    border-radius: 16px 16px 0 0;
    padding: 10px 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 16px;
}

.step b {
    font-family: var(--display);
    font-weight: 800;
    font-size: 18px;
}

.rank0 {
    background: #ffcd57;
    height: 150px;
}

.rank1 {
    background: #d9dcef;
    height: 110px;
}

.rank2 {
    background: #ffc9a8;
    height: 80px;
}
</style>