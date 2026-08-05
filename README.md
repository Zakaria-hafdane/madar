# Madar — Agency Website

## Project structure

```
madar/
├── index.html          ← Home page
├── pages/
│   ├── work.html       ← Our work page
│   └── contact.html    ← Contact page
├── css/
│   ├── style.css       ← Main stylesheet (shared)
│   ├── work.css        ← Work page styles
│   └── contact.css     ← Contact page styles
├── js/
│   └── main.js         ← Scroll effects, nav, counters
└── assets/             ← Put your images/logo here
```

## How to run locally

Just open `index.html` in your browser — no build step needed.

For live reload in VS Code:
1. Install the **Live Server** extension
2. Right-click `index.html` → Open with Live Server

## What to customize

| What | Where |
|---|---|
| Agency name / logo | `index.html` → `.logo` section, all pages |
| Colors | `css/style.css` → `:root` variables |
| WhatsApp number | Search `212600000000` → replace with real number |
| Email | Search `hello@madar.ma` → replace |
| Work examples | `pages/work.html` → `.work-grid` section |
| Stats numbers | `index.html` → `data-target` attributes |
| Fonts | Already loaded from Google Fonts (Syne + DM Sans) |

## Add your logo

Put your logo image in `assets/logo.png` then replace the `.logo-mark` div in the nav with:

```html
<img src="assets/logo.png" alt="Madar" height="36" />
```

## Colors

| Variable | Value | Usage |
|---|---|---|
| `--y` | `#F5C842` | Main yellow accent |
| `--y2` | `#FFD96B` | Yellow hover state |
| `--dark` | `#090909` | Main background |
| `--dark2` | `#111111` | Card backgrounds |
| `--text` | `#F0F0F0` | Main text |
| `--muted` | `#888888` | Secondary text |

## Pages

- **Home** (`index.html`) — Hero, services, how it works, why us, stats, CTA
- **Our work** (`pages/work.html`) — Project showcase with honey, argan, rose examples
- **Contact** (`pages/contact.html`) — Contact form with product selector tags

## Notes

- Fully responsive (mobile + desktop)
- No frameworks, no npm — pure HTML/CSS/JS
- Fonts load from Google Fonts (needs internet)
- To use offline: download fonts and host locally
