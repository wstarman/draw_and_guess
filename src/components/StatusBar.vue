<script setup lang="ts">
import Icon from '@/components/Icon.vue'
import { Game } from '@/models/Game'
</script>

<template>
    <div class="status">
        <div class="statusbar pill">
            <div class="stat">
                <Icon name="room" />
                <span class="label">Room</span>
                <span class="value">{{ Game.roomId.value }}</span>
            </div>
            <span class="divider"></span>
            <div class="stat">
                <Icon name="user" />
                <span class="label">Name</span>
                <span class="value">{{ Game.myNickname.value }}</span>
            </div>
            <span class="divider"></span>
            <div class="stat">
                <Icon name="clock" />
                <span class="label">Time</span>
                <span class="value">{{ Game.countDown }}s</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.status {
    flex: 1;
    display: flex;
    justify-content: center;
    min-width: 0;
}

.statusbar {
    display: flex;
    gap: 22px;
    align-items: center;
    background: var(--card);
    padding: 10px 28px;
    flex-wrap: wrap;
    justify-content: center;
}

.stat {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 17px;
}

.label {
    color: var(--mute);
}

.value {
    color: var(--ink);
}

.divider {
    width: 2px;
    height: 22px;
    background: var(--line);
    border-radius: 2px;
}

@media (max-width: 640px) {
    .statusbar {
        gap: 12px;
        padding: 10px 16px;
    }
}
</style>