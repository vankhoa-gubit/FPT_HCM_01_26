import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  List,
  Maximize,
  Minimize,
  Sparkles,
  UserRound,
} from 'lucide-react';
import { AIUsagePanel, PresenterOverlay, SceneOverview, SourcesDrawer } from '../components/InfoPanels';
import { scenes } from '../data/scenes';
import { useKeyboardNavigation, useSceneNavigation, toggleFullscreen } from '../hooks/useKeyboardNavigation';
import { usePresentationStore } from '../store/presentationStore';
import { WorldCanvas } from '../three/WorldCanvas';
import { SceneContent } from '../scenes/SceneContent';

gsap.registerPlugin(useGSAP);

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
      { autoAlpha: 0, y: 18, clipPath: 'inset(0 0 100% 0)' },
      { autoAlpha: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.64, stagger: 0.07, ease: 'power3.out', overwrite: true },
    );
  }, { scope: container, dependencies: [currentScene, sceneBeat, reducedMotion], revertOnUpdate: true });

  return (
    <div className="scene-manager" ref={container}>
      <SceneContent key={`${scene.id}-${sceneBeat}`} scene={scene} sceneIndex={currentScene} sceneBeat={sceneBeat} />
    </div>
  );
}

export function Presentation() {
  const currentScene = usePresentationStore((state) => state.currentScene);
  const showNavigation = usePresentationStore((state) => state.showNavigation);
  const showPresenterInfo = usePresentationStore((state) => state.showPresenterInfo);
  const showOverview = usePresentationStore((state) => state.showOverview);
  const showSources = usePresentationStore((state) => state.showSources);
  const showAIUsage = usePresentationStore((state) => state.showAIUsage);
  const isFullscreen = usePresentationStore((state) => state.isFullscreen);
  const reducedMotion = usePresentationStore((state) => state.reducedMotion);
  const setReducedMotion = usePresentationStore((state) => state.setReducedMotion);
  const toggleNavigation = usePresentationStore((state) => state.toggleNavigation);
  const togglePresenterInfo = usePresentationStore((state) => state.togglePresenterInfo);
  const toggleOverview = usePresentationStore((state) => state.toggleOverview);
  const toggleSources = usePresentationStore((state) => state.toggleSources);
  const toggleAIUsage = usePresentationStore((state) => state.toggleAIUsage);
  const { next, previous } = useSceneNavigation();
  const scene = scenes[currentScene];
  const progress = ((currentScene + 1) / scenes.length) * 100;

  useKeyboardNavigation();

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReducedMotion(preference.matches);
    preference.addEventListener('change', onChange);
    return () => preference.removeEventListener('change', onChange);
  }, [setReducedMotion]);

  return (
    <main className="presentation-root" data-scene-id={scene.id}>
      <WorldCanvas />
      <div className="archive-photo" aria-hidden="true" />
      <div className="presentation-parchment-base" aria-hidden="true" />
      <div className="presentation-vignette" aria-hidden="true" />
      <div className="presentation-grain" aria-hidden="true" />

      <SceneManager />

      <header className={`presentation-header ${showNavigation ? '' : 'presentation-header--hidden'}`} aria-hidden={!showNavigation} inert={!showNavigation}>
        <div className="presentation-brand" aria-label="Hành trình tư tưởng">
          <span className="presentation-brand__seal" aria-hidden="true">★</span>
          <span className="presentation-brand__copy">
            <strong>Hành trình tư tưởng</strong>
            <small>Từ chủ nghĩa yêu nước đến chủ nghĩa Mác – Lênin</small>
          </span>
        </div>
        <nav className="presentation-tools" aria-label="Công cụ trình chiếu">
          <button className="presentation-icon-button" type="button" onClick={togglePresenterInfo} aria-label="Thông tin người thuyết trình" aria-pressed={showPresenterInfo} title="Ghi chú người thuyết trình · P"><UserRound size={19} /></button>
          <button className="presentation-icon-button" type="button" onClick={toggleOverview} aria-label="Mục lục các trang" aria-pressed={showOverview} title="Mục lục · O"><List size={20} /></button>
          <button className="presentation-icon-button" type="button" onClick={toggleSources} aria-label="Nguồn tư liệu" aria-pressed={showSources} title="Nguồn tư liệu · S"><BookOpen size={19} /></button>
          <button className="presentation-icon-button" type="button" onClick={toggleAIUsage} aria-label="Thông tin sử dụng AI" aria-pressed={showAIUsage} title="Minh bạch AI · A"><Sparkles size={19} /></button>
          <button className="presentation-icon-button" type="button" onClick={() => setReducedMotion(!reducedMotion)} aria-label={reducedMotion ? 'Tắt giảm chuyển động' : 'Bật giảm chuyển động'} aria-pressed={reducedMotion} title="Giảm chuyển động"><span className="motion-glyph" aria-hidden="true">{reducedMotion ? '◉' : '◌'}</span></button>
          <button className="presentation-icon-button" type="button" onClick={toggleNavigation} aria-label={showNavigation ? 'Ẩn điều khiển' : 'Hiện điều khiển'} title={showNavigation ? 'Ẩn điều khiển · H' : 'Hiện điều khiển · H'}>{showNavigation ? <Eye size={19} /> : <EyeOff size={19} />}</button>
          <button className="presentation-icon-button" type="button" onClick={() => { void toggleFullscreen(); }} aria-label={isFullscreen ? 'Thoát toàn màn hình' : 'Toàn màn hình'} title="Toàn màn hình · F">{isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}</button>
        </nav>
      </header>

      <footer className={`presentation-footer ${showNavigation ? '' : 'presentation-footer--hidden'}`} aria-hidden={!showNavigation} inert={!showNavigation}>
        <div className="presentation-footer__chapter">{scene.chapter}</div>
        <button className="presentation-step-button" type="button" onClick={previous} aria-label="Trang trước" title="Trang trước · ←"><ChevronLeft size={21} /></button>
        <div className="presentation-progress" role="progressbar" aria-label="Tiến độ trình chiếu" aria-valuemin={1} aria-valuemax={scenes.length} aria-valuenow={currentScene + 1}>
          <span className="presentation-progress__fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="presentation-count">{scene.number}<span>/</span>{String(scenes.length).padStart(2, '0')}</span>
        <button className="presentation-step-button" type="button" onClick={next} aria-label="Trang tiếp theo" title="Trang tiếp theo · →"><ChevronRight size={21} /></button>
        <div className="presentation-footer__ribbon" aria-hidden="true" />
      </footer>

      {!showNavigation && <button className="navigation-restore" type="button" onClick={toggleNavigation} aria-label="Hiện điều khiển" title="Hiện điều khiển · H"><Eye size={19} /></button>}

      <PresenterOverlay />
      <SourcesDrawer />
      <AIUsagePanel />
      <SceneOverview />
    </main>
  );
}
