# Personal Portfolio Website - Tushar

A modern, high-performance, and responsive developer portfolio website designed to showcase full-stack capabilities, skills, featured projects, and career milestones.

## ✨ Features

- 🌓 **Dark & Light Mode Switcher**: Seamless theme toggle with local storage persistence and system preference detection.
- ⚡ **Zero-Dependency Architecture**: Built with semantic HTML5, modern CSS3, and Vanilla ES6+ JavaScript. No build step or installation required.
- 📱 **Fully Responsive Layout**: Perfectly adapted for mobile smartphones, tablets, laptops, and widescreen monitors.
- 🎨 **Modern Aesthetic**: Glassmorphism cards, glowing ambient gradients, subtle hover interactions, and clean typography.
- ⌨️ **Dynamic Hero Section**: Interactive typewriter effect highlighting technical roles and skills, accompanied by a mock terminal card.
- 📊 **Animated Metric Counters**: Smooth numbers count-up triggered on scroll.
- 🗂️ **Filterable Project Showcase**: Easily filter projects by category (*Full Stack*, *Frontend*, *Backend*) with interactive details modals.
- ⏳ **Experience & Education Timeline**: Visual chronological path displaying roles, achievements, and tech stacks.
- 📬 **Interactive Contact Form & Feedback**: Client-side form validation with animated toast notifications.

---

## 🚀 Getting Started

### 1. Direct Browser Opening
Simply double-click `index.html` in file explorer or open it in any modern web browser (Chrome, Edge, Firefox, Safari).

### 2. Run with Local Development Server (Optional)
If you have Python installed, you can start a local development server:

```powershell
python -m http.server 3000
```
Then visit `http://localhost:3000` in your web browser.

---

## 🛠️ Customization Guide

All sections are cleanly organized with clear comments:

1. **Personal Information & Bio**:
   - Open `index.html` and search for `Hi, I'm` or `About Me` to update your name, title, bio, and social media handles.
2. **Projects**:
   - In `index.html`, project cards are inside `<section id="projects">`.
   - In `script.js`, detailed project info for modal previews is configured in `projectDetails`.
3. **Skills**:
   - In `index.html`, update or add skill tags inside `<section id="skills">`.
4. **Theme Colors**:
   - In `style.css`, customize the CSS variables under `:root` and `[data-theme="light"]` (such as `--accent-primary` or `--accent-gradient`).

---

## 🌐 Free Hosting & Deployment

You can host this portfolio online for free in minutes:

- **GitHub Pages**:
  1. Create a repository on GitHub (e.g., `portfolio` or `<your-username>.github.io`).
  2. Push your files (`index.html`, `style.css`, `script.js`).
  3. Go to **Settings > Pages**, set Branch to `main`, and click **Save**.
- **Vercel / Netlify**:
  - Drag and drop this folder directly into the [Netlify Drop](https://app.netlify.com/drop) or import from GitHub on [Vercel](https://vercel.com).
