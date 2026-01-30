# Website Pekon Balak - React Version

Website resmi Pekon Balak yang dibangun dengan React + Vite dan Tailwind CSS.

## Fitur

- **Halaman Home**: Hero section, Jelajahi Desa, Sambutan Kepala Desa, SOTK
- **Profil Desa**: Visi & Misi, Struktur Organisasi, Sejarah, Peta Lokasi
- **Infografis**: Data demografi penduduk dengan visualisasi chart interaktif
- **Berita**: Daftar berita desa dengan pagination
- **Detail Berita**: Halaman detail artikel berita

## Teknologi yang Digunakan

- **React 18** - Library JavaScript untuk membangun UI
- **Vite** - Build tool yang cepat
- **React Router** - Routing untuk Single Page Application
- **Tailwind CSS** - Framework CSS utility-first
- **Chart.js** - Library untuk membuat grafik dan chart
- **Axios** - HTTP client untuk API calls

## Instalasi

1. Clone repository ini
2. Install dependencies:
   ```bash
   npm install
   ```

3. Jalankan development server:
   ```bash
   npm run dev
   ```

4. Buka browser dan akses `http://localhost:5173`

## Build untuk Production

```bash
npm run build
```

File hasil build akan ada di folder `dist/`

## Struktur Folder

```
src/
├── components/       # Komponen reusable (Navbar, Footer)
├── pages/           # Halaman-halaman utama
│   ├── HomePage.jsx
│   ├── BeritaPage.jsx
│   ├── DetailBeritaPage.jsx
│   ├── ProfilDesaPage.jsx
│   └── InfografisPage.jsx
├── services/        # API services (untuk future development)
├── App.jsx          # Root component dengan routing
├── main.jsx         # Entry point
└── index.css        # Global styles

public/
└── images/          # Asset gambar
```

## Catatan

- Data berita dan infografis saat ini menggunakan mock data
- Untuk integrasi dengan backend API Laravel, uncomment dan sesuaikan service calls di folder `services/`
- Pastikan semua gambar sudah tersedia di folder `public/images/`

## Konversi dari Laravel

Website ini adalah konversi dari website Laravel Blade menjadi React SPA dengan desain dan tampilan yang sama persis. Semua styling menggunakan Tailwind CSS yang konsisten dengan versi Laravel.

## License

MIT
