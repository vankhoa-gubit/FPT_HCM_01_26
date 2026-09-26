import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  SourcesDrawer,
  AIUsagePanel,
  PresenterOverlay,
  SceneOverview,
  NavigationHint,
} from '../components/InfoPanels';
import {
  UncleHoPortrait,
  LotusBlossomArt,
  HistoricalSkyline,
  FlowingRedRibbonBanner,
  GrandPresentationHeader,
} from '../components/ArtisticDecorations';
import { scenes } from '../data/scenes';
import { useKeyboardNavigation, useSceneNavigation, toggleFullscreen } from '../hooks/useKeyboardNavigation';
import { useReflectionTimer } from '../hooks/useReflectionTimer';
import { usePresentationStore } from '../store/presentationStore';
import { WorldCanvas } from '../three/WorldCanvas';
import { SceneContent } from '../scenes/SceneContent';

gsap.registerPlugin(useGSAP);

function Preloader() {
  const start = usePresentationStore((state) => state.start);
  return (
    <section className="preloader" aria-label="Màn hình mở đầu thuyết trình">
      {/* Decorative Artistic Elements */}
      <UncleHoPortrait />
      <HistoricalSkyline />
      <LotusBlossomArt />

      <div className="preloader__center">
        <GrandPresentationHeader />

        <div className="preloader__timeline-badge">
          <span>1911</span>
          <i />
          <span>HÀNH TRÌNH TƯ TƯỞNG CỨU NƯỚC</span>
          <i />
          <span>1945</span>
        </div>

        <div className="preloader-action-zone">
          <button className="begin-button" onClick={start} autoFocus>
            <span>BẮT ĐẦU BUỔI THUYẾT TRÌNH</span>
            <small>NHẤN ENTER HOẶC CLICK VÀO ĐÂY</small>
            <span className="begin-arrow" aria-hidden="true">➔</span>
          </button>
        </div>

        <div className="preloader-meta-row">
          <span>11 CẢNH TRÌNH CHIẾU</span>
          <i />
          <span>3D TƯ LIỆU ĐẶC BIỆT</span>
          <i />
          <span>THỜI LƯỢNG ~17 PHÚT</span>
        </div>
      </div>

      {/* Flowing Ribbon at the bottom */}
      <FlowingRedRibbonBanner currentScene={0} onSelectMilestone={() => { start(); }} />
    </section>
  );
}

function SceneManager() {
  const currentScene = usePresentationStore((state) => state.currentScene);
  const sceneBeat = usePresentationStore((state) => state.sceneBeat);
  const reducedMotion = usePresentationStore((state) => state.reducedMotion);
  const scene = scenes[currentScene];
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current) return;
    const items = gsap.utils.toArray<HTMLElement>('.reveal-item', container.current);
    if (reducedMotion) {
      gsap.set(items, { autoAlpha: 1, y: 0, clearProps: 'clipPath' });
      return;
    }
    gsap.fromTo(
      items,
      { autoAlpha: 0, y: 22, clipPath: 'inset(0 0 100% 0)' },
      { autoAlpha: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.76, stagger: 0.08, ease: 'power3.out', overwrite: true },
    );
  }, { scope: container, dependencies: [currentScene, sceneBeat, reducedMotion], revertOnUpdate: true });

  return (
    <div className="scene-manager" ref={container}>
      <SceneContent key={`${scene.id}-${sceneBeat}`} scene={scene} sceneIndex={currentScene} sceneBeat={sceneBeat} />
    </div>
  );
}

function useActivityVisibility() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    let timeout = 0;
    const onActivity = () => {
      setVisible(true);
      window.clearTimeout(timeout);
      timeout = window.setTimeout(() => setVisible(false), 4500);
    };
    window.addEventListener('pointermove', onActivity, { passive: true });
    window.addEventListener('keydown', onActivity);
    onActivity();
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener('pointermove', onActivity);
      window.removeEventListener('keydown', onActivity);
    };
  }, []);
  return visible;
}

