# Lexora — 3D AI Legal Assistant

Lexora is a React and Vite front-end prototype for an AI legal-assistant experience. It combines an interactive WebGL courtroom instrument, scroll-driven legal storytelling, guided plan selection, and supplied legal imagery used as full-frame visual chapters.

## Run locally

Use Node.js 20 or later and pnpm 10 or later.

```bash
pnpm install
pnpm dev
```

The development server starts on the local URL printed by Vite. Build a production bundle with:

```bash
pnpm build
pnpm start
```

## GitHub repository setup

1. Extract the `lexora-3d-github-ready.zip` archive.
2. Create an empty repository on GitHub.
3. From the extracted `lexora-3d` folder, run:

```bash
git init
git add .
git commit -m "Initial Lexora 3D legal experience"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Replace the repository URL with your own GitHub repository address.

## Project structure

| Path | Purpose |
| --- | --- |
| `client/src/pages/Home.tsx` | Main Lexora experience, section content, plan guide, and scroll behavior. |
| `client/src/components/CourtroomScene.tsx` | WebGL judicial instrument table with gavel, scales, files, and accessible scene controls. |
| `client/src/index.css` | Juris Orbital visual system, responsive layouts, full-frame legal chapters, and animations. |
| `client/public/assets/` | Self-contained images required by the GitHub-ready version. |
| `server/index.ts` | Lightweight static server used by the production build. |

## Visual assets

The GitHub-ready archive includes all required image files in `client/public/assets/`. The source in that archive references local `/assets/...` paths rather than platform-hosted storage URLs, so the project can be run or deployed independently after installation.

## Notes

This is a front-end prototype. The chat, plan selection, and product actions are UI demonstrations and do not process payments, create accounts, or provide legal advice.
