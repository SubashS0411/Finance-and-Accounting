# Apex Financial — Premium Finance Website (RTL/LTR)

A modern, responsive finance/consulting website with **premium UI**, **animated interactions**, and **RTL/LTR direction support**. Includes marketing pages plus **Admin** and **Client** dashboards.

## Highlights

- **Premium UI polish**: glassy navbar, richer shadows, hover micro-interactions, smooth page-enter transitions
- **RTL/LTR toggle** (persists via `localStorage`) for multilingual layouts
- **Mobile-first navigation**: animated mobile drawer + dashboard sidebar with mobile overlay
- **Dashboards included**: Admin dashboard + Client portal dashboard
- **Zero build step**: pure HTML/CSS/JS (Tailwind via CDN)

## Pages

- `index.html` — Home (v1)
- `index2.html` — Home (v2)
- `services.html` — Services
- `pricing.html` — Pricing
- `about.html` — About
- `contact.html` — Contact
- `login.html` — Client login (routes to dashboard)
- `user-dashboard.html` — Client dashboard
- `admin-dashboard.html` — Admin dashboard
- `404.html` — Not found
- `coming-soon.html` — Coming soon

## Tech Stack

- **HTML + TailwindCSS (CDN)**
- **Custom CSS** for premium styling + transitions (`css/style.css`)
- **Vanilla JavaScript** (`js/main.js`, `js/rtl-toggle.js`)
- **Charts**: Chart.js (dashboard)
- **Icons**: Font Awesome + Phosphor Icons

## Key Features

### RTL/LTR Support
- Toggle direction using the globe icon.
- Direction persists between pages using `localStorage` key: `site-direction`.

### Mobile Menu & Dashboard Sidebar
- Main site uses a full-screen mobile drawer (`#mobile-menu`) with staggered link animation.
- Dashboards use a sliding sidebar and a mobile overlay (`#dashboard-overlay`) that fades in/out.

## Project Structure

```text
Finance/
  assets/
    favicon.svg
  css/
    style.css
  js/
    main.js
    rtl-toggle.js
  *.html
```

## Run Locally

### Option 1 — Open directly
Just open `index.html` in your browser.

### Option 2 — Use a local server (recommended)
Some browsers restrict certain behavior without a server. You can use any static server:

**Python**
```bash
python -m http.server 5500
```
Then open:

- http://localhost:5500/index.html

**Node (serve)**
```bash
npx serve .
```

## Deployment

This project is **static**, so you can deploy it anywhere.

### GitHub Pages
1. Push the project to a GitHub repository.
2. Go to **Settings → Pages**.
3. Select **Deploy from a branch**.
4. Choose **Branch: `main`** and **Folder: `/ (root)`**.
5. Save — your site will be live at the Pages URL.

### Netlify
- Drag and drop the `Finance/` folder into Netlify, or connect your repo.

### Vercel
- Import the GitHub repo.
- Framework preset: **Other**.
- Output: **root**.

## Customize Branding

- Colors: update CSS variables in `css/style.css` under `:root` (e.g. `--apex-brand`, `--apex-accent`).
- Favicon: replace `assets/favicon.svg`.
- Typography: Google Fonts are loaded in each page `<head>`.

## Notes

- This is a front-end UI project (no backend/auth). Login routes directly to dashboards.
- For best results, test in both **LTR** and **RTL** and at mobile widths before shipping.

---

If you want, I can also add:
- Open Graph meta tags (better social previews)
- `sitemap.xml` + `robots.txt`
- A lightweight scroll-reveal animation system for sections
