<template>
  <section class="page">
    <header class="page-header">
      <div>
        <h3>Completed ✅</h3>
        <p class="page-subtitle">
          ✅ Tugas selesai: <strong>{{ completedCount }}</strong>
          • ⏳ Masih aktif: <strong>{{ activeCount }}</strong>
        </p>
      </div>

      <div class="page-actions" v-if="completedCount">
        <button type="button" @click="clearCompleted">
          🧹 Hapus semua yang selesai
        </button>
      </div>
    </header>

    <section class="card">
      <!-- SEARCH/FILTER -->
      <div class="todo-search">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="🔍 Cari tugas selesai..."
        />
      </div>

      <!-- LIST -->
      <ul v-if="filteredCompletedTodos.length" class="todo-list">
        <li
          v-for="todo in filteredCompletedTodos"
          :key="todo.id"
          class="todo-item"
        >
          <div class="todo-item-main">
            <input
              type="checkbox"
              :checked="todo.done"
              @change="toggleTodo(todo.id)"
            />

            <span
              v-if="editingId !== todo.id"
              class="todo-text todo-text-completed"
            >
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
        Belum ada tugas yang selesai atau tidak ada yang cocok dengan pencarian.
      </p>
    </section>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  activeTodos,
  completedTodos,
  toggleTodo,
  updateTodoText,
  removeTodo,
  clearCompleted
} from '../todoStore'

const searchQuery = ref('')
const editingId = ref(null)
const editText = ref('')

const activeCount = computed(() => activeTodos.value.length)
const completedCount = computed(() => completedTodos.value.length)

const filteredCompletedTodos = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return completedTodos.value
  return completedTodos.value.filter(t =>
    t.text.toLowerCase().includes(q)
  )
})

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
