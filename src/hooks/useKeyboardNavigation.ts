import { useCallback, useEffect } from 'react';
import { usePresentationStore } from '../store/presentationStore';

const runSceneAction = (action: () => void) => {
  const state = usePresentationStore.getState();
  if (!state.started || state.isTransitioning) return;
  state.setTransitioning(true);
  action();
  window.setTimeout(() => usePresentationStore.getState().setTransitioning(false), state.reducedMotion ? 180 : 1050);
};

export const useSceneNavigation = () => {
  const next = useCallback(() => runSceneAction(() => usePresentationStore.getState().nextScene()), []);
  const previous = useCallback(() => runSceneAction(() => usePresentationStore.getState().previousScene()), []);
  const goTo = useCallback((index: number) => runSceneAction(() => usePresentationStore.getState().goToScene(index)), []);
  return { next, previous, goTo };
};

export function useKeyboardNavigation() {
  useEffect(() => {
    const store = usePresentationStore;
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      if (target instanceof HTMLElement && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))) return;
      const state = store.getState();
      const key = event.key.toLowerCase();

      if (!state.started) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          state.start();
        }
        return;
      }

      if (event.key === 'Escape') {
        if (state.showSources || state.showAIUsage || state.showOverview) state.closePanels();
        else if (document.fullscreenElement) void document.exitFullscreen();
        return;
      }
      if (event.key === 'ArrowRight' || event.key === ' ') {
        event.preventDefault();
        runSceneAction(() => store.getState().nextScene());
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        runSceneAction(() => store.getState().previousScene());
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
      } else if (key === 't' && store.getState().currentScene === 9) {
        event.preventDefault();
        store.getState().startReflectionTimer();
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
