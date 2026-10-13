/* =========================================================================
   Lógica principal: intro, fotos flotantes, galería 3D, playlist, carta
   ========================================================================= */

const C = window.CONFIG || {};
const NOMBRE = C.nombre || 'Morelia';
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const isSmall = innerWidth < 700;
const $ = (sel, root = document) => root.querySelector(sel);
const fill = (text) => String(text ?? '').replaceAll('{nombre}', NOMBRE);
const FOTOS = (C.fotos || []).filter((f) => f && f.src);

/* ---------- Nombre ---------- */
document.querySelectorAll('[data-nombre]').forEach((el) => { el.textContent = NOMBRE; });
document.querySelectorAll('[data-inicial]').forEach((el) => { el.textContent = NOMBRE.charAt(0).toUpperCase(); });
document.title = `Para ${NOMBRE} 💜`;

/* Foto con forma orgánica y bordes difuminados */
function blobPhoto(foto, { eager = false } = {}) {
  const wrap = document.createElement('div');
  wrap.className = 'blob-photo';
  const img = document.createElement('img');
  img.src = foto.src;
  img.alt = foto.texto || 'Jungkook';
  img.loading = eager ? 'eager' : 'lazy';
  img.decoding = 'async';
  img.draggable = false;
  wrap.append(img);
  return { wrap, img };
}

/* =========================================================================
   1. Intro
   ========================================================================= */
let entered = false;

function playChime() {
  // Crear y reanudar un AudioContext dentro del clic desbloquea el audio del navegador
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    ctx.resume();
    if (C.sonidoBienvenida === false) return;
    const now = ctx.currentTime;
    [659.25, 830.61, 987.77, 1318.51].forEach((freq, i) => {
      const t0 = now + i * 0.13;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, t0);
      gain.gain.linearRampToValueAtTime(0.07, t0 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.8);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t0);
      osc.stop(t0 + 1.9);
    });
  } catch { /* sin audio, no pasa nada */ }
}

$('#enter').addEventListener('click', () => {
  if (entered) return;
  entered = true;
  playChime();
  const intro = $('#intro');
  intro.classList.add('leaving');
  document.body.classList.add('entered');
  window.dispatchEvent(new CustomEvent('morelia:enter'));
  $('#main').inert = false;
  setTimeout(() => {
    intro.hidden = true;
    document.body.classList.remove('locked');
    $('.hero-name').focus({ preventScroll: true });
    startObservers();
  }, reducedMotion ? 50 : 1300);
});

/* =========================================================================
   Animaciones al hacer scroll + navegación activa
   ========================================================================= */
