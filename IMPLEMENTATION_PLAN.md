# Ke hoach refactor thuyet trinh lich su

Owner: Codex (planning/review). Implementer: GPT-6 Luna, reasoning max.
Date: 2026-09-27. Workspace: D:/HCM_01_26.

## 1. Authority and scope

- Authoritative narrative: C:/Users/LENOVO/.codex/attachments/6a3f7c18-18b6-4f6d-9a5c-2f3c30e2cb16/Pasted text.txt. Read the entire UTF-8 attachment before implementation.
- Deliver a working refactor, not another plan. Vietnamese copy with correct diacritics is required in the product.
- Preserve existing archival Vietnamese historical art direction: paper texture, restrained red ribbon, antique gold, historical imagery, Noto Serif + Be Vietnam Pro, cinematic full-bleed Three.js artifacts.
- Replace the current biography/human-rights/1945 framing with the supplied thesis about patriotism, practical inquiry, theoretical choice and political action. Do not drift into a full biography.
- Exactly 11 main slides. Sources, AI disclosure, presenter notes and Q&A are supporting panels, not extra timed slides. Do not invent course LO codes or rubric details missing from the attachment.
- Preserve existing user edits: dirty files at handoff are public/assets/SOURCES.md, src/styles/global.css, src/three/ImportedArtifact.tsx, src/three/WorldCanvas.tsx; untracked printing-press.glb and typewriter.glb. No reset, deletion of these assets, commit or push.

## 2. Evidence and problems

- Live baseline: http://127.0.0.1:5173. Baseline screenshots: baseline-opening.png, baseline-slide.png (1440x900).
- Source has 11 scenes, but redundant opening/question scenes displace the required post-1920 and contemporary application sections.
- Current ending and ribbon use 1945, inconsistent with the new supplied argument and time scope.
- Synthesis currently says a transition from feudal/bourgeois ideology; replace this overstatement with the attachment's careful argument: patriotism persists, political understanding becomes more systematic.
- Baseline screenshot shows extremely small crowded bottom navigation labels, duplicated numbering, oversized multi-line uppercase headings and decoration competing with reading space.
- Existing timer blocks nextScene in reflection until countdown finishes. No interaction or timer may trap presenter navigation.
- Keep WorldCanvas mounted outside SceneManager; CameraRig remains the only camera owner. Existing scene-index-based camera/object arrays must be remapped together when ordering changes. Prefer scene IDs for stable mappings.

## 3. Content map (1040 seconds = 17:20)

Arithmetic correction: the attachment labels its total 17:50, but its individual durations sum to 17:20. Preserve those durations and derive totals from data; do not copy the erroneous total.

| # | ID (suggested) | Seconds | Visible content | Visual and interaction | Speaker notes |
|---|---|---:|---|---|---|
| 1 | opening | 80 | Tu chu nghia yeu nuoc den chu nghia Mac - Lenin; central question whether patriotism alone supplies a path | Globe/portrait; three-choice opening question A Asian support, B reform/education, C study the West. No historical right/wrong answer claimed | Intro and thesis from attachment; 15-20s class participation included |
| 2 | crossroads | 90 | Historical crisis of direction; patriotism defines the goal, not automatically forces/method/organization | Three unframed paths: feudal, bourgeois-democratic, search; three concise analytical questions | Respect predecessors, avoid caricature or conflating their strategies |
| 3 | departure | 90 | 5/6/1911; Sai Gon to the West; inquiry rather than a ready-made answer | Existing harbor image/map with new compass or suitcase; label illustrative prop | Departure on Amiral Latouche-Treville; practical comparison method |
| 4 | world-journey | 80 | Vietnam's problem broadens to colonial peoples and labor | Globe plus sparse observation points, not a long travel itinerary | Observations prepared receptiveness to theory; avoid invented exact routes |
| 5 | paris-1919 | 90 | 18/6/1919; eight demands; freedom, democracy, legal equality, representation | Actual petition image and typewriter with separate non-overlapping zones | Public political activity; not a claim the petition demanded immediate independence |
| 6 | theses-1920 | 140 | July 1920; Lenin's theses; oppressed nations, revolutionary movement, international solidarity | Main climax: paper/document and new book artifact; reveal 3 concepts; question A western economics B colonial peoples and liberation forces C waiting for great powers. Reveal B only on explicit action | Distinguish publication 16-17 July from date of reading; patriotism supplies motivation, theory supplies chosen framework |
| 7 | tours-1920 | 90 | December 1920, Tours; understanding to choice to action | Existing congress photo; restrained artifact only if room | Vote for Communist International, formation of French Communist Party; qualitative turning point, not end of intellectual development |
| 8 | synthesis | 120 | Four-row before/after comparison + central interpretation | Unframed accessible comparison table; six-step process revealed without crowding | Patriotism continues; theory/practice relationship; clearly mark group interpretation |
| 9 | after-1920 | 80 | 1920 > 1921-1929 > 1930; choice > dissemination/preparation > party founding | Printing press, short timeline; no 1945 detour | Distinguish finding the path from preparing/organizing it |
| 10 | application | 110 | 1911-1920 to today; integration is not passive reception; inquire/select/verify/apply | Clean 2025 trade comparison 475.04 exports + 455.01 imports = 930.05 billion USD; compact contextual source | Contemporary statistics illustrate present context, never prove 1920 history; student source/AI verification example |
| 11 | conclusion | 70 | Patriotism (motivation), practical inquiry (method), Marxism-Leninism (chosen theory), revolutionary action | One clear concluding composition, lotus allowed, not a new topic | Concise supplied conclusion; return to opening question |

