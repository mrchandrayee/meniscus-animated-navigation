# Meniscus — Animated Dock Navigation

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-blue?style=for-the-badge&logo=github)](https://mrchandrayee.github.io/meniscus-animated-navigation/)
[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org) [![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org) [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)

A runnable vanilla HTML/CSS/JavaScript recreation of the supplied 5.13-second screen recording.

## Run
Unzip the project and open `index.html` in any modern browser. No npm install or build step is required.

Optional local server:
```bash
python3 -m http.server 8000
```
Open `http://localhost:8000`.

## What is recreated
- Dark aubergine / plum gradient background with a soft accent-coloured ambient glow.
- Minimal browser-like top strip reading MENISCUS — HTML · CSS · JS and localhost / meniscus.
- Large centered page title and subtitle.
- Five-item floating dock: Home, Profile, Messages, Camera and Settings.
- Active item is indicated by a raised luminous circular bead, matching the active tab's accent colour.
- Animated bead movement and accent changes on tab selection.
- Drag the bead horizontally to select the nearest tab.
- Keyboard navigation with Left/Right, Home and End keys.
- Three bottom code-preview panels for index.html, style.css and app.js, styled to resemble the recording's code strip.
- Responsive layout for mobile and reduced-motion preference.

## Source extraction note
The recording shows the running navigation demo and small code-preview panels at the bottom. Those code panels are too small to recover the complete original files verbatim. Some visible implementation concepts include an SVG dock skin/path, an accent custom property, and a geometric reach calculation for the moving notch. The supplied project reconstructs the visible behaviour and aesthetic; it is not the original source repository.

## Files
- `index.html` — page structure and code-preview panels
- `style.css` — layout, gradients, dock, bead and responsive styling
- `app.js` — tab state, animation, drag interaction and keyboard support

No backend or external image assets are required.

## 👨‍💻 Author

**mrchandrayee** · [GitHub](https://github.com/mrchandrayee)

## 📄 License

[MIT License](./LICENSE)
