# Cryptonomics — Website

Landing page statis (HTML/CSS/JavaScript tanpa build step).

## Struktur
- `index.html` — seluruh konten halaman
- `styles.css` — tema warna navy, emas, dan teal
- `script.js` — tahun otomatis dan menu mobile
- `assets/logo*.jpg` — logo (asli, 640 px untuk hero, 128 px untuk header)
- `assets/og-image.jpg` — gambar pratinjau tautan (1200×630); `assets/favicon*`, `assets/apple-touch-icon.png` — ikon
- `assets/reports/` — PDF (Bedah Koin, Daily Update, laporan riset); `assets/covers/` — sampul untuk daftar di bagian Riset

## Placeholder yang perlu diisi
Kontak (Telegram, TikTok, Instagram) sudah terisi. Belum ada email kontak.

Cari `PLACEHOLDER` di `index.html`:
- Visi/misi atau pendekatan riset (opsional)

## Menjalankan lokal
Buka `index.html` langsung di browser, atau:

```bash
python3 -m http.server 8000
```

## Deploy
Bisa di-deploy ke Cloudflare Pages tanpa build command dengan output directory `/` (root).
