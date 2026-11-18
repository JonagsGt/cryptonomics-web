# Cryptonomics — Website

Landing page statis (HTML/CSS/JavaScript tanpa build step).

## Struktur
- `index.html` — seluruh konten halaman
- `styles.css` — tema warna navy, emas, dan teal
- `script.js` — tahun otomatis dan menu mobile
- `assets/logo.jpg` — logo
- `assets/reports/` — PDF laporan riset; `assets/report-cover.jpg` — sampul untuk kartu laporan

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
