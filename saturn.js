/* ══════════════════════════════════════════════
   saturn.js  —  Three.js background scene
   Depends on: three.min.js (r128) loaded first
══════════════════════════════════════════════ */

(function () {

  /* ── Renderer ── */
  const canvas = document.getElementById('c');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight);
  renderer.setClearColor(0x000000, 0);

  /* ── Scene & camera ── */
  const scene = new THREE.Scene();
  const cam   = new THREE.PerspectiveCamera(48, innerWidth / innerHeight, 0.1, 1000);
  cam.position.set(0, 1.5, 9);

  window.addEventListener('resize', () => {
    cam.aspect = innerWidth / innerHeight;
    cam.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  });

  /* ── Lights ── */
  const sun = new THREE.DirectionalLight(0xfff0d0, 2.4);
  sun.position.set(8, 5, 6);
  scene.add(sun);
  scene.add(new THREE.AmbientLight(0x1a2a4a, 0.7));
  const rim = new THREE.DirectionalLight(0x7c5cf5, 0.5);
  rim.position.set(-8, -2, -4);
  scene.add(rim);

  /* ── Stars ── */
  const starGeo  = new THREE.BufferGeometry();
  const COUNT    = 3000;
  const starPos  = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi   = Math.acos(2 * Math.random() - 1);
    const r     = 80 + Math.random() * 130;
    starPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
    starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    starPos[i * 3 + 2] = r * Math.cos(phi);
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const starMesh = new THREE.Points(
    starGeo,
    new THREE.PointsMaterial({ color: 0xffffff, size: 0.16, sizeAttenuation: true })
  );
  scene.add(starMesh);

  /* ── Nebula ── */
  const nebGeo = new THREE.BufferGeometry();
  const NEB    = 500;
  const nebPos = new Float32Array(NEB * 3);
  for (let i = 0; i < NEB; i++) {
    nebPos[i * 3]     = (Math.random() - .5) * 70;
    nebPos[i * 3 + 1] = (Math.random() - .5) * 45;
    nebPos[i * 3 + 2] = (Math.random() - .5) * 70 - 12;
  }
  nebGeo.setAttribute('position', new THREE.BufferAttribute(nebPos, 3));
  scene.add(new THREE.Points(
    nebGeo,
    new THREE.PointsMaterial({ color: 0x7c5cf5, size: 0.065, transparent: true, opacity: 0.32, sizeAttenuation: true })
  ));

  /* ── Saturn planet texture ── */
  function makePlanetTexture() {
    const c   = document.createElement('canvas');
    c.width   = 1024; c.height = 512;
    const ctx = c.getContext('2d');

    const bg = ctx.createLinearGradient(0, 0, 0, 512);
    bg.addColorStop(0,   '#c8a35a');
    bg.addColorStop(.18, '#e0be82');
    bg.addColorStop(.35, '#c49a50');
    bg.addColorStop(.5,  '#b88c44');
    bg.addColorStop(.65, '#c49a50');
    bg.addColorStop(.82, '#e0be82');
    bg.addColorStop(1,   '#c8a35a');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1024, 512);

    const bands = [
      [28,  16, .22, '#6a4e1e'], [70,  12, .18, '#edd490'],
      [110, 20, .28, '#7a5820'], [155,  8, .15, '#f5e8b0'],
      [195, 26, .30, '#70501a'], [240,  6, .12, '#f8f0c0'],
      [260, 26, .30, '#70501a'], [305,  8, .15, '#f5e8b0'],
      [340, 20, .28, '#7a5820'], [385, 12, .18, '#edd490'],
      [430, 16, .22, '#6a4e1e'],
    ];
    bands.forEach(([y, h, op, col]) => {
      ctx.fillStyle  = col;
      ctx.globalAlpha = op;
      ctx.fillRect(0, y, 1024, h);
    });
    ctx.globalAlpha = 1;
    return new THREE.CanvasTexture(c);
  }

  /* ── Ring texture ── */
  function makeRingTexture() {
    const c   = document.createElement('canvas');
    c.width   = 512; c.height = 1;
    const ctx = c.getContext('2d');
    const g   = ctx.createLinearGradient(0, 0, 512, 0);
    [
      [0,    'rgba(0,0,0,0)'],
      [.04,  'rgba(170,130,60,.12)'],
      [.10,  'rgba(200,155,80,.5)'],
      [.17,  'rgba(155,115,50,.28)'],
      [.24,  'rgba(215,170,90,.68)'],
      [.31,  'rgba(135,100,45,.38)'],
      [.38,  'rgba(228,182,100,.82)'],
      [.44,  'rgba(185,142,68,.52)'],
      [.50,  'rgba(235,192,108,.92)'],
      [.56,  'rgba(192,150,72,.58)'],
      [.63,  'rgba(218,174,92,.72)'],
      [.70,  'rgba(160,120,52,.42)'],
      [.78,  'rgba(202,158,78,.58)'],
      [.86,  'rgba(148,112,48,.32)'],
      [.93,  'rgba(178,138,62,.18)'],
      [1,    'rgba(0,0,0,0)'],
    ].forEach(([stop, color]) => g.addColorStop(stop, color));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 512, 1);
    return new THREE.CanvasTexture(c);
  }

  /* ── Saturn group ── */
  const saturnGroup = new THREE.Group();
  saturnGroup.position.set(2.2, -0.2, -1);
  saturnGroup.rotation.z = THREE.MathUtils.degToRad(26.7);
  scene.add(saturnGroup);

  /* Planet sphere */
  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(1.65, 64, 64),
    new THREE.MeshStandardMaterial({ map: makePlanetTexture(), roughness: 0.75, metalness: 0.04 })
  );
  saturnGroup.add(planet);

  /* Atmosphere glow */
  saturnGroup.add(new THREE.Mesh(
    new THREE.SphereGeometry(1.70, 32, 32),
    new THREE.MeshStandardMaterial({
      color: 0xd4a050, transparent: true, opacity: 0.055, side: THREE.FrontSide
    })
  ));

  /* Rings */
  const ringTex = makeRingTexture();

  function addRing(innerR, outerR, tex, opacity) {
    const geo = new THREE.RingGeometry(innerR, outerR, 128);
    const pos = geo.attributes.position;
    const uv  = geo.attributes.uv;
    const v   = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      uv.setXY(i, (v.length() - innerR) / (outerR - innerR), 0.5);
    }
    uv.needsUpdate = true;
    const mesh = new THREE.Mesh(
      geo,
      new THREE.MeshBasicMaterial({
        map: tex, side: THREE.DoubleSide,
        transparent: true, opacity, depthWrite: false
      })
    );
    mesh.rotation.x = Math.PI / 2;
    saturnGroup.add(mesh);
  }

  addRing(1.92, 2.28, ringTex, 0.88);
  addRing(2.32, 2.90, ringTex, 1.00);
  addRing(2.94, 3.38, ringTex, 0.72);

  /* Moon 1 */
  const moonMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.11, 16, 16),
    new THREE.MeshStandardMaterial({ color: 0xb8a890, roughness: 0.9 })
  );
  const moonOrb = new THREE.Group();
  moonOrb.add(moonMesh);
  moonMesh.position.set(4.4, 0, 0);
  moonOrb.rotation.x = THREE.MathUtils.degToRad(10);
  saturnGroup.add(moonOrb);

  /* Moon 2 */
  const moon2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.07, 12, 12),
    new THREE.MeshStandardMaterial({ color: 0xa09080, roughness: 0.95 })
  );
  const moonOrb2 = new THREE.Group();
  moonOrb2.add(moon2);
  moon2.position.set(5.2, 0, 0);
  moonOrb2.rotation.x = THREE.MathUtils.degToRad(-6);
  saturnGroup.add(moonOrb2);

  /* ── Mouse parallax ── */
  let mx = 0, my = 0, tx = 0, ty = 0;
  document.addEventListener('mousemove', e => {
    mx = (e.clientX / innerWidth  - .5) * 2;
    my = (e.clientY / innerHeight - .5) * 2;
  });

  /* ── Render loop ── */
  const clock = new THREE.Clock();

  (function loop() {
    requestAnimationFrame(loop);
    const t = clock.getElapsedTime();

    tx += (mx * .28 - tx) * .032;
    ty += (my * .18 - ty) * .032;

    planet.rotation.y       = t * 0.11;
    saturnGroup.rotation.y  = tx * 0.48;
    saturnGroup.rotation.x  = -ty * 0.22;
    moonOrb.rotation.y      = t * 0.21;
    moonOrb2.rotation.y     = t * 0.14;
    starMesh.rotation.y     = t * .004;
    starMesh.rotation.x     = t * .0025;
    cam.position.y          = Math.sin(t * .28) * .08;

    renderer.render(scene, cam);
  })();

})();
