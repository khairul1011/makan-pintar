# 🍽️ Makan Pintar

> **"Budget makan harian yang ngerti kondisi dompet."**

Makan Pintar adalah aplikasi asisten pengatur keuangan khusus untuk pengeluaran makan. Dirancang untuk anak kost, mahasiswa, atau siapa saja yang menerima uang saku bulanan/periodik (kiriman), aplikasi ini membantu mencegah "tragedi makan mie instan di akhir bulan" dengan pendekatan yang dinamis, interaktif, dan penuh empati.

---

## ✨ Fitur Utama

- **📊 Budget Harian Dinamis**
  Aplikasi menghitung ulang jatah makan harian yang aman secara *real-time* berdasarkan sisa saldo dan sisa hari menuju kiriman berikutnya.
- **🚥 Sistem Mode Kondisi**
  - 🟢 **Mode Santai**: Budget harian masih sangat aman (> Rp 50.000).
  - 🟡 **Mode Hitung-hitung**: Budget harian mulai menipis, aplikasi akan membantu pertimbangan jajan.
  - 🔴 **Mode Survival**: Budget harian sangat kritis (< Rp 20.000), saatnya bertahan hidup dengan hemat ekstrim.
- **🤔 Worth It Checker**
  Galau mau jajan? Masukkan nama dan harga makanan, aplikasi akan menghitung persentase dari budget harian dan memberikan saran apakah makanan tersebut "Worth It", "Agak Mepet", atau "Terlalu Mahal".
- **⚖️ Compare Makanan**
  Bandingkan dua pilihan makanan/tempat makan. Aplikasi akan memberitahu selisih harga dan memberikan insight *opportunity cost* (contoh: "Selisihnya bisa buat beli 3 gorengan").
- **🔴 Survival Planner & Resep AI**
  Ketika saldo sangat menipis, aplikasi menyediakan kumpulan resep hemat (seperti Indomie Telur, Nasi Tempe) lengkap dengan langkah memasak, estimasi harga, dan kalori untuk menghemat uang hingga kiriman berikutnya tiba.

## 🛠️ Teknologi yang Digunakan

Proyek ini bermula dari **Single File HTML** (`index.html`), dan kini telah dimigrasikan sepenuhnya ke dalam struktur aplikasi modern **Next.js** (berada di folder `makan-pintar/`).

- **Versi Asli**: Vanilla HTML, CSS, JavaScript (`index.html`)
- **Versi Modern (Next.js)**:
  - Framework: [Next.js](https://nextjs.org/) (App Router)
  - UI Library: React 19
  - State Management: React Context API + LocalStorage
  - Styling: Pure CSS dengan desain *Glassmorphism* modern.

## 🚀 Cara Menjalankan Versi Next.js secara Lokal

1. **Pastikan Node.js sudah terinstall** di sistem Anda.
2. Buka Terminal dan masuk ke direktori proyek Next.js:
   ```bash
   cd makan-pintar
   ```
3. Install semua *dependencies*:
   ```bash
   npm install
   ```
4. Jalankan *development server*:
   ```bash
   npm run dev
   ```
5. Buka [http://localhost:3000](http://localhost:3000) di browser Anda untuk melihat hasilnya.

## 📁 Struktur Repositori

```text
PROJECT PRIBADI/
├── index.html            # Versi Monolitik Asli (Legacy)
├── README.md             # Dokumentasi Proyek
└── makan-pintar/         # Versi Modern (Next.js)
    ├── app/              # Routing Next.js
    ├── components/       # Komponen UI modular
    └── lib/              # Logika bisnis dan state management
```

---
Dibuat dengan ❤️ untuk menyelamatkan perut di akhir bulan.
