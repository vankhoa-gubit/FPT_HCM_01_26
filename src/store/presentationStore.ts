import { create } from 'zustand';
import { scenes } from '../data/scenes';

interface PresentationState {
  started: boolean;
  currentScene: number;
  previousSceneIndex: number;
  sceneBeat: number;
  direction: 1 | -1;
  isTransitioning: boolean;
  isFullscreen: boolean;
  showSources: boolean;
  activeSourceId: string | null;
  showAIUsage: boolean;
  showPresenterInfo: boolean;
  showOverview: boolean;
  showNavigation: boolean;
  reducedMotion: boolean;
  timerRunning: boolean;
  reflectionSeconds: number;
  start: () => void;
  nextScene: () => void;
  previousScene: () => void;
  goToScene: (index: number) => void;
  setTransitioning: (value: boolean) => void;
  setFullscreen: (value: boolean) => void;
  toggleFullscreen: () => void;
  toggleSources: () => void;
  openSource: (sourceId: string) => void;
  toggleAIUsage: () => void;
  togglePresenterInfo: () => void;
  toggleOverview: () => void;
  toggleNavigation: () => void;
  setReducedMotion: (value: boolean) => void;
  startReflectionTimer: () => void;
  tickReflectionTimer: () => void;
  closePanels: () => void;
}

const beatLimits: Record<string, number> = {
  'world-journey': 4,
  'theses-1920': 1,
  synthesis: 5,
  reflection: 2,
};

const resetReflection = { timerRunning: false, reflectionSeconds: 20 };

export const usePresentationStore = create<PresentationState>((set, get) => ({
  started: false,
  currentScene: 0,
  previousSceneIndex: 0,
  sceneBeat: 0,
  direction: 1,
  isTransitioning: false,
  isFullscreen: false,
  showSources: false,
  activeSourceId: null,
  showAIUsage: false,
  showPresenterInfo: false,
  showOverview: false,
  showNavigation: true,
  reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  ...resetReflection,
  start: () => set({ started: true }),
  nextScene: () => {
    const { currentScene, sceneBeat, reflectionSeconds } = get();
    const scene = scenes[currentScene];
    if (scene.id === 'reflection' && sceneBeat === 0 && reflectionSeconds > 0) return;
    const beatLimit = beatLimits[scene.id] ?? 0;
    if (sceneBeat < beatLimit) {
      set({ sceneBeat: sceneBeat + 1, direction: 1 });
      return;
    }
    if (currentScene >= scenes.length - 1) return;
    set({
      previousSceneIndex: currentScene,
      currentScene: currentScene + 1,
      sceneBeat: 0,
      direction: 1,
      ...resetReflection,
    });
  },
  previousScene: () => {
    const { currentScene, sceneBeat } = get();
    const scene = scenes[currentScene];
    if (sceneBeat > 0) {
      set({ sceneBeat: sceneBeat - 1, direction: -1, ...(scene.id === 'reflection' ? resetReflection : {}) });
      return;
    }
    if (currentScene <= 0) return;
    const previousScene = currentScene - 1;
    set({
      previousSceneIndex: currentScene,
      currentScene: previousScene,
      sceneBeat: 0,
      direction: -1,
      ...resetReflection,
    });
  },
  goToScene: (index) => {
    const boundedIndex = Math.max(0, Math.min(scenes.length - 1, index));
    const { currentScene } = get();
    set({
      previousSceneIndex: currentScene,
      currentScene: boundedIndex,
      sceneBeat: 0,
      direction: boundedIndex >= currentScene ? 1 : -1,
      ...resetReflection,
      showOverview: false,
      showSources: false,
      showAIUsage: false,
    });
  },
  setTransitioning: (value) => set({ isTransitioning: value }),
  setFullscreen: (value) => set({ isFullscreen: value }),
  toggleFullscreen: () => set((state) => ({ isFullscreen: !state.isFullscreen })),
  toggleSources: () => set((state) => ({
    showSources: !state.showSources,
    showAIUsage: false,
    showOverview: false,
    activeSourceId: null,
  })),
  openSource: (activeSourceId) => set({ showSources: true, activeSourceId, showAIUsage: false, showOverview: false }),
  toggleAIUsage: () => set((state) => ({ showAIUsage: !state.showAIUsage, showSources: false, showOverview: false })),
  togglePresenterInfo: () => set((state) => ({ showPresenterInfo: !state.showPresenterInfo })),
  toggleOverview: () => set((state) => ({ showOverview: !state.showOverview, showSources: false, showAIUsage: false })),
  toggleNavigation: () => set((state) => ({ showNavigation: !state.showNavigation })),
  setReducedMotion: (value) => set({ reducedMotion: value }),
  startReflectionTimer: () => set((state) => ({
    reflectionSeconds: state.reflectionSeconds > 0 ? state.reflectionSeconds : 20,
    timerRunning: true,
  })),
  tickReflectionTimer: () => set((state) => {
    const next = Math.max(0, state.reflectionSeconds - 1);
    return { reflectionSeconds: next, timerRunning: next > 0 };
  }),
  closePanels: () => set({ showSources: false, showAIUsage: false, showOverview: false, activeSourceId: null }),
}));
