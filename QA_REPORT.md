# QA Report

Date: 2026-09-27

## Build

- `npm.cmd run build` passes with TypeScript and Vite.
- Vite still reports the existing circular `three-effects` / `three-react` chunk warning and a chunk above 500 KB.

## Viewport Checks

- Desktop: 1440x900. Artifact slots remain visible and clipped to their scene regions; departure props have separate slots, the Paris petition is paired with the typewriter, and the thesis book fits its slot. The source action remains in view.
- Mobile: 390x844. Departure compass and ship wheel occupy separate 174x135 slots. Paris keeps its petition and typewriter side by side. The thesis book stays below its reserved caption area and above the slot edge. No document overflow was measured at either viewport.
- Mobile synthesis uses an inner scene scroller; its lower takeaway and source action were reachable in `final-mobile-scroll.png`.
- Final browser captures are saved as `final-1440-0.png` through `final-1440-10.png` and `final-390-0.png` through `final-390-10.png`.

## Interaction and Accessibility

- Independent desktop opening canvas pixel check: nonblank (over 8,000 sampled dark pixels); successive frame hashes changed with normal motion and stayed identical after reduced motion was enabled.
- Browser console error log is empty.
- Hiding navigation sets `aria-hidden` and `inert` on the header and footer. Keyboard Tab skips their offscreen controls; the separate restore control returns both containers to the active state.
- The main agent independently verified Escape dismissal for all four panels, navigation restore, the opening poll select/reset flow, and the staged Scene 6 poll reveal.

## Notes

- Final screenshot matrix covers 1440x900 and 390x844. The full planned 768x1024 and 1920x1080 matrix was not completed; earlier 1366x768 checks preceded the final fit patch.
- The production build verifies generated PWA assets; offline service-worker runtime was not re-tested in this pass.
- The artifact fit uses a 48px caption reservation and a conservative transformed-box sweep bound with a 0.65 scale margin to keep rotating models inside their slots.
- Asset credits and license notes for third-party 3D models and reference images are recorded in the source data and attribution panels.
