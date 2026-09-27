import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { Component, Suspense, type ReactNode, type RefObject } from 'react';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Vector3 } from 'three';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { scenes } from '../data/scenes';
import { usePresentationStore } from '../store/presentationStore';
import { GlobeArtifact, ImportedArtifact } from './ImportedArtifact';

const cameraStates: Record<string, { position: [number, number, number]; target: [number, number, number] }> = {
  opening: { position: [0.6, 0.2, 6.8], target: [0.6, 0, 0] },
  crossroads: { position: [0, 0.15, 7.2], target: [0, 0, 0] },
  departure: { position: [-0.2, 0.1, 6.8], target: [0, 0, 0] },
  'world-journey': { position: [0.4, 0.4, 6.4], target: [0.2, 0, 0] },
  'paris-1919': { position: [0, 0.1, 6.7], target: [0, 0, 0] },
  'theses-1920': { position: [0, 0.1, 6.7], target: [0, 0, 0] },
  'tours-1920': { position: [0, 0.2, 6.8], target: [0, 0, 0] },
  synthesis: { position: [0, 0.2, 6.8], target: [0, 0, 0] },
  'after-1920': { position: [0, 0.15, 6.8], target: [0, 0, 0] },
  application: { position: [0, 0.1, 7.1], target: [0, 0, 0] },
  conclusion: { position: [0.2, 0.2, 7.2], target: [0.2, 0, 0] },
};

class ArtifactErrorBoundary extends Component<{ name: string; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error) {
    console.error(`Unable to render ${this.props.name} artifact`, error);
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function CameraRig({ sceneId, sceneBeat, reducedMotion }: { sceneId: string; sceneBeat: number; reducedMotion: boolean }) {
  const { camera } = useThree();
  const lookTarget = useRef(new Vector3());
  const pose = cameraStates[sceneId] ?? cameraStates.opening;

  useEffect(() => {
    const focusOffset = sceneId === 'synthesis' ? (sceneBeat - 2.5) * 0.25 : 0;
    const duration = reducedMotion ? 0.3 : 1.6;
    const timeline = gsap.timeline({ defaults: { duration, ease: 'power3.inOut', overwrite: 'auto' } });
    timeline.to(camera.position, { x: pose.position[0], y: pose.position[1], z: pose.position[2] }, 0);
    timeline.to(lookTarget.current, { x: pose.target[0] + focusOffset, y: pose.target[1], z: pose.target[2] }, 0);
    return () => {
      timeline.kill();
    };
  }, [camera, pose, reducedMotion, sceneBeat, sceneId]);

  useFrame(() => camera.lookAt(lookTarget.current));
  return null;
}

function SceneObjects({
  sceneId,
  sceneBeat,
  reducedMotion,
}: {
  sceneId: string;
  sceneBeat: number;
  reducedMotion: boolean;
}) {
  const showGlobe = sceneId === 'opening' || sceneId === 'world-journey';
  const showLotus = sceneId === 'conclusion';

  return (
    <>
      {/* Warm Antique Exhibition Lighting */}
      <ambientLight intensity={1.1} color="#fff7eb" />
      <directionalLight position={[5, 7, 6]} intensity={1.6} color="#fff2d6" />
      <directionalLight position={[-5, 3, 4]} intensity={0.9} color="#e8d5b5" />
      <pointLight position={[2, -2, 3]} intensity={0.75} color="#d99f36" distance={15} />
      <pointLight position={[-3, -1, 2]} intensity={0.5} color="#b82626" distance={12} />

      <CameraRig sceneId={sceneId} sceneBeat={sceneBeat} reducedMotion={reducedMotion} />

      {/* The globe appears only at the beginning and on the world-journey scene. */}
      <GlobeArtifact active={showGlobe} slotId="globe" reducedMotion={reducedMotion} />
      <ArtifactErrorBoundary name="compass"><ImportedArtifact name="compass" active={sceneId === 'departure'} slotId="compass" reducedMotion={reducedMotion} /></ArtifactErrorBoundary>
      <ArtifactErrorBoundary name="ship wheel"><ImportedArtifact name="ship-wheel" active={sceneId === 'departure'} slotId="ship-wheel" reducedMotion={reducedMotion} /></ArtifactErrorBoundary>
      <ArtifactErrorBoundary name="typewriter"><ImportedArtifact name="typewriter" active={sceneId === 'paris-1919'} slotId="typewriter" reducedMotion={reducedMotion} /></ArtifactErrorBoundary>
      <ArtifactErrorBoundary name="clasp book"><ImportedArtifact name="clasp-book" active={sceneId === 'theses-1920'} slotId="clasp-book" reducedMotion={reducedMotion} /></ArtifactErrorBoundary>
      <ArtifactErrorBoundary name="printing press"><ImportedArtifact name="press" active={sceneId === 'after-1920'} slotId="press" reducedMotion={reducedMotion} /></ArtifactErrorBoundary>
      <ArtifactErrorBoundary name="lotus"><ImportedArtifact name="lotus" active={showLotus} slotId="lotus" reducedMotion={reducedMotion} /></ArtifactErrorBoundary>
    </>
  );
}

function ArtifactViewport({ container }: { container: RefObject<HTMLDivElement | null> }) {
  useFrame(() => {
    const viewport = container.current;
    if (!viewport) return;
    const rect = viewport.getBoundingClientRect();
    const slots = Array.from(document.querySelectorAll<HTMLElement>('[data-artifact-slot]'))
      .map((element) => element.getBoundingClientRect())
      .filter((slot) => slot.width > 8 && slot.height > 8);
    if (!slots.length) {
      viewport.style.clipPath = 'inset(50%)';
      viewport.style.pointerEvents = 'none';
      return;
    }
    const top = Math.max(0, Math.min(...slots.map((slot) => slot.top)) - rect.top);
    const right = Math.max(0, rect.right - Math.max(...slots.map((slot) => slot.right)));
    const bottom = Math.max(0, rect.bottom - Math.max(...slots.map((slot) => slot.bottom)));
    const left = Math.max(0, Math.min(...slots.map((slot) => slot.left)) - rect.left);
    viewport.style.clipPath = `inset(${top}px ${right}px ${bottom}px ${left}px)`;
    viewport.style.pointerEvents = 'auto';
  });
  return null;
}

export function WorldCanvas() {
  const sceneIndex = usePresentationStore((state) => state.currentScene);
  const sceneBeat = usePresentationStore((state) => state.sceneBeat);
  const reducedMotion = usePresentationStore((state) => state.reducedMotion);
  const container = useRef<HTMLDivElement>(null);
  const currentScene = scenes[sceneIndex];

  return (
    <div className="world-canvas" ref={container} aria-hidden="true" data-scene={currentScene.id}>
      <Canvas
        camera={{ position: [0.6, 0.2, 6.8], fov: 36, near: 0.1, far: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <ArtifactViewport container={container} />
          <SceneObjects
            sceneId={currentScene.id}
            sceneBeat={sceneBeat}
            reducedMotion={reducedMotion}
          />
        </Suspense>
        <EffectComposer multisampling={0}>
          <Bloom intensity={0.22} luminanceThreshold={0.88} luminanceSmoothing={0.25} mipmapBlur />
        </EffectComposer>
        <Preload all />
      </Canvas>
    </div>
  );
}
