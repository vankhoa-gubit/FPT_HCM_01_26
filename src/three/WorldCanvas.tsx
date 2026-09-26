import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { Suspense } from 'react';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Vector3 } from 'three';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { scenes } from '../data/scenes';
import { usePresentationStore } from '../store/presentationStore';
import { GlobeArtifact, ImportedArtifact } from './ImportedArtifact';

const cameraStates = [
  { position: [0.6, 0.2, 6.8], target: [0.6, 0, 0] },     // 0: opening
  { position: [0, 0.15, 7.2], target: [0, 0, 0] },        // 1: question
  { position: [-0.3, 0.15, 7.0], target: [0, 0, 0] },     // 2: crossroads
  { position: [-0.2, 0.1, 6.5], target: [0, 0, 0] },      // 3: departure (steamship)
  { position: [0.4, 0.6, 6.2], target: [0.2, 0, 0] },     // 4: world journey (globe)
  { position: [-0.1, 0.1, 5.6], target: [0, 0, 0] },      // 5: paris 1919 (manuscript)
  { position: [0, 0.1, 5.4], target: [0, 0, 0] },         // 6: theses 1920 (manuscript)
  { position: [0, 0.2, 6.8], target: [0, 0, 0] },         // 7: tours 1920 (congress)
  { position: [0, 0.2, 6.4], target: [0, 0, 0] },         // 8: synthesis (lotus & star)
  { position: [0, 0.15, 6.8], target: [0, 0, 0] },        // 9: reflection
  { position: [0.3, 0.2, 7.2], target: [0.3, 0, 0] },     // 10: conclusion
];

function CameraRig({ sceneIndex, sceneBeat, reducedMotion }: { sceneIndex: number; sceneBeat: number; reducedMotion: boolean }) {
  const { camera } = useThree();
  const lookTarget = useRef(new Vector3());
  const pose = cameraStates[sceneIndex] ?? cameraStates[0];

  useEffect(() => {
    const focusOffset = sceneIndex === 8 ? (sceneBeat - 2.5) * 0.25 : 0;
    const duration = reducedMotion ? 0.3 : 1.6;
    const timeline = gsap.timeline({ defaults: { duration, ease: 'power3.inOut', overwrite: 'auto' } });
    timeline.to(camera.position, { x: pose.position[0], y: pose.position[1], z: pose.position[2] }, 0);
    timeline.to(lookTarget.current, { x: pose.target[0] + focusOffset, y: pose.target[1], z: pose.target[2] }, 0);
    return () => {
      timeline.kill();
    };
  }, [camera, pose, reducedMotion, sceneBeat, sceneIndex]);

  useFrame(() => camera.lookAt(lookTarget.current));
  return null;
}

function SceneObjects({
  sceneIndex,
  sceneBeat,
  reducedMotion,
}: {
  sceneIndex: number;
  sceneBeat: number;
  started: boolean;
  reducedMotion: boolean;
}) {
  const showGlobe = [0, 1, 2, 4].includes(sceneIndex);
  const showLotus = sceneIndex === 8;

  return (
    <>
      {/* Warm Antique Exhibition Lighting */}
      <ambientLight intensity={1.1} color="#fff7eb" />
      <directionalLight position={[5, 7, 6]} intensity={1.6} color="#fff2d6" />
      <directionalLight position={[-5, 3, 4]} intensity={0.9} color="#e8d5b5" />
      <pointLight position={[2, -2, 3]} intensity={0.75} color="#d99f36" distance={15} />
      <pointLight position={[-3, -1, 2]} intensity={0.5} color="#b82626" distance={12} />

      <CameraRig sceneIndex={sceneIndex} sceneBeat={sceneBeat} reducedMotion={reducedMotion} />

      {/* 1. Globe Stage */}
      <GlobeArtifact active={showGlobe} />

      {/* Lotus study for the synthesis scene */}
      <ImportedArtifact name="lotus" active={showLotus} position={[2.35, 0, -1.5]} />
    </>
  );
}

export function WorldCanvas() {
  const started = usePresentationStore((state) => state.started);
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
          <SceneObjects
            sceneIndex={sceneIndex}
            sceneBeat={sceneBeat}
            started={started}
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
