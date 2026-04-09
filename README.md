# ⚡ FIT Training Center — Premium Fitness Studio Website

> A modern, high-performance demo website for a premium fitness studio — built as a portfolio reference project showcasing advanced frontend development skills.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Responsive](https://img.shields.io/badge/Responsive-320px_to_4K-aefe02?style=flat)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

---

## 📸 Preview

| Home                       | Courses           | Membership    |
| -------------------------- | ----------------- | ------------- |
| Hero Section with Parallax | Filter & Schedule | Pricing Cards |

---

## 🚀 Features

- **10 fully responsive pages** — Home, About, Courses, Membership, Team, Contact, Booking, Impressum, Datenschutz, AGB
- **3-step booking flow** — interactive course booking with live summary sidebar
- **Course filter system** — filter by category with smooth transitions
- **Weekly schedule** — 7-day tab system with live booking status
- **Membership pricing** — monthly/annual billing toggle with savings calculator
- **FAQ accordion** — smooth animated expand/collapse
- **Cookie banner** — GDPR-compliant with localStorage persistence
- **Scroll animations** — intersection observer-based reveal effects
- **Parallax hero images** — subtle depth on scroll
- **Counter animations** — number counting on scroll into view
- **Cursor glow effect** — subtle neon accent on desktop
- **Scroll progress bar** — fixed top indicator
- **Open Graph meta tags** — optimized social media sharing
- **PWA-ready** — web manifest and all favicon sizes included

---

## 🎨 Design System

### Color Palette

| Token              | Hex       | Usage                          |
| ------------------ | --------- | ------------------------------ |
| `--clr-accent`     | `#AEFE02` | Primary CTA, highlights, icons |
| `--clr-red`        | `#FF5757` | Badges, secondary accents      |
| `--clr-bg`         | `#0A0A0A` | Main background                |
| `--clr-bg-card`    | `#141414` | Card backgrounds               |
| `--clr-white`      | `#FFFFFF` | Primary text                   |
| `--clr-text-muted` | `#8A8A8A` | Secondary text                 |

### Typography

| Role      | Font               | Usage                      |
| --------- | ------------------ | -------------------------- |
| Display   | `Bebas Neue`       | Headlines, hero titles     |
| Body      | `Barlow`           | Body text, descriptions    |
| Condensed | `Barlow Condensed` | Labels, navigation, badges |

---

## 📁 Project Structure

```
fit-training-center/
│
├── assets/                  # Images & SVG logo
│   ├── logo.svg
│   ├── favicon.svg
│   └── *.jpg
│
├── css/
│   ├── basic.css            # Global design system
│   ├── index.css            # Home page styles
│   ├── about.css            # About page styles
│   ├── courses.css          # Courses page styles
│   ├── membership.css       # Membership page styles
│   ├── team.css             # Team page styles
│   ├── contact.css          # Contact page styles
│   ├── booking.css          # Booking flow styles
│   └── legal.css            # Legal pages styles
│
├── js/
│   └── main.js              # All interactions & animations
│
├── index.html               # Home
├── about.html               # About Us
├── courses.html             # Courses & Schedule
├── membership.html          # Membership & Pricing
├── team.html                # Our Team
├── contact.html             # Contact & Location
├── booking.html             # Booking Flow
├── impressum.html           # Legal Notice
├── datenschutz.html         # Privacy Policy
└── agb.html                 # Terms & Conditions
```

---

## 📱 Responsive Breakpoints

| Breakpoint       | Target Device        |
| ---------------- | -------------------- |
| `320px`          | Smallest smartphones |
| `430px`          | iPhone 17 Pro Max    |
| `480px`          | Small smartphones    |
| `768px – 1024px` | iPad / Tablet        |
| `1280px`         | Standard desktop     |
| `1440px`         | Large desktop        |
| `1920px`         | Full HD / iMac       |
| `2560px`         | 2K displays          |
| `3840px`         | 4K / 45" displays    |

---

## 🛠️ Tech Stack

| Technology             | Purpose                                      |
| ---------------------- | -------------------------------------------- |
| **HTML5**              | Semantic markup                              |
| **CSS3**               | Custom properties, Grid, Flexbox, Animations |
| **Vanilla JavaScript** | Interactions, scroll effects, booking flow   |
| **Font Awesome 6.5**   | Icons                                        |
| **Google Fonts**       | Bebas Neue, Barlow, Barlow Condensed         |

> No frameworks. No build tools. No dependencies. Pure portable code.

---

## ⚙️ JavaScript Modules

All JavaScript is centralized in `main.js` and includes:

- Scroll progress bar
- Navbar scroll effect (glassmorphism on scroll)
- Active nav link detection
- Hamburger menu (mobile)
- Intersection Observer reveal animations
- Counter animations
- Parallax effects
- Smooth anchor scrolling
- Cursor glow (desktop only)
- Lazy image loading
- Tab component (schedule)
- FAQ accordion
- Course filter
- Billing toggle (monthly/annual)
- Contact form submission
- Cookie banner (localStorage)
- 3-step booking flow with calendar

---

## 🚦 Getting Started

No installation required. Simply open in your browser:

```bash
# Clone the repository
git clone https://github.com/yourusername/fit-training-center.git

# Open in browser
open index.html

# Or use a local server (recommended)
npx serve .
```

> **Note:** For best results, use a local server to avoid CORS issues with assets.

---

## 📋 Pages Overview

| Page               | Description                                                      |
| ------------------ | ---------------------------------------------------------------- |
| `index.html`       | Hero, intro, features, courses preview, stats, membership teaser |
| `about.html`       | Mission, timeline, philosophy                                    |
| `courses.html`     | Course cards with filter, 7-day schedule with booking            |
| `membership.html`  | Pricing cards, comparison table, FAQ, guarantees                 |
| `team.html`        | Trainer profiles with hover overlays, featured trainer           |
| `contact.html`     | Contact form with topic selector, opening hours, map             |
| `booking.html`     | 3-step booking: course → date/trainer → personal data            |
| `impressum.html`   | Legal notice (§ 5 TMG)                                           |
| `datenschutz.html` | GDPR-compliant privacy policy                                    |
| `agb.html`         | Terms & conditions (9 sections)                                  |

---

## 🖼️ Image Credits

All images sourced from [Pexels.com](https://www.pexels.com) under the Pexels License.

---

## 📄 License

This project is licensed under the MIT License — feel free to use it as a reference or starting point for your own projects.

---

## 👨‍💻 Developer

Portfolio reference project demonstrating:

- Advanced CSS architecture with custom design systems
- Vanilla JavaScript interaction patterns
- Responsive design from 320px to 4K
- GDPR-compliant frontend implementation
- Professional UX patterns for fitness industry websites

---

<div align="center">

<img src="/assets/websylon.png" alt="WEBSYLON" width="200" />

**WEBSYLON** — Professional Web Development & Digital Solutions

_Frankfurt am Main, Germany_

</div>

---

<div align="center">
  <sub>© 2026 WEBSYLON. All rights reserved.</sub>
</div>

_FIT Training Center is a demo project and not a real business._
