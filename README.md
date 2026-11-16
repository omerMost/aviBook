# aviBook — אתר הספר "אחד זה אפס, שניים זה אחד"

React + Vite site for Avi Evan's book. Deployed on Vercel at https://aidenai.space

## Develop
```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
```

## Editing content
- All texts, timeline, book parts, questions and the sample-pages list are in `src/content.js`.
- Text in [square brackets] is a placeholder waiting for real content.
- Sample pages: put files in `public/assets/pages/` (PNG/JPG or PDF) and list them in `PAGES`, e.g. `'/assets/pages/1.pdf'`.
- Cover image: `public/assets/cover.png` (low-res capture — replace with the original).
- Accent colour: `--accent` in `src/index.css`.
- Remove the "draft" ribbon in `src/App.jsx` when the site is final.

Every push to `main` redeploys automatically on Vercel.
