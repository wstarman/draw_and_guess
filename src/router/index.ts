import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import RoomView from '@/views/RoomView.vue'

const routes = [
    {
        path: '/',
        component: HomeView
    },
    {
        path: '/room',
        component: RoomView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router