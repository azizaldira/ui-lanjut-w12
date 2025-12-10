// src/todoStore.js
import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'todo-list-v1'

function loadInitialTodos() {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    console.error('Failed to load todos from localStorage', e)
    return []
  }
}

const todos = ref(loadInitialTodos())

export const activeTodos = computed(() =>
  todos.value.filter(t => !t.done)
)

export const completedTodos = computed(() =>
  todos.value.filter(t => t.done)
)

export function addTodo(text) {
  const trimmed = text.trim()
  if (!trimmed) return

  todos.value.push({
    id: Date.now(),
    text: trimmed,
    done: false,
    createdAt: new Date().toISOString()
  })
}

export function toggleTodo(id) {
  const todo = todos.value.find(t => t.id === id)
  if (todo) {
    todo.done = !todo.done
  }
}

export function updateTodoText(id, newText) {
  const trimmed = newText.trim()
  if (!trimmed) return
  const todo = todos.value.find(t => t.id === id)
  if (todo) {
    todo.text = trimmed
  }
}

export function removeTodo(id) {
  todos.value = todos.value.filter(t => t.id !== id)
}

export function clearCompleted() {
  todos.value = todos.value.filter(t => !t.done)
}

export function markAllDone() {
  todos.value.forEach(t => {
    if (!t.done) t.done = true
  })
}

// Simpan otomatis ke localStorage
watch(
  todos,
  newValue => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newValue))
    } catch (e) {
      console.error('Failed to save todos to localStorage', e)
    }
  },
  { deep: true }
)
