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
  audienceChoices: Record<string, string>;
  revealedAnswers: string[];
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
  setAudienceChoice: (sceneId: string, choiceId: string) => void;
  revealPollAnswer: (sceneId: string) => void;
  resetPoll: (sceneId: string) => void;
  closePanels: () => void;
}

export const usePresentationStore = create<PresentationState>((set, get) => ({
  started: true,
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
  audienceChoices: {},
  revealedAnswers: [],
  start: () => set({ started: true }),
  nextScene: () => {
    const { currentScene, sceneBeat } = get();
    const scene = scenes[currentScene];
    const beatLimit = scene.beatCount ?? 0;
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
    });
  },
  previousScene: () => {
    const { currentScene, sceneBeat } = get();
    if (sceneBeat > 0) {
      set({ sceneBeat: sceneBeat - 1, direction: -1 });
      return;
    }
    if (currentScene <= 0) return;
    const previousScene = currentScene - 1;
    set({
      previousSceneIndex: currentScene,
      currentScene: previousScene,
      sceneBeat: scenes[previousScene].beatCount ?? 0,
      direction: -1,
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
      showOverview: false,
      showSources: false,
      showAIUsage: false,
      activeSourceId: null,
    });
  },
  setTransitioning: (value) => set({ isTransitioning: value }),
  setFullscreen: (value) => set({ isFullscreen: value }),
  toggleFullscreen: () => set((state) => ({ isFullscreen: !state.isFullscreen })),
  toggleSources: () => set((state) => ({
    showSources: !state.showSources,
    showAIUsage: false,
    showOverview: false,
    showPresenterInfo: false,
    activeSourceId: null,
  })),
  openSource: (activeSourceId) => set({
    showSources: true,
    activeSourceId,
    showAIUsage: false,
    showOverview: false,
    showPresenterInfo: false,
  }),
  toggleAIUsage: () => set((state) => ({
    showAIUsage: !state.showAIUsage,
    showSources: false,
    showOverview: false,
    showPresenterInfo: false,
    activeSourceId: null,
  })),
  togglePresenterInfo: () => set((state) => ({
    showPresenterInfo: !state.showPresenterInfo,
    showSources: false,
    showAIUsage: false,
    showOverview: false,
    activeSourceId: null,
  })),
  toggleOverview: () => set((state) => ({
    showOverview: !state.showOverview,
    showSources: false,
    showAIUsage: false,
    showPresenterInfo: false,
    activeSourceId: null,
  })),
  toggleNavigation: () => set((state) => ({ showNavigation: !state.showNavigation })),
  setReducedMotion: (value) => set({ reducedMotion: value }),
  setAudienceChoice: (sceneId, choiceId) => set((state) => ({
    audienceChoices: { ...state.audienceChoices, [sceneId]: choiceId },
  })),
  revealPollAnswer: (sceneId) => set((state) => ({
    revealedAnswers: state.revealedAnswers.includes(sceneId)
      ? state.revealedAnswers
      : [...state.revealedAnswers, sceneId],
  })),
  resetPoll: (sceneId) => set((state) => {
    const audienceChoices = { ...state.audienceChoices };
    delete audienceChoices[sceneId];
    return {
      audienceChoices,
      revealedAnswers: state.revealedAnswers.filter((id) => id !== sceneId),
    };
  }),
  closePanels: () => set({
    showSources: false,
    showAIUsage: false,
    showOverview: false,
    showPresenterInfo: false,
    activeSourceId: null,
  }),
}));