Use the attachment's full speaking passages as presenter notes, with transitions and four Q&A answers. Do not put scripts on slides. Aim 35-65 main words per ordinary slide, max ~90 for comparison; exclude source labels and notes. Main slides must contain analysis, not only labels.

## 4. Visual specification

### Retain and refine

- Retain current art, but keep all low-contrast imagery behind negative space, not behind dense text. Full-bleed background/3D, no framed 3D card.
- Palette based on existing direction: paper #F5ECE0, ink #302D29, red #9E2026, antique gold #B4862F, muted jade #617A68, paper-white #FFFCF5. Red/jade/ink support contrast so the experience is not a flat beige wash. Gold is decoration, not small body text.
- Noto Serif for display/quotes, Be Vietnam Pro for body/navigation; local font assets retained. Sentence case rather than all-uppercase paragraphs. Letter spacing 0. No viewport-unit font sizing.
- Desktop heading 40-48px (opening can be 52px), body 20-23px for projection, supporting/source 13-15px. Short screens may use heading 32-38px/body 18px at explicit breakpoints. Mobile heading 28-32px/body 16-18px.
- Use 8px spacing scale, 24-40px between major groups; maximum 65-75 characters per text line.

### Stage geometry

- Top chrome ~56px, bottom navigation ~72-88px on desktop; reserve both in the content grid. A small red ribbon remains visual identity but must not consume 20% of the viewport.
- Centered content stage width up to ~1320px; side padding 32-64px desktop, 20px mobile. Remove decorative duplicate scene number/time stamps.
- Artifact slides: ~55% content / 45% clear visual space within a full-bleed stage; this is a presentation composition, not a pair of cards. Artifact bounds must not intersect copy. Content-rich analysis slides occupy full stage width with decoration suppressed.
- Opening and closing: a deliberate single composition with title, question/answer and artifact; no separate marketing landing screen duplicating slide 1. A start action may simply activate presentation controls.
- On narrow or short viewports let main content scroll vertically while navigation remains reachable. Never clip critical text using overflow hidden. Avoid root min-height forcing content below mobile screen.
- Mobile portrait: textual content first; artifact in reserved vertical space, smaller decorations, compact progress and prev/next controls. Do not let 3D gestures capture page scroll outside the artifact area.

### Controls and behavior

- Add/use lucide-react for standard control icons (prev/next, overview, sources, presenter, fullscreen, reduced motion, close). Accessible Vietnamese names and hover/focus tooltips. Minimum touch targets 44px.
- One progress indicator, one scene count. Overview shows all 11 titles and correct timing; timeline destinations driven by scene metadata, not obsolete 1945 mappings.
- Local audience selections only: never fabricate vote totals or imply network polling. Selection state is visible, keyboard-accessible, and resettable. Opening is discussion; Lenin question reveals answer and rationale explicitly.
- Preserve keyboard navigation without stealing arrows/space from controls/inputs. Escape closes panels, focus returns to trigger; panel focus must be usable and ideally trapped for dialogs.
- Presenter panel includes timing, full notes, transition, Q&A access. Sources panel links precise references; AI panel records actual drafting/coding/model use without claiming human checks occurred.
- Respect prefers-reduced-motion for camera, animation and artifacts; no continuous rotations under reduced motion. Keep deliberate mild motion otherwise and support reset/rotate interactions if retained.

## 5. Internet models and source verification

Main agent checked 3DAssets.dev API and found candidates. Worker must read chosen individual metadata/license and visually inspect before adoption. Add at least 3 suitable additional GLBs where possible, not just downloaded files. Existing globe/typewriter/press/lotus remain available. Avoid pirate/sci-fi vessels as substitutes for the historical steamship.

Candidates (all API search results report CC0; confirm detail metadata):
- Magnetic Compass Box: https://3dassets.dev/assets/castaway-island-escape-magnetic-compass-box-8aae90ac ; GLB https://cdn.3dassets.dev/assets/28067/v1/model.glb (25,760 bytes).
- Suitcase: https://3dassets.dev/assets/mountain-border-checkpoint-mountain-border-checkpoint--db0726c2 ; GLB https://cdn.3dassets.dev/assets/30311/v1/model.glb (43,704 bytes).
- Book: https://3dassets.dev/assets/scavengers-loot-library-book-0d5ec5c7 ; GLB https://cdn.3dassets.dev/assets/2657/v1/model.glb (17,248 bytes).
- Finished Clasp Book optional alternative: https://3dassets.dev/assets/bookbinding-and-paper-mill-finished-clasp-book-8b54d3c8 ; GLB https://cdn.3dassets.dev/assets/30586/v1/model.glb (91,356 bytes).
- Ship's Wheel optional illustrative departure prop: https://3dassets.dev/assets/pirate-port-and-tall-ships-ships-wheel-3a6878c2 ; GLB https://cdn.3dassets.dev/assets/30154/v1/model.glb (80,180 bytes).

