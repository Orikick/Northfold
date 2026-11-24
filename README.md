# Northfold

Designed and developed by Orest Labiak.

**Live demo:** _link coming soon_ <!-- replace with the Vercel or Netlify URL -->

<!-- Screenshots: save them to the docs/ folder with these names, then delete this comment's first and last lines.
![Desktop view](docs/screenshot-desktop.png)
![Mobile view](docs/screenshot-mobile.png)
-->

A one-page site for Northfold, a fictional brand and digital design studio in Copenhagen. The brand, copy, clients, projects and team are invented for this demo; photos come from Unsplash.

The page has six sections (hero, selected projects, services, numbers, team and contact) plus a client marquee, and is built around scroll-driven motion that scales down on small screens and switches off for visitors who prefer reduced motion.

## Stack

- [Vite](https://vite.dev/) + [React 19](https://react.dev/) (JavaScript)
- [React Router](https://reactrouter.com/) for the home route and the 404 page
- SCSS modules, with design tokens as CSS custom properties
- [GSAP](https://gsap.com/) with ScrollTrigger, SplitText and `@gsap/react`
- [Lenis](https://lenis.darkroom.engineering/) for smooth scrolling
- Syne (headlines and UI) and Manrope (text), self-hosted through Fontsource

## How to run

Requires Node.js 20.19 or newer.

```bash
npm install
npm run dev      # development server at http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the production build locally
```

To preview the data states, add a query parameter to the URL:

| URL | What it shows |
| --- | --- |
| `/?demo=loading` | Skeleton placeholders for projects and team |
| `/?demo=empty` | Empty states |
| `/?demo=error` | Error states with a retry button, and a failed form submission |

## Features

**Motion**

- Smooth scrolling with Lenis, driven by the GSAP ticker so it stays in step with ScrollTrigger
- Hero headline revealed line by line with SplitText; lines are re-split on resize and after fonts load
- Selected projects pin under the header and scroll horizontally, with a progress bar
- Counters run once when they scroll into view
- Parallax on the hero and team photos
- Infinite client marquee in CSS, with a pause button and pause on hover
- Project cards lift off a coloured block, zoom the photo and draw a title underline on hover
- Every animation uses only `transform` and `opacity`

**Motion levels**

| Visitor | What runs |
| --- | --- |
| Desktop (1024px and up) | Everything |
| Phones and tablets | Headline reveal, counters and marquee. No Lenis, pinning or parallax; projects become a native swipeable row |
| `prefers-reduced-motion` | Nothing moves. Static headline, final counter values, a wrapped client list, native scrolling |

The two media queries that control this are in `src/lib/motion.js`, mirrored by the `full-motion` mixin in `src/styles/_mixins.scss`.

**Accessibility**

- Semantic landmarks, one `h1`, ordered headings and labelled sections
- Skip link, visible focus rings on every background, 44px minimum touch targets
- Mobile menu with `aria-expanded`, Escape to close and focus returned to the toggle
- In-page links move keyboard focus to the target section
- Form fields with real labels, inline errors linked by `aria-describedby`, and focus sent to the first invalid field
- Screen readers get final counter values and the original headline text, not the animated fragments
- Text and controls meet WCAG AA contrast

**Data states**

- Projects and team load asynchronously through `useAsyncData`, with skeleton, empty and error (retry) states
- Photos keep their space while loading and fall back to a neutral placeholder if they fail
- The contact form validates on submit and has sending, success and error states

**Performance**

- Fixed aspect-ratio frames for every image, so the layout does not shift
- Responsive `srcset` images from the Unsplash CDN, lazy-loaded below the fold; the hero image loads with high priority
- Self-hosted variable fonts
- Project and team data and the 404 page are split into separate chunks

## Project structure

```
src/
├─ main.jsx, App.jsx        entry point and routes
├─ pages/                   Home, NotFound
├─ components/
│  ├─ layout/               Header, Footer, SkipLink, SmoothScroll
│  ├─ sections/             Hero, Projects, Clients, Services, Numbers, Team, Contact
│  └─ ui/                   Button, AnchorLink, Logo, SectionHeading, Photo, ParallaxImage,
│                           SplitLines, Marquee, Counter, ProjectCard, TeamCard, ServiceItem,
│                           FormField, Skeleton, StatusMessage
├─ hooks/                   useAsyncData, useMediaQuery, useReducedMotion, useLenis, useScrollTo
├─ data/                    content (JSON and JS) and api.js, the data access layer
├─ lib/                     GSAP setup, motion queries, Unsplash URL helper, class-name helper
└─ styles/                  tokens, reset, mixins, global styles
```

## Notes

- The contact form does not send anything. `submitEnquiry` in `src/data/api.js` simulates a request; replace it with a call to your own endpoint.
- Content is loaded from local JSON through `src/data/api.js`. To use a real API, change the loader functions there; the components already handle every state.
- The email address uses the reserved `.example` domain so it cannot reach a real mailbox.

## Code quality

```bash
npm run lint          # check the code with ESLint
npm run lint:fix      # fix what ESLint can fix automatically
npm run format        # format every file with Prettier
npm run format:check  # check formatting without changing files
```

ESLint uses the recommended JavaScript rules plus the React Hooks rules (`eslint.config.js`).
Prettier settings are in `.prettierrc.json`.
