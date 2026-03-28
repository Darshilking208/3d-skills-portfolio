# 🪐 3d-skills-portfolio

> Interactive 3D Skills & Tools portfolio built with HTML, CSS, JavaScript and Three.js.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)

---

## ✨ Live Preview

> Open `index.html` in any modern browser — no build step required.

---

## 📁 Project Structure

```
3d-skills-portfolio/
├── index.html    →  Page markup & structure
├── style.css     →  All styles, variables & animations
├── saturn.js     →  Three.js 3D background scene
├── cards.js      →  Card interactions & tab filtering
├── README.md
└── LICENSE
```

---

## 🚀 Features

- 🪐 **Animated Saturn** — procedural planet texture, multi-layer rings, 2 orbiting moons, star field, purple nebula cloud
- 🖱️ **Mouse parallax** — Saturn reacts to cursor movement in real time
- 🃏 **Skill cards** — scroll-reveal entrance, animated progress bars, live percentage counters, 3D tilt on hover
- 🔖 **Filter tabs** — Frontend / Backend / 3D / Tools with staggered re-entry animation
- 📡 **Zero build tools** — pure HTML, CSS & JS; Three.js loaded from CDN

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic) |
| Styling | CSS3 (custom properties, keyframes, grid) |
| 3D Scene | Three.js r128 |
| Interactions | Vanilla JavaScript (ES6+) |
| Font | Syne + Space Mono (Google Fonts) |

---

## ⚡ Getting Started

```bash
# Clone the repo
git clone https://github.com/Darshilking208/3d-skills-portfolio.git

# Open in browser
cd 3d-skills-portfolio
open index.html
```

No `npm install`. No bundler. Just open and run.

---

## 🎨 Customisation

**Accent colours** — edit CSS variables in `style.css`:

```css
:root {
  --accent:  #00e5c0;   /* teal   – headings, frontend bars */
  --accent2: #7c5cf5;   /* purple – backend bars            */
  --accent3: #f5a623;   /* amber  – 3D / WebGL bars         */
}
```

**Add a skill card** — paste a new `.card` block in `index.html`:

```html
<div class="card show" data-cat="frontend">
  <span class="badge">X yrs</span>
  <div class="card-top">
    <div class="icon">🔥</div>
    <div class="pct" data-target="90">0%</div>
  </div>
  <div class="cname">Skill Name</div>
  <div class="ctag">Frontend · Category</div>
  <div class="track">
    <div class="fill fill-teal" data-pct="90"></div>
  </div>
  <div class="chips">
    <span class="chip">Tag 1</span>
    <span class="chip">Tag 2</span>
  </div>
</div>
```

**Move Saturn** — change position in `saturn.js`:

```js
saturnGroup.position.set(2.2, -0.2, -1); // x, y, z
```

---

## 📜 License

MIT © [Darshill K. Prajapati](https://github.com/Darshilking208)