Download chosen binary assets locally, verify GLB magic/header and inspect rendered framing. Record local file, creator, source page, exact license, modifications, illustrative-not-authentic status and reported AI origin in public/assets/SOURCES.md and relevant in-app credits. No login/payment or new MCP installation. Do not call an asset authentic or from 1911 without evidence.

Load with Suspense/error boundaries so model failure cannot erase slide text. Clone cached GLTF scene/materials before modifying; avoid mutating shared cache. Size by bounding box; tune camera/object per scene ID and aspect ratio. Limit device pixel ratio, avoid all-model eager loading if unnecessary. Additional assets should remain below ~3MB total where practical.

## 6. Historical and current sources

- Attachment's :chatgpt-content-reference markers are NOT citations and must not ship. Replace with real source URLs.
- Verify historical points using existing exact source links and authoritative Ho Chi Minh Museum, hochiminh.vn, official Party documents and the retrospective essay Con duong dan toi den chu nghia Lenin. Separate direct quotation, factual account and group interpretation.
- Verified current source: https://www.nso.gov.vn/du-lieu-va-so-lieu-thong-ke/2026/01/bao-cao-tinh-hinh-kinh-te-xa-hoi-quy-iv-va-nam-2025/
- Also https://www.nso.gov.vn/bai-top/2026/01/mot-so-net-chinh-tinh-hinh-kinh-te-xa-hoi-quy-iv-va-nam-2025/ explicitly reports 930.05 total, 475.04 export, 455.01 import (billion USD, estimated 2025).
- 77.3% FDI export share from attachment must be independently checked before including; omit if unverifiable. No invented rubric score claims, human-review attestations or LO codes.

## 7. Implementation order and file ownership

One Luna worker owns implementation to avoid CSS/store conflicts. It may use tools but no additional agents are needed.
1. Read attachment and applicable skills/AGENTS, inspect specific remaining source through CodeGraph. Capture additional broken baseline cases if useful.
2. Update src/data/scenes.ts, types, source metadata and speaker notes with 11-slide map/timing.
3. Refactor SceneContent into manageable scene views if warranted; share only actual repeated structures. Remove obsolete central-question/reflection routes or repurpose without dead controls.
4. Refactor chrome/art layout in src/app/Presentation.tsx, src/components and src/styles/global.css. Consolidate conflicting legacy CSS instead of appending endless overrides. Keep existing user asset fixes.
5. Update presentationStore beat limits, polls and navigation; remove timer trap; update timeline/overview/fullscreen/panels consistently.
6. Integrate chosen GLBs in ImportedArtifact/WorldCanvas with responsive object placement and source documentation.
7. Verify types/build, browser controls, content and screenshots. Fix findings before handoff.
8. Update README with actual local run commands and write QA_REPORT.md with honest outcomes and screenshot paths.

## 8. Acceptance / QA gates

- npm run build succeeds. No invented lint/test script. Add focused repeatable tests if useful; do not require an unrelated framework migration.
- Exactly 11 slides, total 1040 seconds, no broken source IDs or stale 1945 headline/ribbon; all attachment sections represented.
- Playwright screenshots of every slide at 1440x900 and 390x844, plus key dense slides at 1366x768, 768x1024 and 1920x1080. Verify actual innerWidth/innerHeight in report.
- Inspect screenshots visually, not just capture them. Measure text/control boxes: no horizontal overflow, no clipped visible text, no sibling overlaps, no toolbar/content collisions. Intentional background decoration overlap excluded.
- Test each beat, forward/back, overview jump, source link/panel, AI panel, presenter, polls select/reveal/reset, reduced motion, fullscreen where supported, and rapid navigation. Timer cannot block progression.
- Capture console errors and failed asset requests (zero expected). Verify each new GLB is requested successfully and visible on intended slide.
- Canvas pixel checks: nonblank rendered model pixels, artifact remains in reserved bounds, before/after interaction frames differ normally and remain stable under reduced motion. Screenshot inspection must confirm actual objects, not only texture/background.
- Keep dev server running and return actual reachable URL. Existing server started by main agent is PID 17844 on 127.0.0.1:5173; check it remains alive rather than starting duplicate.
- Known Playwright runtime available at C:/Users/LENOVO/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs, browser channel msedge works headless. Do not assume global playwright dependency. Baseline script ran with node --input-type=module importing that path.

## 9. Review checkpoint

Worker reports changed files, assets and licenses, build results, screenshot/interaction results, URL and unresolved risks. Main Codex reviews the diff and representative screenshots, runs an independent build/check, and requests corrections if acceptance gates fail. Do not declare completion from build alone.
