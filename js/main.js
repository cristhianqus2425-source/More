/* =========================================================================
   Lógica principal: intro, galería 3D, playlist, carta y corazones
   ========================================================================= */

const C = window.CONFIG || {};
const NOMBRE = C.nombre || 'Morelia';
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (sel, root = document) => root.querySelector(sel);
const fill = (text) => String(text ?? '').replaceAll('{nombre}', NOMBRE);

/* ---------- Nombre ---------- */
document.querySelectorAll('[data-nombre]').forEach((el) => { el.textContent = NOMBRE; });
document.title = `Para ${NOMBRE} 💜`;

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

  initLetter();
}

/* =========================================================================
   3. Galería 3D
   ========================================================================= */
const gallery = (() => {
  const stage = $('#ring-stage');
  const ring = $('#ring');
  const fotos = (C.fotos || []).filter((f) => f && f.src);
  const hasPhotos = fotos.length > 0;
  $('#gallery-empty').hidden = hasPhotos;

  // Con pocas fotos se repiten para que el anillo se vea lleno
  const items = hasPhotos
    ? Array.from({ length: Math.max(fotos.length, Math.ceil(6 / fotos.length) * fotos.length) }, (_, i) => ({ ...fotos[i % fotos.length], ref: i % fotos.length }))
    : Array.from({ length: 8 }, () => ({ placeholder: true }));
  const n = items.length;
  const step = 360 / n;
  const cards = [];

  items.forEach((item, i) => {
    let card;
    if (item.placeholder) {
      card = document.createElement('div');
      card.className = 'card card-placeholder';
      card.innerHTML = `<div class="card-inner"><div><span class="ph">${i % 2 ? 'JK' : '💜'}</span><small>Tu foto aquí</small></div></div>`;
    } else {
      card = document.createElement('button');
      card.type = 'button';
      card.className = 'card';
      card.dataset.index = item.ref;
      card.setAttribute('aria-label', item.texto ? `Ver foto: ${item.texto}` : `Ver foto ${item.ref + 1}`);
      if (i >= fotos.length) card.tabIndex = -1;
      const inner = document.createElement('div');
      inner.className = 'card-inner';
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.texto || `Foto ${item.ref + 1}`;
      img.loading = i < 4 ? 'eager' : 'lazy';
      img.decoding = 'async';
      img.draggable = false;
      img.addEventListener('error', () => {
        card.classList.add('broken');
        inner.append(`No encontré «${item.src}». Revisa el nombre en config.js.`);
      });
      inner.append(img);
      if (item.texto) {
        const cap = document.createElement('span');
        cap.className = 'card-caption';
        cap.textContent = item.texto;
        inner.append(cap);
      }
      card.append(inner);
      // Teclado: Enter / Espacio abre la foto
      card.addEventListener('click', (e) => { if (e.detail === 0) openLightbox(item.ref); });
    }
    ring.append(card);
    cards.push(card);
  });

  let radius = 300;
  function layout() {
    const w = ring.offsetWidth;
    radius = n > 2 ? Math.max(w * 0.9, (w / 2 + 14) / Math.tan(Math.PI / n)) : w * 0.9;
    cards.forEach((card, i) => {
      card.style.transform = `rotateY(${i * step}deg) translateZ(${radius}px)`;
    });
  }
  layout();
  addEventListener('resize', layout);

  /* --- estado de giro --- */
  let rot = 0;
  let vel = 0;
  let dragging = false;
  let lastX = 0;
  let moved = 0;
  let downCard = null;
  let idleSince = 0;
  let visible = false;
  let raf = 0;

  function update() {
    ring.style.transform = `translateZ(${-radius}px) rotateY(${rot}deg)`;
    cards.forEach((card, i) => {
      let a = ((i * step + rot) % 360 + 540) % 360 - 180; // -180..180, 0 = al frente
      const front = (Math.cos((a * Math.PI) / 180) + 1) / 2; // 0..1
      card.style.opacity = (0.25 + front * 0.75).toFixed(3);
      card.style.filter = `brightness(${(0.45 + front * 0.55).toFixed(3)})`;
      card.style.pointerEvents = front > 0.55 ? 'auto' : 'none';
    });
  }

  function loop(now) {
    if (!dragging) {
      if (Math.abs(vel) > 0.01) { rot += vel; vel *= 0.94; idleSince = now; }
      else if (!reducedMotion && now - idleSince > 1800) rot -= 0.07;
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
    downCard = e.target.closest('.card[data-index]');
    stage.setPointerCapture(e.pointerId);
    stage.classList.add('dragging');
  });
  stage.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastX;
    lastX = e.clientX;
    moved += Math.abs(dx);
    const k = e.pointerType === 'touch' ? 0.45 : 0.3;
    rot += dx * k;
    vel = Math.max(-6, Math.min(6, dx * k));
  });
  const endDrag = (e) => {
    if (!dragging) return;
    dragging = false;
    stage.classList.remove('dragging');
    idleSince = performance.now();
    if (e.type === 'pointerup' && moved < 8 && downCard) openLightbox(+downCard.dataset.index);
    downCard = null;
  };
  stage.addEventListener('pointerup', endDrag);
  stage.addEventListener('pointercancel', endDrag);

  stage.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { vel = step / 14; e.preventDefault(); }
    if (e.key === 'ArrowRight') { vel = -step / 14; e.preventDefault(); }
  });

  /* --- efecto tilt al pasar el mouse --- */
  if (!reducedMotion) {
    cards.forEach((card) => {
      const inner = card.querySelector('.card-inner');
      card.addEventListener('pointermove', (e) => {
        if (e.pointerType !== 'mouse' || dragging) return;
        const r = inner.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        inner.style.setProperty('--ry', `${px * 18}deg`);
        inner.style.setProperty('--rx', `${-py * 18}deg`);
        inner.style.setProperty('--s', '1.05');
        inner.style.setProperty('--gx', `${(px + 0.5) * 100}%`);
        inner.style.setProperty('--gy', `${(py + 0.5) * 100}%`);
        inner.style.setProperty('--glow', '1');
      });
      card.addEventListener('pointerleave', () => {
        ['--ry', '--rx', '--s', '--glow'].forEach((p) => inner.style.removeProperty(p));
      });
    });
  }

  /* --- visor (lightbox) --- */
  const lb = $('#lightbox');
  const lbImg = $('#lb-img');
  const lbCap = $('#lb-cap');
  let current = 0;

  function show(i) {
    current = (i + fotos.length) % fotos.length;
    const f = fotos[current];
    lbImg.src = f.src;
    lbImg.alt = f.texto || `Foto ${current + 1}`;
    lbCap.textContent = f.texto || '';
    lbCap.hidden = !f.texto;
  }
  function openLightbox(i) {
    if (!hasPhotos) return;
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
  // deslizar con el dedo dentro del visor
  let sx = null;
  lb.addEventListener('pointerdown', (e) => { sx = e.clientX; });
  lb.addEventListener('pointerup', (e) => {
    if (sx === null) return;
    const dx = e.clientX - sx;
    sx = null;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
  });
  if (fotos.length < 2) { $('#lb-prev').hidden = true; $('#lb-next').hidden = true; }

  return { openLightbox };
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
      b.addEventListener('click', () => { playing = true; renderScreen(); updatePlayBtn(); });
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
      const num = b.querySelector('.num');
      num.innerHTML = j === idx && playing && !reducedMotion
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
   6. Carta con máquina de escribir + lluvia de corazones
   ========================================================================= */
function initLetter() {
  const carta = C.carta || {};
  const blocks = [
    { cls: 'greet', text: fill(carta.saludo) },
    ...(carta.parrafos || []).map((p) => ({ cls: '', text: fill(p) })),
    { cls: 'bye', text: fill(carta.despedida) },
    { cls: 'sign', text: fill(carta.firma) },
  ].filter((b) => b.text);

  // Versión completa para lectores de pantalla
  $('#letter-full').innerHTML = blocks.map(() => '<p></p>').join('');
  [...$('#letter-full').children].forEach((p, i) => { p.textContent = blocks[i].text; });

  const typed = $('#letter-typed');
  const skip = $('#letter-skip');
  const speed = Math.max(5, Number(carta.velocidad) || 34);
  let started = false;
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
    $('#more-hearts').hidden = false;
    heartRain();
  }

  function type() {
    started = true;
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
      return { p, shown, ghost };
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
      if (ch === ',' ) delay = speed * 6;
      if ('.!?:'.includes(ch)) delay = speed * 12;
      if (c >= text.length) { b++; c = 0; delay = speed * 18; }
      timer = setTimeout(stepFn, delay);
    };
    stepFn();
  }

  skip.addEventListener('click', finish);
  $('#more-hearts').addEventListener('click', heartRain);

  if (reducedMotion) {
    renderAll();
    $('#more-hearts').hidden = true;
    return;
  }

  const io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !started) { io.disconnect(); type(); }
  }, { threshold: 0.35 });
  io.observe($('.letter'));
}

const HEART_PATH = 'M12 21s-7.5-4.6-10-9.3C.3 8.4 2.1 4 6.2 4c2.3 0 3.8 1.3 4.8 2.8C12 5.3 13.5 4 15.8 4 19.9 4 21.7 8.4 20 11.7 17.5 16.4 12 21 12 21z';
const HEART_COLORS = ['#7B2CBF', '#9D4EDD', '#C77DFF', '#E0AAFF', '#E8C67F'];

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
