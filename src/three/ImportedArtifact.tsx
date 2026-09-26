import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import { Box3, Group, Mesh, MeshStandardMaterial, Vector3 } from 'three';

type ArtifactName = 'lotus';

const paths: Record<ArtifactName, string> = {
  lotus: '/assets/models/lotus.glb',
};

const sizes: Record<ArtifactName, number> = {
  lotus: 1.8,
};

export function ImportedArtifact({ name, active, position }: {
  name: ArtifactName;
  active: boolean;
  position: [number, number, number];
}) {
  const { scene } = useGLTF(paths[name]);
  const viewportWidth = useThree((state) => state.size.width);
  const group = useRef<Group>(null);
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
    return { object, center, scale };
  }, [name, scene]);

  useFrame((state, delta) => {
    if (!active || !group.current) return;
    group.current.rotation.y += delta * 0.055;
    group.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.045;
  });

  return (
    <group ref={group} visible={active} position={viewportWidth <= 900 ? [0, position[1], position[2]] : position}>
      <group scale={normalized.scale} rotation={[-0.75, 0, 0]}>
        <primitive object={normalized.object} position={normalized.center.clone().multiplyScalar(-1)} />
      </group>
    </group>
  );
}

export function GlobeArtifact({ active }: { active: boolean }) {
  const map = useTexture('/assets/images/earth-map.jpg');
  const viewportWidth = useThree((state) => state.size.width);
  const globe = useRef<Group>(null);

  useFrame((_, delta) => {
    if (active && globe.current) globe.current.rotation.y += delta * 0.1;
  });

  return (
    <group visible={active} position={[viewportWidth <= 900 ? 0 : 2.8, -0.05, -1.1]} rotation={[0, -0.35, 0]}>
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
  );
}

Object.values(paths).forEach((path) => useGLTF.preload(path));
useTexture.preload('/assets/images/earth-map.jpg');
