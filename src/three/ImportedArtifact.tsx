import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PresentationControls, useAnimations, useGLTF, useTexture } from '@react-three/drei';
import { AnimationAction, Box3, Group, LoopOnce, LoopRepeat, Mesh, MeshStandardMaterial, PerspectiveCamera, Plane, Raycaster, Vector2, Vector3 } from 'three';

type ArtifactName = 'lotus' | 'typewriter' | 'press' | 'compass' | 'ship-wheel' | 'clasp-book';

const paths: Record<ArtifactName, string> = {
  lotus: '/assets/models/lotus.glb',
  typewriter: '/assets/models/typewriter.glb',
  press: '/assets/models/printing-press.glb',
  compass: '/assets/models/magnetic-compass.glb',
  'ship-wheel': '/assets/models/ship-wheel.glb',
  'clasp-book': '/assets/models/clasp-book.glb',
};

const sizes: Record<ArtifactName, number> = {
  lotus: 1.8,
  typewriter: 1.05,
  press: 1.6,
  compass: 1.25,
  'ship-wheel': 1.9,
  'clasp-book': 1.75,
};

function getSlotTransform(slotId: string, camera: PerspectiveCamera, canvasRect: DOMRect, modelSize: Vector3, modelScale: number, raycaster: Raycaster, rotationX = 0) {
  const slot = document.querySelector<HTMLElement>(`[data-artifact-slot="${slotId}"]`);
  if (!slot) return null;
  const rect = slot.getBoundingClientRect();
  if (rect.width < 8 || rect.height < 8 || canvasRect.width < 1 || canvasRect.height < 1) return null;

  const topInset = 48;
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + topInset + (rect.height - topInset - 8) / 2;
  const ndc = new Vector2(
    ((centerX - canvasRect.left) / canvasRect.width) * 2 - 1,
    1 - ((centerY - canvasRect.top) / canvasRect.height) * 2,
  );
  raycaster.setFromCamera(ndc, camera);
  const distance = 7;
  const direction = camera.getWorldDirection(new Vector3());
  const planePoint = camera.position.clone().addScaledVector(direction, distance);
  const plane = new Plane().setFromNormalAndCoplanarPoint(direction, planePoint);
  const center = raycaster.ray.intersectPlane(plane, new Vector3());
  if (!center) return null;

  const worldPerPixel = (2 * distance * Math.tan((camera.fov * Math.PI) / 360)) / canvasRect.height;
  const halfX = modelSize.x / 2;
  const halfY = (Math.abs(Math.cos(rotationX)) * modelSize.y + Math.abs(Math.sin(rotationX)) * modelSize.z) / 2;
  const halfZ = (Math.abs(Math.sin(rotationX)) * modelSize.y + Math.abs(Math.cos(rotationX)) * modelSize.z) / 2;
  const horizontalRadius = Math.hypot(halfX, halfZ);
  const cameraPitch = Math.asin(Math.min(1, Math.abs(direction.y)));
  const modelWidth = horizontalRadius * 2 * modelScale;
  const modelHeight = 2 * (halfY * Math.cos(cameraPitch) + horizontalRadius * Math.sin(cameraPitch)) * modelScale;
  const availableWidth = rect.width * 0.9 * worldPerPixel;
  const availableHeight = (rect.height - topInset - 8) * 0.9 * worldPerPixel;
  const scale = 0.65 * Math.min(1.2, availableWidth / modelWidth, availableHeight / modelHeight);
  return { center, scale };
}

