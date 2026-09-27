import { useCallback, useEffect } from 'react';
import { usePresentationStore } from '../store/presentationStore';

export const useSceneNavigation = () => {
  const next = useCallback(() => usePresentationStore.getState().nextScene(), []);
  const previous = useCallback(() => usePresentationStore.getState().previousScene(), []);
  const goTo = useCallback((index: number) => usePresentationStore.getState().goToScene(index), []);
  return { next, previous, goTo };
};

export function useKeyboardNavigation() {
  useEffect(() => {
    const store = usePresentationStore;
    const onKeyDown = (event: KeyboardEvent) => {
      const state = store.getState();
      if (event.key === 'Escape') {
        if (state.showSources || state.showAIUsage || state.showOverview || state.showPresenterInfo) {
          event.preventDefault();
          state.closePanels();
        } else if (document.fullscreenElement) {
          event.preventDefault();
          void document.exitFullscreen();
        }
        return;
      }

      const target = event.target;
      if (target instanceof HTMLElement && (target.isContentEditable || target.closest('button, a, summary, input, textarea, select, [role="button"], [role="slider"], [contenteditable="true"]'))) return;
      if (state.showSources || state.showAIUsage || state.showOverview) return;
      const key = event.key.toLowerCase();

      if (event.key === 'ArrowRight' || event.key === ' ') {
        event.preventDefault();
        store.getState().nextScene();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        store.getState().previousScene();
      } else if (key === 'f') {
        event.preventDefault();
        void toggleFullscreen();
      } else if (key === 's') {
        event.preventDefault();
        store.getState().toggleSources();
      } else if (key === 'a') {
        event.preventDefault();
        store.getState().toggleAIUsage();
      } else if (key === 'o') {
        event.preventDefault();
        store.getState().toggleOverview();
      } else if (key === 'h') {
        event.preventDefault();
        store.getState().toggleNavigation();
      } else if (key === 'p') {
        event.preventDefault();
        store.getState().togglePresenterInfo();
      }
    };

    const onFullscreenChange = () => store.getState().setFullscreen(Boolean(document.fullscreenElement));
    window.addEventListener('keydown', onKeyDown);
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('fullscreenchange', onFullscreenChange);
    };
  }, []);
}

export async function toggleFullscreen() {
  const root = document.documentElement;
  if (document.fullscreenElement) await document.exitFullscreen();
  else if (root.requestFullscreen) await root.requestFullscreen();
}
