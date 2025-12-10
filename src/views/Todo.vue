<template>
  <section class="page">
    <header class="page-header">
      <div>
        <h3>To-Do ⏳</h3>
        <p class="page-subtitle">
          ✍️ Tugas aktif: <strong>{{ activeCount }}</strong>
          • ✅ Selesai: <strong>{{ completedCount }}</strong>
        </p>
      </div>

      <div class="page-actions" v-if="activeCount">
        <button type="button" @click="markAllDone">
          ✅ Tandai semua selesai
        </button>
      </div>
    </header>

    <section class="card">
      <!-- CREATE -->
      <form class="todo-form" @submit.prevent="handleAdd">
        <input
          v-model="newTodo"
          type="text"
          placeholder="Tambah tugas baru..."
          class="todo-input"
        />
        <button type="submit">
          ➕ Tambah
        </button>
      </form>

      <!-- SEARCH/FILTER -->
      <div class="todo-search">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="🔍 Cari tugas..."
        />
      </div>

      <!-- LIST -->
      <ul v-if="filteredActiveTodos.length" class="todo-list">
        <li v-for="todo in filteredActiveTodos" :key="todo.id" class="todo-item">
          <div class="todo-item-main">
            <input
              type="checkbox"
              :checked="todo.done"
              @change="toggleTodo(todo.id)"
            />

            <span v-if="editingId !== todo.id" class="todo-text">
              {{ todo.text }}
            </span>

            <input
              v-else
              v-model="editText"
              type="text"
              class="todo-edit-input"
              @keyup.enter="saveEdit(todo.id)"
            />
          </div>

          <div class="todo-item-actions">
            <template v-if="editingId !== todo.id">
              <button type="button" @click="startEdit(todo)">
                ✏️ Edit
              </button>
            </template>
            <template v-else>
              <button type="button" @click="saveEdit(todo.id)">
                💾 Simpan
              </button>
              <button type="button" @click="cancelEdit">
                ↩️ Batal
              </button>
            </template>

            <button type="button" @click="removeTodo(todo.id)">
              🗑️ Hapus
            </button>
          </div>
        </li>
      </ul>

      <p v-else class="todo-empty">
        Belum ada tugas yang cocok. Tambahkan tugas baru atau ubah kata kunci pencarian.
      </p>
    </section>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  activeTodos,
  completedTodos,
  addTodo,
  toggleTodo,
  updateTodoText,
  removeTodo,
  markAllDone
} from '../todoStore'

const newTodo = ref('')
const searchQuery = ref('')

const editingId = ref(null)
const editText = ref('')

const activeCount = computed(() => activeTodos.value.length)
const completedCount = computed(() => completedTodos.value.length)

const filteredActiveTodos = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return activeTodos.value
  return activeTodos.value.filter(t =>
    t.text.toLowerCase().includes(q)
  )
})

function handleAdd() {
  if (!newTodo.value.trim()) return
  addTodo(newTodo.value)
  newTodo.value = ''
}

function startEdit(todo) {
  editingId.value = todo.id
  editText.value = todo.text
}

function saveEdit(id) {
  if (!editText.value.trim()) return
  updateTodoText(id, editText.value)
  editingId.value = null
  editText.value = ''
}

function cancelEdit() {
  editingId.value = null
  editText.value = ''
}
</script>
