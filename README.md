# Cryptonomics — Website

Landing page statis (HTML/CSS/JavaScript tanpa build step).

## Struktur
- `index.html` — seluruh konten halaman
- `styles.css` — tema warna navy, emas, dan teal
- `script.js` — tahun otomatis dan menu mobile
- `assets/logo.jpg` — logo

## Placeholder yang perlu diisi
Cari `PLACEHOLDER` di `index.html`:
- Link Telegram resmi
- Link TikTok resmi
- Link Instagram resmi
(Belum ada email kontak; tambahkan kembali jika sudah tersedia.)
- Tautan PDF sampel laporan
- Visi/misi atau pendekatan riset (opsional)

## Menjalankan lokal
Buka `index.html` langsung di browser, atau:

```bash
python3 -m http.server 8000
```

## Deploy
Bisa di-deploy ke Cloudflare Pages tanpa build command dengan output directory `/` (root).