export function ImportedArtifact({ name, active, slotId, reducedMotion = false }: {
  name: ArtifactName;
  active: boolean;
  slotId: string;
  reducedMotion?: boolean;
}) {
  const { scene, animations } = useGLTF(paths[name]);
  const group = useRef<Group>(null);
  const isOpen = useRef(false);
  const isSpinning = useRef(false);
  const raycaster = useMemo(() => new Raycaster(), []);
  const normalized = useMemo(() => {
    const object = scene.clone(true);
    if (name === 'lotus') {
      object.traverse((child) => {
        if (!(child instanceof Mesh)) return;
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        const updated = materials.map((material) => {
          const copy = material.clone();
          if (copy instanceof MeshStandardMaterial && copy.color.g > copy.color.r * 1.7) {
            copy.transparent = true;
            copy.opacity = 0;
            copy.depthWrite = false;
          }
          return copy;
        });
        child.material = Array.isArray(child.material) ? updated : updated[0];
      });
    }
    const bounds = new Box3().setFromObject(object);
    const size = bounds.getSize(new Vector3());
    const center = bounds.getCenter(new Vector3());
    const scale = sizes[name] / Math.max(size.x, size.y, size.z, 0.001);
    return { object, center, scale, size };
  }, [name, scene]);

  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    if (active) return;
    Object.values(actions).forEach((action) => action?.stop());
    isOpen.current = false;
    isSpinning.current = false;
  }, [active, actions]);

  useFrame((state, delta) => {
    if (!active || !group.current) return;
    if (state.camera instanceof PerspectiveCamera) {
      const transform = getSlotTransform(slotId, state.camera, state.gl.domElement.getBoundingClientRect(), normalized.size, normalized.scale, raycaster, name === 'lotus' ? -0.75 : 0);
      if (transform) {
        group.current.position.copy(transform.center);
        group.current.scale.setScalar(normalized.scale * transform.scale);
      }
    }
    if (!reducedMotion) {
      if (!isSpinning.current) group.current.rotation.y += delta * 0.055;
    }
  });

  const activate = () => {
    if (name === 'lotus' || names.length === 0) return;
    if (name === 'press') {
      const action = actions.spin ?? actions[names[0]];
      if (!action) return;
      if (isSpinning.current) {
        action.stop();
        isSpinning.current = false;
      } else {
        action.reset().setLoop(LoopRepeat, Infinity).play();
        isSpinning.current = true;
      }
      return;
    }

    const actionName = isOpen.current ? 'close' : 'open';
    const action = actions[actionName] ?? actions[names[0]];
    if (!action) return;
    Object.values(actions).forEach((item: AnimationAction | null) => item?.stop());
    action.reset();
    action.setLoop(LoopOnce, 1);
    action.clampWhenFinished = true;
    action.play();
    isOpen.current = !isOpen.current;
  };

  return (
    <PresentationControls global={false} cursor snap speed={1.3} polar={[-0.35, 0.35]} azimuth={[-0.8, 0.8]}>
      <group visible={active}>
        <group ref={group} scale={normalized.scale} rotation={name === 'lotus' ? [-0.75, 0, 0] : name === 'clasp-book' ? [0, Math.PI / 2, 0] : [0, 0, 0]} onClick={activate}>
          <primitive object={normalized.object} position={normalized.center.clone().multiplyScalar(-1)} />
        </group>
      </group>
    </PresentationControls>
  );
}

export function GlobeArtifact({ active, reducedMotion = false, slotId = 'globe' }: {
  active: boolean;
  reducedMotion?: boolean;
  slotId?: string;
}) {
  const map = useTexture('/assets/images/earth-map.jpg');
  const root = useRef<Group>(null);
  const globe = useRef<Group>(null);
  const raycaster = useMemo(() => new Raycaster(), []);

  useFrame((state, delta) => {
    if (!active || !root.current) return;
    if (state.camera instanceof PerspectiveCamera) {
      const transform = getSlotTransform(slotId, state.camera, state.gl.domElement.getBoundingClientRect(), new Vector3(2.46, 2.95, 2.46), 1, raycaster);
      if (transform) {
        root.current.position.copy(transform.center);
        root.current.scale.setScalar(transform.scale);
      }
    }
    if (!reducedMotion && globe.current) globe.current.rotation.y += delta * 0.1;
  });

  return (
    <PresentationControls global={false} cursor snap speed={1.2} polar={[-0.25, 0.25]} azimuth={[-1, 1]}>
      <group ref={root} visible={active} rotation={[0, -0.35, 0]}>
        <group ref={globe} rotation={[0, 0, 0.18]}>
          <mesh position={[0, 0.35, 0]}>
            <sphereGeometry args={[1.13, 64, 48]} />
            <meshStandardMaterial map={map} roughness={0.76} metalness={0.06} />
          </mesh>
          <mesh position={[0, 0.35, 0]} rotation={[0, 0, 0.18]}>
            <torusGeometry args={[1.23, 0.025, 12, 96]} />
            <meshStandardMaterial color="#a97828" metalness={0.7} roughness={0.32} />
          </mesh>
        </group>
        <mesh position={[0, -1.02, 0]}>
          <cylinderGeometry args={[0.055, 0.09, 0.55, 20]} />
          <meshStandardMaterial color="#8c652d" metalness={0.7} roughness={0.32} />
        </mesh>
        <mesh position={[0, -1.39, 0]}>
          <cylinderGeometry args={[0.74, 0.88, 0.16, 48]} />
          <meshStandardMaterial color="#4b321d" roughness={0.5} />
        </mesh>
      </group>
    </PresentationControls>
  );
}

Object.values(paths).forEach((path) => useGLTF.preload(path));
useTexture.preload('/assets/images/earth-map.jpg');
