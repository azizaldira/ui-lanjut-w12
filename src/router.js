import { createRouter, createWebHistory } from 'vue-router'

import Todo from '@/views/Todo.vue'
import Completed from '@/views/Completed.vue'
import Stats from '@/views/Stats.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Todo },
    { path: '/completed', component: Completed },
    { path: '/stats', component: Stats }
  ]
})

export default router
