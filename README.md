# LGCC Student Handbook

A student-facing reference archive, learning handbook, and engineering support system for the **TTPR program at LaGuardia Community College**.

Built with [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com), and [MDX](https://mdxjs.com). Hosted on GitHub Pages.

---

## What's in this handbook

| Section | Description |
|---|---|
| **Get Started** | GitHub account, SSH keys, profile README, first-day checklist |
| **Syllabus** | Course overview, learning outcomes, attendance, communication |
| **Modules** | Ordered curriculum (14 modules) with concepts, examples, and checklists |
| **Morning Exercises** | Archive of daily warm-up prompts with hints and reflection questions |
| **Assignments** | All assignment requirements, submission steps, and common issues |
| **Git & GitHub** | Command reference, branching, pull requests, merge conflicts, cheat sheet |
| **Debugging** | How to read errors, use console.log, and debug HTML/CSS/JS/React/APIs |
| **Code Improvement** | Naming, DRY, helper functions, refactoring, and how to explain changes |
| **Responsible AI Use** | How to use AI tools effectively without undermining your own learning |
| **Algorithms Corner** | Big O, arrays/objects, recursion, sorting — beginner-friendly |
| **Resources** | Curated external tools, docs, practice platforms, and interview prep |
| **FAQ** | Common questions answered — setup, GitHub, getting unstuck, asking for help |

---

## Project structure

```
src/
├── app/
│   ├── page.mdx
│   ├── get-started/page.mdx
│   ├── syllabus/page.mdx
│   ├── modules/
│   │   ├── page.mdx
│   │   └── 01-setup/page.mdx
│   ├── exercises/page.mdx
│   ├── assignments/page.mdx
│   ├── references/
│   │   ├── git/page.mdx
│   │   ├── debugging/page.mdx
│   │   ├── code-improvement/page.mdx
│   │   └── ai-use/page.mdx
│   ├── algorithms/page.mdx
│   ├── resources/page.mdx
│   └── faq/page.mdx
├── components/
│   ├── Navigation.jsx
│   ├── Guides.jsx
│   ├── Resources.jsx
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── Logo.jsx
│   └── ...
├── mdx/
└── styles/
    └── tailwind.css
```

---

## Getting started (development)

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Adding content

**Add a new page:**

1. Create a folder under `src/app/` and add a `page.mdx` file inside it
2. Add the page to `src/components/Navigation.jsx` in the appropriate group

**Add a new module:**

1. Create `src/app/modules/NN-topic-name/page.mdx`
2. Follow the module template (Overview → Why → Goals → Vocabulary → Core Concepts → Examples → Mistakes → Debugging → Recap)
3. Add a card to `src/app/modules/page.mdx`

**Add a morning exercise:**

1. Create `src/app/exercises/exercise-NN/page.mdx`
2. Follow the exercise template (Title → Date → Target skill → Prompt → Hints → Approach → Mistakes → Stretch → Reflection)
3. Add a row to the table in `src/app/exercises/page.mdx`

---

## Search

Full-text search is built in and powered by [FlexSearch](https://github.com/nextapps-de/flexsearch). It indexes all MDX pages automatically at build time. Use `⌘K` or `Ctrl+K` to open the search dialog.

---

## Tech stack

- [Next.js 16](https://nextjs.org) — App Router, MDX pages
- [Tailwind CSS 4](https://tailwindcss.com) — Styling
- [MDX](https://mdxjs.com) — Markdown + React components
- [FlexSearch](https://github.com/nextapps-de/flexsearch) — In-browser full-text search
- [Framer Motion](https://www.framer.com/motion) — Animations
- [Headless UI](https://headlessui.dev) — Accessible UI primitives
- [Shiki](https://shiki.matsu.io) — Syntax highlighting
