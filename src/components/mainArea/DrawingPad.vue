<script setup lang="ts">
import Icon from '@/components/Icon.vue'
import { onBeforeUnmount, onMounted, ref } from 'vue';

/**
 * used to draw things.
 */

const colors = ['#2d2a5e', '#ff5b5b', '#ffcd57', '#3cc98f', '#4a90ff', '#a47bf0']
const sizes = [5, 10, 18]

const canvasEl = ref<HTMLCanvasElement | null>(null)
const boardEl = ref<HTMLElement | null>(null)
const tool = ref<'pen' | 'eraser'>('pen')
const color = ref(colors[0])
const sizeIndex = ref(0)

let ctx: CanvasRenderingContext2D | null = null
let drawing = false
let observer: ResizeObserver | null = null

// Size the canvas to fit its container (supports retina screens) and keep the existing strokes when resizing
function fitCanvas() {
    const c = canvasEl.value
    const board = boardEl.value
    if (!c || !board) return
    const dpr = window.devicePixelRatio || 1
    const w = board.clientWidth
    const h = board.clientHeight
    if (w === 0 || h === 0) return

    let snapshot: HTMLCanvasElement | null = null
    if (c.width > 0 && c.height > 0) {
        snapshot = document.createElement('canvas')
        snapshot.width = c.width
        snapshot.height = c.height
        snapshot.getContext('2d')!.drawImage(c, 0, 0)
    }

    c.width = Math.round(w * dpr)
    c.height = Math.round(h * dpr)
    ctx = c.getContext('2d')
    if (!ctx) return
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    if (snapshot) ctx.drawImage(snapshot, 0, 0, snapshot.width / dpr, snapshot.height / dpr)
}

function pos(e: PointerEvent): [number, number] {
    const r = canvasEl.value!.getBoundingClientRect()
    return [e.clientX - r.left, e.clientY - r.top]
}

function onDown(e: PointerEvent) {
    if (!ctx) return
    drawing = true
    canvasEl.value!.setPointerCapture(e.pointerId)
    const [x, y] = pos(e)
    ctx.beginPath()
    ctx.moveTo(x, y)
    // A single point (tap and release) should still show up as a dot
    applyStyle()
    ctx.lineTo(x + 0.01, y)
    ctx.stroke()
}

function onMove(e: PointerEvent) {
    if (!drawing || !ctx) return
    const [x, y] = pos(e)
    applyStyle()
    ctx.lineTo(x, y)
    ctx.stroke()
}

function onUp() {
    drawing = false
}

function applyStyle() {
    if (!ctx) return
    ctx.globalCompositeOperation = tool.value === 'eraser' ? 'destination-out' : 'source-over'
    ctx.strokeStyle = color.value
    ctx.lineWidth = tool.value === 'eraser' ? sizes[sizeIndex.value] * 4 : sizes[sizeIndex.value]
}

function pickColor(c: string) {
    color.value = c
    tool.value = 'pen'
}

function nextSize() {
    sizeIndex.value = (sizeIndex.value + 1) % sizes.length
}

function clearPad() {
    const c = canvasEl.value
    if (!c || !ctx) return
    ctx.save()
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, c.width, c.height)
    ctx.restore()
}

onMounted(() => {
    fitCanvas()
    observer = new ResizeObserver(() => fitCanvas())
    if (boardEl.value) observer.observe(boardEl.value)
})

onBeforeUnmount(() => observer?.disconnect())

// TODO: send the strokes to the other players
</script>

<template>
    <div class="pad">
        <div class="board" ref="boardEl">
            <canvas ref="canvasEl" @pointerdown="onDown" @pointermove="onMove" @pointerup="onUp"
                @pointercancel="onUp"></canvas>
        </div>

        <div class="toolwrap">
            <div class="tools">
                <button class="tool" :class="{ on: tool === 'pen' }" @click="tool = 'pen'" title="Pen">
                    <Icon name="pen" />
                </button>
                <button class="tool" :class="{ on: tool === 'eraser' }" @click="tool = 'eraser'" title="Eraser">
                    <Icon name="eraser" />
                </button>
                <button class="tool" @click="nextSize" :title="'Brush size: ' + sizes[sizeIndex]">
                    <span class="dot" :style="{ width: 6 + sizeIndex * 4 + 'px', height: 6 + sizeIndex * 4 + 'px' }"></span>
                </button>

                <span class="sep"></span>

                <button v-for="c in colors" :key="c" class="sw" :class="{ on: color === c && tool === 'pen' }"
                    :style="{ background: c }" @click="pickColor(c)" :aria-label="'Color ' + c"></button>

                <span class="sep"></span>

                <button class="tool" @click="clearPad" title="Clear">
                    <Icon name="trash" />
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pad {
    display: flex;
    flex-direction: column;
    min-height: 0;
}

canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
    touch-action: none;
    cursor: crosshair;
}

.toolwrap {
    display: flex;
    justify-content: center;
    padding-top: 12px;
}

.tools {
    display: flex;
    align-items: center;
    gap: 6px;
    background: #fff;
    border-radius: 999px;
    padding: 8px 12px;
    flex-wrap: wrap;
    justify-content: center;
    box-shadow: 0 6px 20px rgba(110, 100, 200, 0.15);
}

.tool {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: grid;
    place-items: center;
}

.tool :deep(svg) {
    stroke: var(--ink);
}

.tool.on {
    background: #cfe3ff;
}

.tool.on :deep(svg) {
    stroke: #2a6bd8;
}

.dot {
    background: var(--ink);
    border-radius: 50%;
    display: block;
}

.sw {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 3px solid #fff;
    box-shadow: 0 0 0 1px rgba(45, 42, 94, 0.12);
}

.sw.on {
    width: 37px;
    height: 37px;
}

.sep {
    width: 2px;
    height: 28px;
    background: var(--line);
    margin: 0 6px;
}
</style>