function startObservers() {
  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); revealIO.unobserve(e.target); }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('[data-reveal]').forEach((el) => revealIO.observe(el));

  const links = [...document.querySelectorAll('.topnav a')];
  const navIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${e.target.id}`));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  ['galeria', 'jungkook', 'playlist', 'carta'].forEach((id) => navIO.observe(document.getElementById(id)));
}

/* =========================================================================
   Fotos flotantes de la portada y foto de "Sobre Jungkook"
   ========================================================================= */
// Fotos reservadas para la portada y "Sobre Jungkook": no se repiten en la galería
const PORTADA = (C.portada || []).filter((i) => FOTOS[i]).slice(0, 6);
const SOBRE_JK = FOTOS[C.fotoSobreJungkook] ? C.fotoSobreJungkook : -1;
const RESERVADAS = new Set([...PORTADA, SOBRE_JK]);

(() => {
  const list = PORTADA.map((i) => FOTOS[i]);
  // posición (%), ancho, desenfoque, opacidad: unas cerca y nítidas, otras lejos y borrosas
  const spots = [
    { x: 4, y: 12, w: 190, b: 0, o: 0.95 },
    { x: 74, y: 8, w: 150, b: 3, o: 0.7 },
    { x: 80, y: 58, w: 210, b: 0, o: 0.95 },
    { x: 8, y: 62, w: 140, b: 4, o: 0.6 },
    { x: 40, y: 2, w: 110, b: 6, o: 0.45 },
    { x: 44, y: 80, w: 120, b: 5, o: 0.5 },
  ];
  const box = $('#hero-floaters');
  const max = isSmall ? 4 : 6;
  list.slice(0, max).forEach((foto, i) => {
    const s = spots[i];
    const el = document.createElement('div');
    el.className = 'floater';
    const w = isSmall ? Math.round(s.w * 0.62) : s.w;
    el.style.cssText = `left:${s.x}%;top:${s.y}%;--w:${w}px;--b:${s.b}px;--o:${s.o};` +
      `--t:${14 + i * 3}s;--d:${-i * 2.5}s;--dx:${(i % 2 ? -1 : 1) * (18 + i * 4)}px;--dy:${-(20 + i * 6)}px;` +
      `--r0:${-6 - i * 2}deg;--r1:${6 + i * 2}deg`;
    el.append(blobPhoto(foto, { eager: i < 3 }).wrap);
    box.append(el);
  });

  if (SOBRE_JK >= 0) $('#about-photo').append(blobPhoto(FOTOS[SOBRE_JK]).img);
  else $('.about-portrait').hidden = true;
})();

/* =========================================================================
   3. Galería: anillos 3D de fotos difuminadas
   ========================================================================= */
const lightbox = (() => {
  const lb = $('#lightbox');
  const lbImg = $('#lb-img');
  const lbCap = $('#lb-cap');
  let current = 0;

  function show(i) {
    current = (i + FOTOS.length) % FOTOS.length;
    const f = FOTOS[current];
    lbImg.classList.remove('swap');
    void lbImg.offsetWidth;
    lbImg.classList.add('swap');
    lbImg.src = f.src;
    lbImg.alt = f.texto || `Foto ${current + 1}`;
    lbCap.textContent = f.texto || '';
    lbCap.hidden = !f.texto;
  }
  function open(i) {
    if (!FOTOS.length) return;
    show(i);
    lb.showModal();
  }
  $('#lb-prev').addEventListener('click', () => show(current - 1));
  $('#lb-next').addEventListener('click', () => show(current + 1));
  $('#lb-close').addEventListener('click', () => lb.close());
  lb.addEventListener('click', (e) => { if (e.target === lb) lb.close(); });
  lb.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
  let sx = null;
  lb.addEventListener('pointerdown', (e) => { sx = e.clientX; });
  lb.addEventListener('pointerup', (e) => {
    if (sx === null) return;
    const dx = e.clientX - sx;
    sx = null;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
  });
  if (FOTOS.length < 2) { $('#lb-prev').hidden = true; $('#lb-next').hidden = true; }
  return { open };
})();

function createRing(items, { direction = 1, tilt = -6 } = {}) {
  const stage = document.createElement('div');
  stage.className = 'ring-stage';
  stage.tabIndex = 0;
  stage.setAttribute('aria-label', 'Anillo de fotos. Usa las flechas izquierda y derecha para girarlo.');
  const ring = document.createElement('div');
  ring.className = 'ring';
  stage.append(ring);
  $('#rings').append(stage);

  const n = items.length;
  const step = 360 / n;
  const cards = items.map((item, i) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'card';
    card.dataset.index = item.ref;
    card.setAttribute('aria-label', item.texto ? `Ver foto: ${item.texto}` : `Ver foto ${item.ref + 1}`);
    const inner = document.createElement('div');
    inner.className = 'card-inner';
    const { wrap, img } = blobPhoto(item, { eager: i < 3 });
    wrap.style.setProperty('--morph', `${12 + (i % 5) * 2}s`);
    wrap.style.setProperty('--morph-d', `${-i * 1.7}s`);
    img.addEventListener('error', () => {
      card.classList.add('broken');
      wrap.textContent = `No encontré «${item.src}». Revisa el nombre en config.js.`;
    });
    inner.append(wrap);
    if (item.texto) {
      const cap = document.createElement('span');
      cap.className = 'card-caption';
      cap.textContent = item.texto;
      inner.append(cap);
    }
    card.append(inner);
    card.addEventListener('click', (e) => { if (e.detail === 0) lightbox.open(item.ref); });
    ring.append(card);
    return { card, inner, blur: -1 };
  });

  let radius = 300;
  function layout() {
    const w = ring.offsetWidth;
    radius = Math.max(w * 0.95, (w / 2 + w * (isSmall ? 0.06 : 0.2)) / Math.tan(Math.PI / n));
    cards.forEach(({ card }, i) => { card.style.transform = `rotateY(${i * step}deg) translateZ(${radius}px)`; });
  }
  layout();
  addEventListener('resize', layout);

  let rot = Math.random() * 360;
  let vel = 0;
  let dragging = false;
  let lastX = 0;
  let moved = 0;
  let downCard = null;
  let idleSince = 0;
  let visible = false;
  let raf = 0;
  const auto = 0.06 * direction;

  function update() {
    ring.style.transform = `translateZ(${-radius}px) rotateX(${tilt}deg) rotateY(${rot}deg)`;
    cards.forEach((c, i) => {
      const a = ((i * step + rot) % 360 + 540) % 360 - 180; // 0 = al frente
      const front = (Math.cos((a * Math.PI) / 180) + 1) / 2; // 1 frente, 0 atrás
      // atrás: más pequeñas, transparentes y desenfocadas
      const blur = Math.round((1 - front) * (isSmall ? 4 : 7));
      if (blur !== c.blur) { c.card.style.filter = blur ? `blur(${blur}px)` : 'none'; c.blur = blur; }
      c.card.style.opacity = (0.18 + front * 0.82).toFixed(2);
      c.card.style.pointerEvents = front > 0.6 ? 'auto' : 'none';
    });
  }

  function loop(now) {
    if (!dragging) {
      if (Math.abs(vel) > 0.01) { rot += vel; vel *= 0.94; idleSince = now; }
      else if (!reducedMotion && now - idleSince > 1500) rot += auto;
    }
    update();
    raf = visible ? requestAnimationFrame(loop) : 0;
  }

  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !raf) raf = requestAnimationFrame(loop);
  }).observe(stage);
  update();

  stage.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    dragging = true;
    lastX = e.clientX;
    moved = 0;
    vel = 0;
    downCard = e.target.closest('.card');
    stage.setPointerCapture(e.pointerId);
    stage.classList.add('dragging');
  });
  stage.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastX;
    lastX = e.clientX;
    moved += Math.abs(dx);
    const k = e.pointerType === 'touch' ? 0.4 : 0.28;
    rot += dx * k;
    vel = Math.max(-5, Math.min(5, dx * k));
  });
  const endDrag = (e) => {
    if (!dragging) return;
    dragging = false;
    stage.classList.remove('dragging');
    idleSince = performance.now();
    if (e.type === 'pointerup' && moved < 8 && downCard) lightbox.open(+downCard.dataset.index);
    downCard = null;
  };
  stage.addEventListener('pointerup', endDrag);
  stage.addEventListener('pointercancel', endDrag);
  stage.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { vel = step / 14; e.preventDefault(); }
    if (e.key === 'ArrowRight') { vel = -step / 14; e.preventDefault(); }
  });

  // efecto tilt con el mouse
  if (!reducedMotion) {
    cards.forEach(({ card, inner }) => {
      card.addEventListener('pointermove', (e) => {
        if (e.pointerType !== 'mouse' || dragging) return;
        const r = inner.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        inner.style.setProperty('--ry', `${px * 22}deg`);
        inner.style.setProperty('--rx', `${-py * 22}deg`);
        inner.style.setProperty('--s', '1.08');
      });
      card.addEventListener('pointerleave', () => {
        ['--ry', '--rx', '--s'].forEach((p) => inner.style.removeProperty(p));
      });
    });
  }
}

(() => {
  $('#gallery-empty').hidden = FOTOS.length > 0;
  if (!FOTOS.length) return;
  let all = FOTOS.map((f, i) => ({ ...f, ref: i })).filter((f) => !RESERVADAS.has(f.ref));
  if (all.length < 5) all = FOTOS.map((f, i) => ({ ...f, ref: i })); // muy pocas fotos: se usan todas
  // Más de 12 fotos: dos anillos que giran en sentidos opuestos. Cada foto aparece una sola vez.
  const groups = all.length > 12 ? [all.filter((_, i) => i % 2 === 0), all.filter((_, i) => i % 2 === 1)] : [all];
  groups.forEach((g, gi) => createRing(g, { direction: gi ? -1 : 1, tilt: gi ? 4 : -6 }));
})();

/* =========================================================================
   5. Playlist (YouTube, dominio youtube-nocookie.com)
   ========================================================================= */
(() => {
  // Acepta un ID o un link completo de YouTube
  function parseId(raw) {
    const v = String(raw || '').trim();
    if (!v || v === 'PEGAR_ID_AQUI') return '';
    const m = v.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/);
    if (m) return m[1];
    return /^[\w-]{11}$/.test(v) ? v : '';
  }

  const songs = (C.canciones || [])
    .map((s) => ({ ...s, id: parseId(s.videoId) }))
    .filter((s) => s.id);

  if (!songs.length) {
    $('#player').hidden = true;
    $('#playlist-empty').hidden = false;
    return;
  }

  const screen = $('#screen');
  const list = $('#tracklist');
  const playBtn = $('#playbtn');
  let idx = 0;
  let playing = false;

  songs.forEach((s, i) => {
    const li = document.createElement('li');
    const b = document.createElement('button');
    b.type = 'button';
    b.innerHTML = `<span class="num">${String(i + 1).padStart(2, '0')}</span><span><span class="t"></span><span class="a"></span></span>`;
    b.querySelector('.t').textContent = s.titulo;
    b.querySelector('.a').textContent = s.artista || '';
    b.addEventListener('click', () => select(i, true));
    li.append(b);
    list.append(li);
  });

  function embedUrl(id) {
    const p = new URLSearchParams({ autoplay: '1', rel: '0', playsinline: '1', modestbranding: '1' });
    return `https://www.youtube-nocookie.com/embed/${id}?${p}`;
  }

  function renderScreen() {
    const s = songs[idx];
    screen.replaceChildren();
    if (playing) {
      const f = document.createElement('iframe');
      f.src = embedUrl(s.id);
      f.title = `${s.titulo} — video de YouTube`;
      f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      f.allowFullscreen = true;
      f.referrerPolicy = 'strict-origin-when-cross-origin';
      screen.append(f);
    } else {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'poster';
      b.style.backgroundImage = `url("https://i.ytimg.com/vi/${s.id}/hqdefault.jpg")`;
      b.setAttribute('aria-label', `Reproducir ${s.titulo}`);
      b.innerHTML = '<span class="poster-play"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg></span>';
      b.addEventListener('click', () => select(idx, true));
      screen.append(b);
    }
  }

  function updatePlayBtn() {
    playBtn.setAttribute('aria-label', playing ? 'Detener' : 'Reproducir');
    playBtn.innerHTML = playing
      ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
  }

  function select(i, autoplay) {
    idx = (i + songs.length) % songs.length;
    const s = songs[idx];
    if (autoplay !== undefined) playing = autoplay;
    $('#now-count').textContent = `Canción ${idx + 1} de ${songs.length}`;
    $('#now-title').textContent = s.titulo;
    $('#now-artist').textContent = s.artista || '';
    $('#now-note').textContent = fill(s.nota || '');
    [...list.querySelectorAll('button')].forEach((b, j) => {
      b.setAttribute('aria-current', j === idx ? 'true' : 'false');
      b.querySelector('.num').innerHTML = j === idx && playing && !reducedMotion
        ? '<span class="eq" aria-hidden="true"><i></i><i></i><i></i></span>'
        : String(j + 1).padStart(2, '0');
    });
    renderScreen();
    updatePlayBtn();
  }

  $('#prev').addEventListener('click', () => select(idx - 1, playing));
  $('#next').addEventListener('click', () => select(idx + 1, playing));
  playBtn.addEventListener('click', () => select(idx, !playing));

  select(0, false);
})();

