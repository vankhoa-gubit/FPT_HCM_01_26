import { useEffect } from 'react';
import { usePresentationStore } from '../store/presentationStore';

export function useReflectionTimer() {
  const timerRunning = usePresentationStore((state) => state.timerRunning);
  const currentScene = usePresentationStore((state) => state.currentScene);
  const tick = usePresentationStore((state) => state.tickReflectionTimer);

  useEffect(() => {
    if (!timerRunning || currentScene !== 9) return;
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, [currentScene, tick, timerRunning]);
}
