/* =========================================================================
   Fondo 3D: galaxia de partículas moradas + corazones flotantes
   ========================================================================= */
import * as THREE from 'three';

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const isSmall = Math.min(innerWidth, innerHeight) < 700 || (navigator.hardwareConcurrency || 8) <= 4;

function init() {
  const canvas = document.getElementById('bg');
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: !isSmall, alpha: true, powerPreference: 'low-power' });
  } catch (err) {
    document.documentElement.classList.add('no-webgl');
    return;
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, isSmall ? 1.5 : 2));
  renderer.setClearColor(0xffffff, 0);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0xfbf7ff, 0.03);

  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 200);
  const CAM_START_Z = 24;
  const CAM_END_Z = 13;
  camera.position.set(0, 0, CAM_START_Z);

  /* ---------- Textura redonda para las partículas ---------- */
  const dot = (() => {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const g = c.getContext('2d');
    const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grd.addColorStop(0, 'rgba(255,255,255,1)');
    grd.addColorStop(0.25, 'rgba(255,255,255,.75)');
    grd.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grd;
    g.fillRect(0, 0, 64, 64);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  })();

  /* ---------- Galaxia espiral ---------- */
  const COUNT = isSmall ? 3200 : 9000;
  const BRANCHES = 4;
  const RADIUS = 11;
  const SPIN = 1.15;

  const positions = new Float32Array(COUNT * 3);
  const colors = new Float32Array(COUNT * 3);
  const inner = new THREE.Color('#D4AF37');
  const mid = new THREE.Color('#9D4EDD');
  const outer = new THREE.Color('#C77DFF');
  const tmp = new THREE.Color();

  for (let i = 0; i < COUNT; i++) {
    const r = (0.08 + Math.pow(Math.random(), 1.35) * 0.92) * RADIUS;
    const branch = ((i % BRANCHES) / BRANCHES) * Math.PI * 2;
    const spin = r * SPIN;
    const spread = 0.45 * (1 - r / RADIUS * 0.4);
    const rx = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * spread * r;
    const ry = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * spread * r * 0.5;
    const rz = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * spread * r;

    positions[i * 3] = Math.cos(branch + spin) * r + rx;
    positions[i * 3 + 1] = ry;
    positions[i * 3 + 2] = Math.sin(branch + spin) * r + rz;

    const t = r / RADIUS;
    if (t < 0.35) tmp.copy(inner).lerp(mid, t / 0.35);
    else tmp.copy(mid).lerp(outer, (t - 0.35) / 0.65);
    colors[i * 3] = tmp.r;
    colors[i * 3 + 1] = tmp.g;
    colors[i * 3 + 2] = tmp.b;
  }

  const galaxyGeo = new THREE.BufferGeometry();
  galaxyGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  galaxyGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const galaxyMat = new THREE.PointsMaterial({
    size: isSmall ? 0.13 : 0.1,
    opacity: 0.75,
    map: dot,
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    blending: THREE.NormalBlending,
  });
  const galaxy = new THREE.Points(galaxyGeo, galaxyMat);
  const galaxyPivot = new THREE.Group();
  galaxyPivot.add(galaxy);
  galaxyPivot.rotation.x = 1.05;
  galaxyPivot.rotation.z = 0.25;
  galaxyPivot.position.set(1.5, -2.6, -5);
  scene.add(galaxyPivot);

  /* ---------- Estrellas lejanas ---------- */
  const STARS = isSmall ? 700 : 1600;
  const starPos = new Float32Array(STARS * 3);
  for (let i = 0; i < STARS; i++) {
    const v = new THREE.Vector3().randomDirection().multiplyScalar(30 + Math.random() * 40);
    starPos.set([v.x, v.y, v.z], i * 3);
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({
    size: 0.4, map: dot, color: 0xc77dff, transparent: true, opacity: 0.45,
    depthWrite: false, fog: false,
  }));
  scene.add(stars);

  /* ---------- Corazones ---------- */
  const heartShape = new THREE.Shape();
  heartShape.moveTo(5, 5);
  heartShape.bezierCurveTo(5, 5, 4, 0, 0, 0);
  heartShape.bezierCurveTo(-6, 0, -6, 7, -6, 7);
  heartShape.bezierCurveTo(-6, 11, -3, 15.4, 5, 19);
  heartShape.bezierCurveTo(12, 15.4, 16, 11, 16, 7);
  heartShape.bezierCurveTo(16, 7, 16, 0, 10, 0);
  heartShape.bezierCurveTo(7, 0, 5, 5, 5, 5);

  const heartGeo = new THREE.ExtrudeGeometry(heartShape, {
    depth: 3, bevelEnabled: true, bevelSegments: isSmall ? 2 : 4,
    bevelSize: 1.4, bevelThickness: 1.6, curveSegments: isSmall ? 8 : 14,
  });
  heartGeo.center();
  heartGeo.rotateZ(Math.PI);
  heartGeo.scale(0.032, 0.032, 0.032);

  scene.add(new THREE.AmbientLight(0xffffff, 1.6));
  const keyLight = new THREE.PointLight(0xe8c67f, 60, 40);
  keyLight.position.set(4, 6, 8);
  scene.add(keyLight);
  const rimLight = new THREE.PointLight(0xc77dff, 80, 40);
  rimLight.position.set(-6, -4, 4);
  scene.add(rimLight);

  const palette = [0xc77dff, 0x9d4edd, 0xe0aaff, 0x7b2cbf, 0xf3c9ff];
  const materials = palette.map((c, i) => new THREE.MeshStandardMaterial({
    color: c,
    emissive: c,
    emissiveIntensity: 0.12,
    roughness: 0.32,
    metalness: i === 4 ? 0.65 : 0.25,
    transparent: true,
    opacity: 0.9,
  }));

  const HEARTS = isSmall ? 11 : 22;
  const hearts = [];
  for (let i = 0; i < HEARTS; i++) {
    const mesh = new THREE.Mesh(heartGeo, materials[i % materials.length]);
    const s = 0.45 + Math.random() * 0.75;
    mesh.scale.setScalar(s);
    const home = new THREE.Vector3(
      (Math.random() - 0.5) * (isSmall ? 12 : 22),
      (Math.random() - 0.5) * 16,
      -7 + Math.random() * 10,
    );
    mesh.position.copy(home);
    mesh.rotation.set(Math.random() * 0.6, Math.random() * Math.PI, Math.random() * 0.4 - 0.2);
    scene.add(mesh);
    hearts.push({
      mesh, home,
      offset: new THREE.Vector3(),
      speed: 0.25 + Math.random() * 0.35,
      spinSpeed: (Math.random() - 0.5) * 0.9,
      phase: Math.random() * Math.PI * 2,
    });
  }

  /* ---------- Interacción ---------- */
  const pointer = new THREE.Vector2(0, 0);
  const pointerSmooth = new THREE.Vector2(0, 0);
  let pointerActive = false;
  const onPointer = (e) => {
    pointer.x = (e.clientX / innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / innerHeight) * 2 + 1;
    pointerActive = true;
  };
  addEventListener('pointermove', onPointer, { passive: true });
  addEventListener('pointerdown', onPointer, { passive: true });
  document.addEventListener('pointerleave', () => { pointerActive = false; });

  let scrollT = 0;
  addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    scrollT = max > 0 ? scrollY / max : 0;
  }, { passive: true });

  let targetZ = CAM_START_Z;
  addEventListener('morelia:enter', () => {
    targetZ = CAM_END_Z;
    if (reducedMotion) { camera.position.z = CAM_END_Z; render(); }
  });

  function resize() {
    const w = innerWidth, h = innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = w < h ? 70 : 60;
    camera.updateProjectionMatrix();
  }
  addEventListener('resize', () => { resize(); if (reducedMotion) render(); });
  resize();

  /* ---------- Bucle ---------- */
  const clock = new THREE.Clock();
  const ndc = new THREE.Vector3();
  const dir = new THREE.Vector3();
  const pWorld = new THREE.Vector3();
  const away = new THREE.Vector3();

  function render() { renderer.render(scene, camera); }

  function tick() {
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;

    pointerSmooth.lerp(pointer, 0.05);

    // Cámara: acercamiento de entrada + paralaje suave
    camera.position.z += (targetZ - camera.position.z) * 0.025;
    camera.position.x += (pointerSmooth.x * 1.2 - camera.position.x) * 0.05;
    camera.position.y += (pointerSmooth.y * 0.8 - scrollT * 2 - camera.position.y) * 0.05;
    camera.lookAt(0, -scrollT * 2, 0);

    galaxy.rotation.y = t * 0.035 + scrollT * 1.4;
    stars.rotation.y = t * 0.004;

    // Rayo del puntero, para que los corazones se aparten con suavidad
    ndc.set(pointerSmooth.x, pointerSmooth.y, 0.5).unproject(camera);
    dir.copy(ndc).sub(camera.position).normalize();

    for (const h of hearts) {
      const m = h.mesh;
      h.home.y += h.speed * dt;
      if (h.home.y > 9) { h.home.y = -9; h.home.x = (Math.random() - 0.5) * (isSmall ? 12 : 22); }

      // punto del rayo a la profundidad del corazón
      const k = (h.home.z - camera.position.z) / dir.z;
      pWorld.copy(camera.position).addScaledVector(dir, k);
      away.set(h.home.x - pWorld.x, h.home.y - pWorld.y, 0);
      const d = away.length();
      const R = 3.2;
      if (pointerActive && d < R && d > 0.0001) {
        away.multiplyScalar(((R - d) / R) * 1.6 / d);
      } else {
        away.set(0, 0, 0);
      }
      h.offset.lerp(away, 0.06);

      m.position.set(
        h.home.x + Math.sin(t * 0.6 + h.phase) * 0.4 + h.offset.x,
        h.home.y + h.offset.y,
        h.home.z,
      );
      m.rotation.y += h.spinSpeed * dt;
      m.rotation.z = Math.sin(t * 0.8 + h.phase) * 0.18 + h.offset.x * -0.15;
      const beat = 1 + Math.max(0, Math.sin(t * 2.2 + h.phase)) * 0.04;
      m.scale.setScalar(m.userData.s || (m.userData.s = m.scale.x));
      m.scale.multiplyScalar(beat);
    }

    render();
  }

  if (reducedMotion) {
    render();
  } else {
    renderer.setAnimationLoop(() => { if (!document.hidden) tick(); });
  }
}

init();