/* =========================================================================
   6. Carta: sobre con sello + máquina de escribir + lluvia de corazones
   ========================================================================= */
(() => {
  const carta = C.carta || {};
  const blocks = [
    { cls: 'greet', text: fill(carta.saludo) },
    ...(carta.parrafos || []).map((p) => ({ cls: '', text: fill(p) })),
    { cls: 'bye', text: fill(carta.despedida) },
    { cls: 'sign', text: fill(carta.firma) },
  ].filter((b) => b.text);

  // Versión completa para lectores de pantalla
  const full = $('#letter-full');
  blocks.forEach((b) => { const p = document.createElement('p'); p.textContent = b.text; full.append(p); });

  const envelope = $('#envelope');
  const letter = $('#letter');
  const typed = $('#letter-typed');
  const skip = $('#letter-skip');
  const more = $('#more-hearts');
  const speed = Math.max(5, Number(carta.velocidad) || 34);
  let finished = false;
  let timer = 0;

  function renderAll() {
    typed.replaceChildren(...blocks.map((b) => {
      const p = document.createElement('p');
      if (b.cls) p.className = b.cls;
      p.textContent = b.text;
      return p;
    }));
  }

  function finish() {
    if (finished) return;
    finished = true;
    clearTimeout(timer);
    renderAll();
    skip.hidden = true;
    if (!reducedMotion) { more.hidden = false; heartRain(); }
  }

  function type() {
    skip.hidden = false;
    // Cada párrafo lleva el texto restante invisible, así la carta no "salta" al crecer
    const caret = document.createElement('span');
    caret.className = 'caret';
    const parts = blocks.map((blk) => {
      const p = document.createElement('p');
      if (blk.cls) p.className = blk.cls;
      const shown = document.createElement('span');
      const ghost = document.createElement('span');
      ghost.className = 'ghost';
      ghost.textContent = blk.text;
      p.append(shown, ghost);
      return { shown, ghost, p };
    });
    typed.replaceChildren(...parts.map((x) => x.p));
    let b = 0;
    let c = 0;
    const stepFn = () => {
      if (finished) return;
      if (b >= blocks.length) { caret.remove(); finish(); return; }
      const { shown, ghost } = parts[b];
      if (c === 0) shown.after(caret);
      const text = blocks[b].text;
      c++;
      shown.textContent = text.slice(0, c);
      ghost.textContent = text.slice(c);
      let delay = speed;
      const ch = text[c - 1];
      if (ch === ',') delay = speed * 6;
      if ('.!?:'.includes(ch)) delay = speed * 12;
      if (c >= text.length) { b++; c = 0; delay = speed * 18; }
      timer = setTimeout(stepFn, delay);
    };
    stepFn();
  }

  function openLetter() {
    if (envelope.classList.contains('open')) return;
    envelope.classList.add('open');
    const wait = reducedMotion ? 0 : 1700;
    setTimeout(() => {
      envelope.classList.add('gone');
      setTimeout(() => {
        envelope.hidden = true;
        letter.hidden = false;
        letter.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
        if (reducedMotion) finish(); else setTimeout(type, 700);
      }, reducedMotion ? 0 : 600);
    }, wait);
  }

  $('#seal').addEventListener('click', openLetter);
  skip.addEventListener('click', finish);
  more.addEventListener('click', heartRain);
})();

