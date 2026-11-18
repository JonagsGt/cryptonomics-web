const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(pointer: fine)').matches;

// Tahun di footer
$('#year').textContent = new Date().getFullYear();

// Header mengecil saat digulir
const header = $('#header');
const onScroll = () => header.classList.toggle('scrolled', scrollY > 40);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Animasi muncul saat digulir
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
}, { threshold: .15 });
$$('.reveal').forEach(el => io.observe(el));

// Menandai link navigasi sesuai bagian yang aktif
const links = $$('[data-link]');
const secIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    links.forEach(l => {
      const on = l.getAttribute('href') === '#' + e.target.id;
      l.classList.toggle('active', on);
      if (on) l.setAttribute('aria-current', 'true'); else l.removeAttribute('aria-current');
    });
  });
}, { rootMargin: '-45% 0px -50% 0px' });
$$('main section[id]').forEach(s => secIO.observe(s));

// Menu mobile
const toggle = $('.nav-toggle'), nav = $('#nav');
const setMenu = open => { nav.classList.toggle('open', open); toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu'); };
toggle.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
links.forEach(l => l.addEventListener('click', () => setMenu(false)));
addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

// Tab produk dengan indikator yang bergeser (mendukung panah keyboard)
const tabs = $$('.tab'), indicator = $('.tab-indicator');
function moveIndicator(tab) {
  indicator.style.width = tab.offsetWidth + 'px';
  indicator.style.transform = `translateX(${tab.offsetLeft}px)`;
}
function selectTab(tab, focus = false) {
  tabs.forEach(t => {
    const on = t === tab;
    t.classList.toggle('is-active', on);
    t.setAttribute('aria-selected', String(on));
    t.tabIndex = on ? 0 : -1;
    const panel = document.getElementById(t.getAttribute('aria-controls'));
    panel.hidden = !on;
    panel.classList.remove('is-active');
    if (on) { void panel.offsetWidth; panel.classList.add('is-active'); }
  });
  moveIndicator(tab);
  if (focus) tab.focus();
}
tabs.forEach((t, i) => {
  t.addEventListener('click', () => selectTab(t));
  t.addEventListener('keydown', e => {
    if (!['ArrowRight', 'ArrowLeft'].includes(e.key)) return;
    e.preventDefault();
    const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
    selectTab(next, true);
  });
});
moveIndicator(tabs.find(t => t.classList.contains('is-active')));
addEventListener('resize', () => moveIndicator(tabs.find(t => t.classList.contains('is-active'))));
document.fonts?.ready.then(() => moveIndicator(tabs.find(t => t.classList.contains('is-active'))));

// Efek kursor: emblem miring, kilau bergerak, orb ikut bergeser, sorotan kartu
if (finePointer && !reduceMotion) {
  const emblem = $('#emblem');
  const gloss = emblem.querySelector('.emblem-gloss');
  const orbs = $$('.orb');
  const hero = $('.hero');

  const stage = emblem.parentElement; // pembungkus yang tidak ikut berputar
  const clamp = v => Math.max(-1, Math.min(1, v));
  hero.addEventListener('pointermove', e => {
    const r = stage.getBoundingClientRect();
    const half = emblem.offsetWidth / 2;
    const cx = r.left + r.width / 2;
    const cy = r.top + emblem.offsetTop - stage.offsetTop + emblem.offsetHeight / 2;
    const dx = clamp((e.clientX - cx) / half), dy = clamp((e.clientY - cy) / half);
    emblem.style.setProperty('--ry', (dx * 14).toFixed(2) + 'deg');
    emblem.style.setProperty('--rx', (-dy * 14).toFixed(2) + 'deg');
    gloss.style.setProperty('--gx', (50 + dx * 40).toFixed(1) + '%');
  });
  hero.addEventListener('pointerleave', () => {
    emblem.style.setProperty('--rx', '0deg');
    emblem.style.setProperty('--ry', '0deg');
  });

  addEventListener('pointermove', e => {
    const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
    orbs.forEach((o, i) => {
      const k = (i + 1) * 40;
      o.style.setProperty('--px', (x * k).toFixed(1) + 'px');
      o.style.setProperty('--py', (y * k).toFixed(1) + 'px');
    });
  }, { passive: true });

  $$('[data-spot]').forEach(card => card.addEventListener('pointermove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    card.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }));

  // Tombol magnetis
  $$('[data-magnetic]').forEach(btn => {
    btn.addEventListener('pointermove', e => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * .25, y = (e.clientY - r.top - r.height / 2) * .35;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener('pointerleave', () => btn.style.transform = '');
  });
}

// Kilau emblem saat halaman dibuka (tanpa kursor)
if (!reduceMotion) {
  const g = $('#emblem .emblem-gloss');
  let t = 0;
  const sweep = () => { t += .006; g.style.setProperty('--gx', (120 - (t % 1) * 240) + '%'); if (t < 1.2) requestAnimationFrame(sweep); };
  setTimeout(() => requestAnimationFrame(sweep), 600);
}

// FAQ: hanya satu pertanyaan terbuka
const faqItems = $$('.faq-item');
faqItems.forEach(item => item.addEventListener('toggle', () => {
  if (item.open) faqItems.forEach(o => { if (o !== item) o.open = false; });
}));

// Perpustakaan riset: filter jenis materi
const filterBtns = $$('.chip-btn');
const libItems = $$('.lib-item');
filterBtns.forEach(btn => btn.addEventListener('click', () => {
  const f = btn.dataset.filter;
  filterBtns.forEach(b => {
    const on = b === btn;
    b.classList.toggle('is-active', on);
    b.setAttribute('aria-pressed', String(on));
  });
  libItems.forEach(it => {
    const show = f === 'all' || it.dataset.type === f;
    it.hidden = !show;
    it.classList.remove('is-entering');
    if (show) { void it.offsetWidth; it.classList.add('is-entering'); }
  });
}));
