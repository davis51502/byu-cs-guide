# BYU CS Guide

Website link

- Live site (GitHub Pages): https://davis51502.github.io/byu-cs-guide/

What’s inside

- Card-sort-informed information architecture: Plan My Degree, Register, Courses, Help & Advising, Policies & Forms, Opportunities, Resources, People.
- Courses organized by requirement groups with search and expandable details.
- Visual design emphasizing figure/group separation and grouping by proximity.

Run locally

```bash
npm install
npm run dev
```

Deploy to GitHub Pages

1) Ensure `base` is set in `vite.config.js` to `/byu-cs-guide/` (it is).
2) Push to GitHub once, then run:

```bash
npm run deploy
```

This publishes the `dist/` build to the `gh-pages` branch. In your repo settings, set GitHub Pages to deploy from the `gh-pages` branch. Your site will be available at the link above.

Report

- See the 1-page writeup that maps card sorting results to the website structure in docs/site-organization-report.md.