const HEART_PATH = 'M12 21s-7.5-4.6-10-9.3C.3 8.4 2.1 4 6.2 4c2.3 0 3.8 1.3 4.8 2.8C12 5.3 13.5 4 15.8 4 19.9 4 21.7 8.4 20 11.7 17.5 16.4 12 21 12 21z';
const HEART_COLORS = ['#7B2CBF', '#9D4EDD', '#C77DFF', '#E0AAFF', '#D4AF37'];

function heartRain() {
  if (reducedMotion) return;
  const box = $('#heart-rain');
  const count = innerWidth < 600 ? 34 : 60;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = 'h';
    const size = 12 + Math.random() * 26;
    el.style.left = `${Math.random() * 100}%`;
    el.style.width = el.style.height = `${size}px`;
    el.style.setProperty('--d', `${4.5 + Math.random() * 4}s`);
    el.style.setProperty('--delay', `${Math.random() * 2.8}s`);
    el.style.setProperty('--sw', `${1.6 + Math.random() * 1.8}s`);
    el.style.setProperty('--r', `${(Math.random() - 0.5) * 120}deg`);
    const color = HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)];
    el.innerHTML = `<svg viewBox="0 0 24 24"><path d="${HEART_PATH}" fill="${color}"/></svg>`;
    el.addEventListener('animationend', (e) => { if (e.target === el) el.remove(); });
    box.append(el);
  }
}

/* =========================================================================
   Créditos de las fotos (las licencias CC BY piden citar al autor)
   ========================================================================= */
(() => {
  const ul = $('#credits-list');
  const seen = new Set();
  FOTOS.forEach((f) => {
    if (!f.autor && !f.fuente) return;
    const key = f.fuente || f.src;
    if (seen.has(key)) return;
    seen.add(key);
    const li = document.createElement('li');
    const label = `${f.texto || 'Foto'}: ${f.autor || 'autor desconocido'}${f.licencia ? `, ${f.licencia}` : ''}`;
    if (f.fuente) {
      const a = document.createElement('a');
      a.href = f.fuente;
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = label;
      li.append(a);
    } else li.textContent = label;
    ul.append(li);
  });
  if (!ul.children.length) $('.credits').hidden = true;
})();
