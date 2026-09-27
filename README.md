# The Journey — 1911–1920

A full-screen Vietnamese presentation prototype about Nguyễn Ái Quốc's search for a path to national liberation. The experience is designed as a presenter-led sequence of 11 scenes; it has no autoplay, quiz, score, or backend.

## Run locally

Requirements: Node.js 20.19+ and npm.

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite. Press **Enter** to leave the calibration screen and begin. For the production build:

```powershell
npm run build
npm run preview
```

The production build creates a service worker and precaches the app shell, JavaScript, styles, icon, and local font files. Open the built app online once to cache it; after that, the presentation itself works offline. Source links need a connection when opened.

## Controls

| Key | Action |
| --- | --- |
| `Space` / `→` | Next scene or reveal the next presenter-controlled beat |
| `←` | Previous beat or scene |
| `F` | Toggle fullscreen |
| `S` | Open or close sources |
| `A` | Open or close AI usage appendix |
| `O` | Open the scene index |
| `P` | Show or hide rehearsal notes |
| `H` | Hide or show navigation UI |
| `T` | Start the 20-second reflection timer on Scene 10 |
| `Esc` | Close an open panel or leave fullscreen |

Click the left or right half of the stage to move backward or forward. Scene changes are always presenter-controlled.

## Update content

- **Narration and scene titles:** edit `src/data/scenes.ts`. Each scene's `durationSeconds` controls the target running time; the 11 scenes currently sum to 17:15.
- **Verified historical statements:** edit `src/data/historicalContent.ts`. Keep facts separate from scene layout and attach their `sourceIds`.
- **Sources:** edit `src/data/sources.ts`. Each source record contains its title, organization, year, URL, supported fact, and scene references. Source badges open the matching record in the drawer.
- **Scene layout and motion:** edit `src/scenes/SceneContent.tsx` for DOM typography and `src/three/WorldCanvas.tsx` for the persistent WebGL world, camera states, harbor, documents, and conceptual nodes.
- **Images and models:** bundled photographs, historical document scans, and illustrative GLB props live under `public/assets/`. Distinguish historical documents from illustrative assets in scene copy; record third-party credits and licenses in `src/data/sources.ts` and the in-app source and AI panels.
- **Timing:** edit scene durations in `src/data/scenes.ts`; edit internal presenter beats in `src/store/presentationStore.ts`.

## Content and media notes

The globe route is symbolic and does not claim to show a city-by-city itinerary. The 1911, 1919, July 1920, and Tours 1920 facts are linked in the Sources drawer. Scene 9 is labeled as the group's analytical synthesis. No historical quotation or AI-generated archival portrait is used. Before presenting, students should compare the final narration with their assigned course text and review the source list.

See [QA_REPORT.md](QA_REPORT.md) for the latest build, viewport, and interaction checks.
