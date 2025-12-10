# Vue To-Do List App

Aplikasi To-Do List berbasis **Vue.js (Vite)** yang telah dikembangkan dengan fitur CRUD, routing, state management, serta penambahan fitur baru berupa **halaman Statistik (Stats Page)**.

Fitur ini dibuat untuk memenuhi tugas implementasi konsep **Routing + State Management** dalam project Vue.

---

## 🎥 Video Presentasi (Loom)
Berikut adalah video penjelasan implementasi fitur baru:

👉 **Loom Video:** https://www.loom.com/share/be2075cb84fb4a4681ec5c9261e5cee6
---

## ✨ Fitur-Fitur Utama

### 1. CRUD To-Do  
- Tambah tugas  
- Edit tugas  
- Tandai selesai / belum selesai  
- Hapus tugas  

### 2. Routing  
- `/` → Halaman To-Do  
- `/completed` → Halaman tugas selesai  
- `/stats` → **Fitur Baru: Halaman Statistik**  

### 3. State Management  
Menggunakan store sederhana (`todoStore.js`) berbasis `ref`, `computed`, dan `watch` untuk:  
- menyimpan daftar tugas  
- memisahkan tugas aktif & selesai  
- mencatat waktu pembuatan tugas  
- sinkronisasi antar halaman

### 4. Fitur Baru: **Stats Page 📊**
Fitur ini menampilkan:

- Total tugas  
- Tugas aktif  
- Tugas selesai  
- Persentase progres  
- Daftar 5 tugas terbaru  
- Progress bar  

Halaman ini memanfaatkan **routing (route `/stats`)** dan **state management (`todoStore.js`)**, sesuai dengan ketentuan tugas.