export function Presentation() {
  const started = usePresentationStore((state) => state.started);
  const currentScene = usePresentationStore((state) => state.currentScene);
  const showNavigation = usePresentationStore((state) => state.showNavigation);
  const goToScene = usePresentationStore((state) => state.goToScene);
  const { next, previous } = useSceneNavigation();
  const activityVisible = useActivityVisibility();
  useKeyboardNavigation();
  useReflectionTimer();

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => usePresentationStore.getState().setReducedMotion(preference.matches);
    preference.addEventListener('change', onChange);
    return () => preference.removeEventListener('change', onChange);
  }, []);

  return (
    <main className="presentation-root" data-scene-id={scenes[currentScene].id}>
      {/* 3D WebGL Canvas with detailed models and warm lighting */}
      <WorldCanvas />

      {/* Archival Parchment Texture and Atmospheric Vignette */}
      <div className="archive-photo" aria-hidden="true" />
      <div className="presentation-parchment-base" aria-hidden="true" />
      <div className="presentation-vignette" aria-hidden="true" />
      <div className="presentation-grain" aria-hidden="true" />

      {/* Artistic Artwork Overlays matching reference poster */}
      <UncleHoPortrait />
      <HistoricalSkyline />
      <LotusBlossomArt />

      {started ? (
        <>
          {/* Main Scene Content Container */}
          <SceneManager />

          {/* Left/Right click zones for mouse navigation */}
          <button className="nav-zone nav-zone--left" aria-label="Cảnh trước" onClick={previous} />
          <button className="nav-zone nav-zone--right" aria-label="Cảnh tiếp theo" onClick={next} />

          {/* Top Exhibition Navigation Bar */}
          <header className={`stage-header ${showNavigation ? '' : 'stage-header--hidden'} ${activityVisible ? '' : 'stage-header--dim'}`}>
            <div className="wordmark">
              <span className="brand-seal">★</span>
              <div>
                <span className="wordmark__title">HÀNH TRÌNH HỒ CHÍ MINH</span>
                <small className="wordmark__subtitle">MÔN TƯ TƯỞNG HỒ CHÍ MINH · NHÓM 1</small>
              </div>
            </div>

            <div className="top-controls">
              <button
                onClick={() => usePresentationStore.getState().togglePresenterInfo()}
                aria-label="Bật thông tin người thuyết trình"
                title="Phím tắt: P"
              >
                <kbd>P</kbd>
                <span>NGƯỜI DẪN</span>
              </button>
              <button
                onClick={() => usePresentationStore.getState().toggleOverview()}
                aria-label="Mở mục lục cảnh"
                title="Phím tắt: O"
              >
                <kbd>O</kbd>
                <span>MỤC LỤC</span>
              </button>
              <button
                onClick={() => usePresentationStore.getState().toggleSources()}
                aria-label="Mở nguồn tư liệu"
                title="Phím tắt: S"
              >
                <kbd>S</kbd>
                <span>NGUỒN</span>
              </button>
              <button
                onClick={() => { void toggleFullscreen(); }}
                aria-label="Bật toàn màn hình"
                title="Phím tắt: F"
              >
                <kbd>F</kbd>
                <span>TOÀN MÀN HÌNH</span>
              </button>
            </div>
          </header>

          {/* Flowing Crimson Silk Ribbon with Golden Star & Interactive Milestones */}
          <FlowingRedRibbonBanner
            currentScene={currentScene}
            onSelectMilestone={(index) => goToScene(index)}
          />

          {/* Bottom quick actions */}
          <div className={`bottom-actions ${showNavigation ? '' : 'bottom-actions--hidden'} ${activityVisible ? '' : 'bottom-actions--dim'}`}>
            <span className="bottom-actions__chapter">{scenes[currentScene].chapter}</span>
            <div>
              <button onClick={() => usePresentationStore.getState().toggleAIUsage()}>
                <kbd>A</kbd>
                <span>MINH BẠCH HỌC THUẬT</span>
              </button>
            </div>
          </div>

          <NavigationHint />
          <nav className="mobile-scene-nav" aria-label="Điều hướng cảnh">
            <button type="button" onClick={previous} aria-label="Cảnh trước">← <span>TRƯỚC</span></button>
            <span>{String(currentScene + 1).padStart(2, '0')} / {scenes.length}</span>
            <button type="button" onClick={next} aria-label="Cảnh tiếp theo"><span>TIẾP</span> →</button>
          </nav>
          <PresenterOverlay />
          <SourcesDrawer />
          <AIUsagePanel />
          <SceneOverview />
        </>
      ) : (
        <Preloader />
      )}
    </main>
  );
}
