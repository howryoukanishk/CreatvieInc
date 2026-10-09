# Vāyas Life — From Insight to Impact

Interactive case study website. Next.js (App Router) + TypeScript + Tailwind CSS, deployable on Vercel as-is.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Where things live

| Path | What |
| --- | --- |
| `content/research.ts` | 5 static + 5 video competitor analyses, scores, Meta Ad Library sources |
| `content/site.ts` | Brief, insight, concepts, films |
| `components/` | Nav, scroll progress, ad cards + lightbox, video-ad accordion, concept cards, film player |
| `public/research/static/` | Original static ad screenshots |
| `public/research/video/` | Video-ad poster frames / clips (pending) |
| `public/films/` | The three concept films, posters, captions (pending) |

## Adding pending assets

Any content field set to `null` renders as a yellow **Pending** slot. To fill one, add the file under
`public/` and replace the `null` in `content/`:

- **Video-ad posters** — `videoAds[n].media = { poster: "/research/video/<slug>.jpg", alt: "…" }`
- **Films** — `films[n].video = { src: "/films/<slug>.mp4", poster: "/films/<slug>-poster.jpg", captions: "/films/<slug>.vtt", aspect: "9/16" }`
  and `films[n].breakdown = "…"`
- **Concept details** — `audience`, `insight`, `hook`, `narrative`, `rationale` on each concept
- **Bonus film beats** — `concepts[3].bonus.beats` (stills in `public/films/more-moments/`)
- **Brief** — `brief.assignments` and `brief.interpretation`

Video files over ~100 MB should be hosted externally (Vercel Blob, Mux, Cloudinary) and referenced by URL.
