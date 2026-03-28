# 🪐 3d-skills-portfolio

> Interactive 3D Skills & Tools portfolio built with HTML, CSS, JavaScript and Three.js.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)

---

## 🌐 Live Demo

**[darshilking208.github.io/3d-skills-portfolio](https://darshilking208.github.io/3d-skills-portfolio/)**

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

- 🪐 **Animated Saturn** — procedural planet texture, multi-layer rings, 2 orbiting moons, star field & purple nebula
- 🖱️ **Mouse parallax** — Saturn orbits with your cursor in real time
- 🃏 **32+ Skill cards** — scroll-reveal, animated progress bars, live % counters, 3D tilt on hover
- 🔖 **Filter tabs** — Frontend · Backend · 3D / WebGL · Tools with staggered re-entry animation
- ⚡ **Zero build tools** — pure HTML, CSS & JS; Three.js via CDN

---

## 🛠️ Skills Covered

| Category | Skills |
|---|---|
| **Frontend** | HTML5, CSS3, JavaScript, Responsive Design, Tailwind, Bootstrap, DOM, Animations |
| **Backend** | Python, Node.js, Express.js, PHP, MySQL, REST API, Authentication |
| **3D / WebGL** | Three.js, WebGL, GLSL Shaders, Blender, 3D Animations, Particles, Interactive 3D UI |
| **Tools** | Git, GitHub, VS Code, NPM, Vite, Figma, Chrome DevTools, Linux Terminal |

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

**Move Saturn** — edit position in `saturn.js`:

```js
saturnGroup.position.set(2.2, -0.2, -1); // x, y, z
```

---

## 📜 License

MIT © [Darshill K. Prajapati](https://github.com/Darshilking208)
