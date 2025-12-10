<template>
  <section class="page">
    <header class="page-header">
      <div>
        <h3>Statistik 📊</h3>
        <p class="page-subtitle">
          Ringkasan progres to-do list Anda.
        </p>
      </div>
    </header>

    <section class="card">
      <!-- Ringkasan Angka -->
      <div class="stats-grid">
        <div class="stats-item">
          <div class="stats-label">Total Tugas</div>
          <div class="stats-value">
            📝 {{ totalTodos }}
          </div>
        </div>

        <div class="stats-item">
          <div class="stats-label">Belum Selesai</div>
          <div class="stats-value">
            ⏳ {{ activeCount }}
          </div>
        </div>

        <div class="stats-item">
          <div class="stats-label">Selesai</div>
          <div class="stats-value">
            ✅ {{ completedCount }}
          </div>
        </div>

        <div class="stats-item">
          <div class="stats-label">Progres</div>
          <div class="stats-value">
            📈 {{ completionRate }}%
          </div>
        </div>
      </div>

      <!-- Progress bar sederhana -->
      <div class="stats-progress-wrapper" v-if="totalTodos > 0">
        <div class="stats-progress-bar">
          <div
            class="stats-progress-bar-fill"
            :style="{ width: completionRate + '%' }"
          ></div>
        </div>
        <p class="stats-progress-text">
          {{ completedCount }} dari {{ totalTodos }} tugas telah selesai.
        </p>
      </div>

      <div v-else class="todo-empty">
        Belum ada tugas yang tercatat. Tambahkan tugas di halaman To-Do ⏳ terlebih dahulu.
      </div>
    </section>

    <!-- Daftar Tugas Terbaru -->
    <section class="card" v-if="recentTodos.length">
      <h4>Tugas Terbaru 🕒</h4>
      <ul class="todo-list">
        <li v-for="todo in recentTodos" :key="todo.id" class="todo-item">
          <div class="todo-item-main">
            <span class="todo-text" :class="{ 'todo-text-completed': todo.done }">
              {{ todo.text }}
            </span>
          </div>
          <div class="todo-item-actions">
            <span v-if="todo.done">✅ Selesai</span>
            <span v-else>⏳ Aktif</span>
          </div>
        </li>
      </ul>
    </section>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { activeTodos, completedTodos } from '../todoStore'

// Gabungkan semua todo dari store
const allTodos = computed(() => [
  ...activeTodos.value,
  ...completedTodos.value
])

const totalTodos = computed(() => allTodos.value.length)
const activeCount = computed(() => activeTodos.value.length)
const completedCount = computed(() => completedTodos.value.length)

const completionRate = computed(() => {
  if (totalTodos.value === 0) return 0
  return Math.round((completedCount.value / totalTodos.value) * 100)
})

// Ambil 5 tugas terbaru berdasarkan createdAt (jika ada)
const recentTodos = computed(() => {
  return [...allTodos.value]
    .sort((a, b) => {
      const t1 = a.createdAt ? new Date(a.createdAt).getTime() : 0
      const t2 = b.createdAt ? new Date(b.createdAt).getTime() : 0
      return t2 - t1
    })
    .slice(0, 5)
})
</script>
