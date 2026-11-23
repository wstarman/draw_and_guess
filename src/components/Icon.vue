<script setup lang="ts">
defineProps<{ name: keyof typeof paths }>()

const paths = {
  user: '<circle cx="12" cy="8" r="3.5"/><path d="M4.5 20c.8-4 4-6 7.5-6s6.7 2 7.5 6"/>',
  hash: '<path d="M5 9h14M5 15h14M10 4 8 20M16 4l-2 16"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  exit: '<path d="M10 4H5v16h5M15 8l4 4-4 4M19 12H9"/>',
  room: '<path d="M3 11 12 4l9 7v9H3z"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/>',
  players: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 19c.5-3.5 3-5 6-5s5.5 1.5 6 5M16 14c3 0 4.8 1.5 5 4"/>',
  chat: '<path d="M4 5h16v11H9l-5 4z"/>',
  pen: '<path d="m4 20 1-5L16 4l4 4L9 19z"/>',
  eraser: '<path d="m8 20-5-5L15 3l6 6-9 11z"/>',
  dot: '<circle cx="12" cy="12" r="5" fill="currentColor"/>',
  trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
  bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3 11.2V16h6v-1.8A6 6 0 0 0 12 3z"/>'
}
</script>

<template>
  <svg class="i" viewBox="0 0 24 24" v-html="paths[name]" />
</template>

<style scoped>
.i {
  width: 1.4em;
  height: 1.4em;
  fill: none;
  stroke: var(--purple);
  stroke-width: 2.4;
  stroke-linecap: round;
  stroke-linejoin: round;
  flex: none;
}
</style>