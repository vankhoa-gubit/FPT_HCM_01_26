import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  CatmullRomCurve3,
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  TubeGeometry,
  Vector3,
} from 'three';
import gsap from 'gsap';
import { latLngToVector3 } from './geo';

// -------------------------------------------------------------
// 1. STEAMSHIP "AMIRAL LATOUCHE-TRÉVILLE" & HARBOR (1911)
// -------------------------------------------------------------
export function DetailedSteamship({ active }: { active: boolean }) {
  const group = useRef<Group>(null);
  const smokeParticles = useRef<Mesh[]>([]);

  React.useEffect(() => {
    if (!active || !group.current) return;
    group.current.position.set(4.0, -0.6, 0.2);
    const tween = gsap.to(group.current.position, {
      x: -0.3,
      duration: 10,
      ease: 'power1.out',
    });
    return () => {
      tween.kill();
    };
  }, [active]);

  useFrame((_, delta) => {
    if (!active || !group.current) return;
    // Gentle ship rocking on waves
    group.current.rotation.z = Math.sin(Date.now() * 0.0015) * 0.025;
    group.current.rotation.x = Math.cos(Date.now() * 0.0018) * 0.015;
    group.current.position.y = -0.6 + Math.sin(Date.now() * 0.002) * 0.03;

    // Animate smoke puffs
    smokeParticles.current.forEach((smoke, i) => {
      if (smoke) {
        smoke.position.y += delta * 0.45;
        smoke.position.x -= delta * 0.35;
        smoke.scale.addScalar(delta * 0.3);
        const mat = smoke.material as MeshBasicMaterial;
        mat.opacity -= delta * 0.18;
        if (smoke.position.y > 1.8 || mat.opacity <= 0) {
          smoke.position.set(i % 2 === 0 ? 0.15 : -0.55, 0.95, 0);
          smoke.scale.setScalar(0.08 + (i % 3) * 0.03);
          mat.opacity = 0.55;
        }
      }
    });
  });

  return (
    <group visible={active} position={[0, -0.4, 0]}>
      {/* Dynamic ocean water surface */}
      <OceanWaves />

      {/* Nha Rong Harbor Pier & Colonial Dockside */}
      <NhaRongWharf />

      {/* The 1911 Steamship "Amiral Latouche-Tréville" */}
      <group ref={group} position={[0, -0.6, 0.2]}>
        {/* LOWER KEEL (Deep Red / Maroon) */}
        <mesh position={[0, -0.16, 0]}>
          <boxGeometry args={[3.6, 0.22, 0.72]} />
          <meshStandardMaterial color="#6e1616" roughness={0.7} metalness={0.1} />
        </mesh>

        {/* WATERLINE STRIPE (Crisp White) */}
        <mesh position={[0, -0.04, 0]}>
          <boxGeometry args={[3.66, 0.04, 0.76]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>

        {/* UPPER MAIN HULL (Charcoal Iron Black) */}
        <mesh position={[0, 0.12, 0]}>
          <boxGeometry args={[3.7, 0.28, 0.78]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.85} metalness={0.25} />
        </mesh>

        {/* POINTED CLIPPER BOW (Mũi tàu nhọn vuốt cao) */}
        <mesh position={[1.95, 0.14, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <cylinderGeometry args={[0.02, 0.52, 0.65, 4]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.85} />
        </mesh>

        {/* ROUNDED TRANSOM STERN (Đuôi tàu tròn truyền thống) */}
        <mesh position={[-1.9, 0.1, 0]}>
          <cylinderGeometry args={[0.38, 0.38, 0.28, 16]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.85} />
        </mesh>

        {/* PROPELLER & RUDDER AT STERN */}
        <mesh position={[-2.05, -0.16, 0]}>
          <boxGeometry args={[0.22, 0.26, 0.04]} />
          <meshStandardMaterial color="#826829" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[-1.95, -0.18, 0]} rotation={[0, 0, Math.PI / 4]}>
          <cylinderGeometry args={[0.1, 0.1, 0.04, 6]} />
          <meshStandardMaterial color="#c29838" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* GOLDEN PORTHOLES (Hàng cửa sổ tròn mạn tàu) */}
        {Array.from({ length: 16 }).map((_, i) => (
          <React.Fragment key={i}>
            <mesh position={[-1.5 + i * 0.2, 0.14, 0.405]}>
              <cylinderGeometry args={[0.025, 0.025, 0.015, 8]} />
              <meshBasicMaterial color="#f0d584" />
            </mesh>
            <mesh position={[-1.5 + i * 0.2, 0.14, -0.405]}>
              <cylinderGeometry args={[0.025, 0.025, 0.015, 8]} />
              <meshBasicMaterial color="#f0d584" />
            </mesh>
          </React.Fragment>
        ))}

        {/* MAIN WOODEN DECK (Sàn gỗ tàu) */}
        <mesh position={[0, 0.27, 0]}>
          <boxGeometry args={[3.6, 0.04, 0.74]} />
          <meshStandardMaterial color="#8f6336" roughness={0.9} />
        </mesh>

        {/* PROMENADE DECK CABIN (Tầng cabin khách & hoa tiêu) */}
        <mesh position={[-0.2, 0.42, 0]}>
          <boxGeometry args={[2.2, 0.26, 0.58]} />
          <meshStandardMaterial color="#f3eee3" roughness={0.8} />
        </mesh>

        {/* CABIN WINDOWS (Hàng cửa sổ chữ nhật tầng 1) */}
        {Array.from({ length: 9 }).map((_, i) => (
          <mesh key={i} position={[-1.1 + i * 0.22, 0.44, 0.30]}>
            <boxGeometry args={[0.1, 0.09, 0.02]} />
            <meshBasicMaterial color="#36291a" />
          </mesh>
        ))}

        {/* BOAT DECK (Sàn xuồng cứu sinh) */}
        <mesh position={[-0.2, 0.56, 0]}>
          <boxGeometry args={[2.25, 0.03, 0.62]} />
          <meshStandardMaterial color="#7a532d" roughness={0.9} />
        </mesh>

        {/* WHEELHOUSE & CAPTAIN BRIDGE (Buồng lái chỉ huy) */}
        <mesh position={[0.7, 0.68, 0]}>
          <boxGeometry args={[0.55, 0.22, 0.52]} />
          <meshStandardMaterial color="#f7f2e6" roughness={0.8} />
        </mesh>
        {/* Bridge glass windows */}
        <mesh position={[0.98, 0.7, 0]}>
          <boxGeometry args={[0.02, 0.1, 0.42]} />
          <meshBasicMaterial color="#ffeaa7" />
        </mesh>
        {/* Searchlight & Bridge wings */}
        <mesh position={[0.98, 0.83, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.08, 12]} />
          <meshStandardMaterial color="#e5b842" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* TWIN STEAMSHIP FUNNELS (2 Ống khói lớn đặc trưng thế kỷ 20) */}
        {/* Funnel 1 (Fore) */}
        <group position={[0.15, 0.82, 0]} rotation={[0, 0, -0.1]}>
          <mesh position={[0, -0.06, 0]}>
            <cylinderGeometry args={[0.13, 0.14, 0.48, 16]} />
            <meshStandardMaterial color="#ba4e27" roughness={0.7} />
          </mesh>
          {/* Black soot rim */}
          <mesh position={[0, 0.21, 0]}>
            <cylinderGeometry args={[0.132, 0.132, 0.12, 16]} />
            <meshStandardMaterial color="#1f1a17" roughness={0.9} />
          </mesh>
          {/* Steam pipe */}
          <mesh position={[0.12, 0.05, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.5, 8]} />
            <meshStandardMaterial color="#d4a339" metalness={0.8} />
          </mesh>
        </group>

        {/* Funnel 2 (Aft) */}
        <group position={[-0.55, 0.82, 0]} rotation={[0, 0, -0.1]}>
          <mesh position={[0, -0.06, 0]}>
            <cylinderGeometry args={[0.13, 0.14, 0.48, 16]} />
            <meshStandardMaterial color="#ba4e27" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.21, 0]}>
            <cylinderGeometry args={[0.132, 0.132, 0.12, 16]} />
            <meshStandardMaterial color="#1f1a17" roughness={0.9} />
          </mesh>
          <mesh position={[0.12, 0.05, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.5, 8]} />
            <meshStandardMaterial color="#d4a339" metalness={0.8} />
          </mesh>
        </group>

        {/* ANIMATED STEAM SMOKE PUFFS */}
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh
            key={i}
            ref={(el) => {
              if (el) smokeParticles.current[i] = el;
            }}
            position={[i % 2 === 0 ? 0.15 : -0.55, 1.1 + i * 0.12, 0]}
          >
            <sphereGeometry args={[0.12, 8, 8]} />
            <meshBasicMaterial color="#ede4d5" transparent opacity={0.4} />
          </mesh>
        ))}

        {/* FORE MAST & AFT MAST (2 Cột buồm gỗ cao với dây chằng) */}
        {/* Fore mast */}
        <group position={[1.3, 0.95, 0]}>
          <mesh>
            <cylinderGeometry args={[0.028, 0.035, 1.45, 10]} />
            <meshStandardMaterial color="#7a5531" roughness={0.9} />
          </mesh>
          {/* Yardarm / Crosstree (Thanh xà ngang) */}
          <mesh position={[0, 0.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.75, 8]} />
            <meshStandardMaterial color="#5e4125" roughness={0.9} />
          </mesh>
        </group>

        {/* Aft mast */}
        <group position={[-1.35, 0.95, 0]}>
          <mesh>
            <cylinderGeometry args={[0.028, 0.035, 1.45, 10]} />
            <meshStandardMaterial color="#7a5531" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.75, 8]} />
            <meshStandardMaterial color="#5e4125" roughness={0.9} />
          </mesh>
        </group>

        {/* 4 LIFEBOATS (Xuồng cứu sinh trắng trên giá treo) */}
        <mesh position={[-0.8, 0.64, 0.34]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.07, 0.07, 0.38, 8]} />
          <meshStandardMaterial color="#f0ece1" roughness={0.8} />
        </mesh>
        <mesh position={[0.2, 0.64, 0.34]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.07, 0.07, 0.38, 8]} />
          <meshStandardMaterial color="#f0ece1" roughness={0.8} />
        </mesh>
        <mesh position={[-0.8, 0.64, -0.34]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.07, 0.07, 0.38, 8]} />
          <meshStandardMaterial color="#f0ece1" roughness={0.8} />
        </mesh>
        <mesh position={[0.2, 0.64, -0.34]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.07, 0.07, 0.38, 8]} />
          <meshStandardMaterial color="#f0ece1" roughness={0.8} />
        </mesh>

        {/* STERN FLAGSTAFF (Cờ hiệu đuôi tàu) */}
        <mesh position={[-1.9, 0.45, 0]} rotation={[0, 0, -0.2]}>
          <cylinderGeometry args={[0.01, 0.01, 0.4, 6]} />
          <meshStandardMaterial color="#947444" metalness={0.7} />
        </mesh>
      </group>
    </group>
  );
}

function OceanWaves() {
  const waterRef = useRef<Mesh>(null);
  useFrame(() => {
    if (waterRef.current) {
      waterRef.current.position.y = -1.25 + Math.sin(Date.now() * 0.0018) * 0.02;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Ocean plane with rich nautical teal-slate tones */}
      <mesh ref={waterRef} position={[0, -1.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[16, 6, 24, 24]} />
        <meshStandardMaterial color="#1a353d" roughness={0.28} metalness={0.4} />
      </mesh>

      {/* Foam wake strips */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={i} position={[-2.2 + i * 0.9, -1.22, 0.4 + (i % 2) * 0.15]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.7, 0.04]} />
          <meshBasicMaterial color="#e6f1f2" transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function NhaRongWharf() {
  return (
    <group position={[-3.8, -0.7, 0]}>
      {/* Wooden Wharf / Quay Structure */}
      <mesh position={[0, -0.25, 0]}>
        <boxGeometry args={[2.8, 0.45, 1.8]} />
        <meshStandardMaterial color="#423326" roughness={0.9} />
      </mesh>

      {/* Pier support wooden pilings */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i} position={[-1.1 + i * 0.55, -0.7, 0.8]}>
          <cylinderGeometry args={[0.06, 0.06, 0.8, 8]} />
          <meshStandardMaterial color="#2d2218" roughness={0.95} />
        </mesh>
      ))}

      {/* Cargo crates and barrels */}
      <mesh position={[0.2, 0.12, 0.3]}>
        <boxGeometry args={[0.35, 0.35, 0.35]} />
        <meshStandardMaterial color="#825c34" roughness={0.8} />
      </mesh>
      <mesh position={[0.6, 0.1, 0.2]}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial color="#6b4c2b" roughness={0.8} />
      </mesh>
      <mesh position={[-0.3, 0.12, 0.4]}>
        <cylinderGeometry args={[0.14, 0.14, 0.32, 12]} />
        <meshStandardMaterial color="#573e24" roughness={0.9} />
      </mesh>

      {/* Nha Rong colonial dragon roof silhouette pavilion */}
      <group position={[-0.4, 0.75, -0.4]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.8, 0.75, 0.8]} />
          <meshStandardMaterial color="#c2b39d" roughness={0.85} />
        </mesh>
        {/* Red tile roof with curved eaves */}
        <mesh position={[0, 0.5, 0]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[1.3, 0.42, 4]} />
          <meshStandardMaterial color="#8c2e21" roughness={0.7} />
        </mesh>
        {/* Twin dragon ornaments on roof ridge */}
        <mesh position={[-0.6, 0.72, 0]}>
          <boxGeometry args={[0.14, 0.14, 0.06]} />
          <meshStandardMaterial color="#f0ca54" metalness={0.7} />
        </mesh>
        <mesh position={[0.6, 0.72, 0]}>
          <boxGeometry args={[0.14, 0.14, 0.06]} />
          <meshStandardMaterial color="#f0ca54" metalness={0.7} />
        </mesh>
      </group>

      {/* Pier gaslight lantern */}
      <mesh position={[1.1, 0.3, 0.7]}>
        <cylinderGeometry args={[0.02, 0.02, 0.7, 8]} />
        <meshStandardMaterial color="#2e2b26" metalness={0.8} />
      </mesh>
      <mesh position={[1.1, 0.68, 0.7]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshBasicMaterial color="#ffe89e" />
      </mesh>
    </group>
  );
}

// -------------------------------------------------------------
// 2. ANTIQUE BRASS ARMILLARY GLOBE & WORLD JOURNEY (1911-1920)
// -------------------------------------------------------------
export function DetailedAntiqueGlobe({
  active,
  sceneIndex,
  sceneBeat,
  reducedMotion,
}: {
  active: boolean;
  sceneIndex: number;
  sceneBeat: number;
  reducedMotion: boolean;
}) {
  const globeGroup = useRef<Group>(null);
  const armillaryGimbal = useRef<Group>(null);

  // Generate 3D Continent relief markers on globe surface
  const continents = useMemo(() => {
    // Lat/Long coordinates defining major continents
    const points: Array<{ lat: number; lng: number; size: number; isVietnam?: boolean }> = [
      // Vietnam & Indochina (Radiant highlight)
      { lat: 10.8, lng: 106.7, size: 0.12, isVietnam: true },
      { lat: 16.0, lng: 108.2, size: 0.09, isVietnam: true },
      { lat: 21.0, lng: 105.8, size: 0.11, isVietnam: true },
      // East & Southeast Asia
      { lat: 35.0, lng: 105.0, size: 0.42 },
      { lat: 28.0, lng: 85.0, size: 0.32 },
      { lat: 15.0, lng: 100.0, size: 0.25 },
      { lat: 36.0, lng: 138.0, size: 0.22 },
      { lat: 0.0, lng: 115.0, size: 0.35 },
      // Europe (France, Britain, Russia)
      { lat: 48.8, lng: 2.3, size: 0.28 },
      { lat: 51.5, lng: -0.1, size: 0.24 },
      { lat: 41.9, lng: 12.5, size: 0.25 },
      { lat: 55.7, lng: 37.6, size: 0.4 },
      { lat: 60.0, lng: 10.0, size: 0.3 },
      // Africa
      { lat: 30.0, lng: 31.0, size: 0.3 }, // Port Said
      { lat: 5.0, lng: 20.0, size: 0.48 },
      { lat: -25.0, lng: 28.0, size: 0.36 },
      { lat: 14.0, lng: -17.0, size: 0.28 }, // Dakar
      // Americas
      { lat: 40.7, lng: -74.0, size: 0.42 }, // New York
      { lat: 42.3, lng: -71.0, size: 0.32 }, // Boston
      { lat: 34.0, lng: -118.0, size: 0.38 },
      { lat: -15.0, lng: -55.0, size: 0.48 },
      { lat: -34.0, lng: -58.0, size: 0.35 },
      // Australia
      { lat: -25.0, lng: 135.0, size: 0.38 },
    ];
    return points;
  }, []);

  useFrame(({ pointer }, delta) => {
    if (!globeGroup.current || !active) return;
    if (!reducedMotion) {
      globeGroup.current.rotation.x = THREE.MathUtils.damp(globeGroup.current.rotation.x, pointer.y * 0.03, 2, delta);
      globeGroup.current.rotation.y += delta * 0.035;
    }
  });

  return (
    <group visible={active} position={[sceneIndex === 0 ? 1.6 : sceneIndex === 10 ? 1.3 : 0, 0.1, 0]}>
      {/* 23.5 Degree Earth Axial Tilt Gimbal */}
      <group ref={armillaryGimbal} rotation={[0.41, 0, 0.2]}>
        {/* ROTATING GLOBE CORE */}
        <group ref={globeGroup}>
          {/* Base Parchment Globe Sphere */}
          <mesh>
            <sphereGeometry args={[2.0, 64, 48]} />
            <meshStandardMaterial
              color="#ede0cc"
              roughness={0.78}
              metalness={0.08}
            />
          </mesh>

          {/* Continents Relief Meshes (Antique Gold Ochre) */}
          {continents.map((c, i) => {
            const pos = latLngToVector3(c.lat, c.lng, 2.015);
            return (
              <mesh key={i} position={pos}>
                <sphereGeometry args={[c.size, 16, 16]} />
                <meshStandardMaterial
                  color={c.isVietnam ? '#b82a2a' : '#c49740'}
                  roughness={0.65}
                  metalness={0.25}
                />
              </mesh>
            );
          })}

          {/* Coordinate Graticule (Latitude & Longitude Engravings) */}
          <GraticuleLines />

          {/* Golden Voyage Route Arc */}
          <VoyageRoutePath sceneIndex={sceneIndex} sceneBeat={sceneBeat} />

          {/* SÀI GÒN ORIGIN PIN (1911) */}
          <group position={latLngToVector3(10.8, 106.7, 2.05)}>
            <mesh>
              <sphereGeometry args={[0.07, 16, 16]} />
              <meshBasicMaterial color="#b81b1b" />
            </mesh>
            <mesh position={[0, 0.08, 0]}>
              <cylinderGeometry args={[0.015, 0.015, 0.14, 8]} />
              <meshStandardMaterial color="#f2ca4b" metalness={0.8} />
            </mesh>
          </group>

          {/* PARIS DESTINATION PIN (1919-1920) */}
          <group position={latLngToVector3(48.85, 2.35, 2.05)}>
            <mesh>
              <sphereGeometry args={[0.065, 16, 16]} />
              <meshBasicMaterial color="#dfa838" />
            </mesh>
          </group>
        </group>

        {/* BRASS ARMILLARY MERIDIAN RING */}
        <mesh>
          <torusGeometry args={[2.22, 0.035, 12, 64]} />
          <meshStandardMaterial color="#c29838" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* EQUATORIAL HORIZON BAND */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.26, 0.045, 12, 64]} />
          <meshStandardMaterial color="#b3872c" roughness={0.35} metalness={0.75} />
        </mesh>
      </group>

      {/* STATELY BRASS STAND & TURNED MAHOGANY PEDESTAL BASE */}
      <group position={[0, -2.4, 0]}>
        {/* Turned brass column */}
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.1, 0.14, 0.7, 24]} />
          <meshStandardMaterial color="#c29838" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.6, 0]}>
          <sphereGeometry args={[0.16, 16, 16]} />
          <meshStandardMaterial color="#d4ab44" roughness={0.25} metalness={0.85} />
        </mesh>
        {/* Beveled Mahogany Base Plinth */}
        <mesh position={[0, -0.05, 0]}>
          <cylinderGeometry args={[0.85, 1.05, 0.22, 32]} />
          <meshStandardMaterial color="#3a1e12" roughness={0.7} />
        </mesh>
        <mesh position={[0, -0.18, 0]}>
          <cylinderGeometry args={[1.05, 1.15, 0.1, 32]} />
          <meshStandardMaterial color="#26130b" roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
}

function GraticuleLines() {
  const rings = useMemo(() => {
    const latCurves: CatmullRomCurve3[] = [-60, -30, 0, 30, 60].map((lat) => {
      const pts: Vector3[] = [];
      for (let lng = -180; lng <= 180; lng += 6) pts.push(latLngToVector3(lat, lng, 2.01));
      return new CatmullRomCurve3(pts);
    });
    const lngCurves: CatmullRomCurve3[] = Array.from({ length: 12 }, (_, i) => {
      const lng = i * 30 - 180;
      const pts: Vector3[] = [];
      for (let lat = -88; lat <= 88; lat += 6) pts.push(latLngToVector3(lat, lng, 2.01));
      return new CatmullRomCurve3(pts);
    });
    return [...latCurves, ...lngCurves];
  }, []);

  return (
    <group>
      {rings.map((curve, idx) => (
        <mesh key={idx}>
          <tubeGeometry args={[curve, 64, idx === 2 ? 0.007 : 0.0035, 4, false]} />
          <meshBasicMaterial color={idx === 2 ? '#d9a741' : '#b08b4a'} opacity={idx === 2 ? 0.8 : 0.35} transparent />
        </mesh>
      ))}
    </group>
  );
}

function VoyageRoutePath({ sceneIndex, sceneBeat }: { sceneIndex: number; sceneBeat: number }) {
  const tubeMesh = useRef<Mesh>(null);
  const routePoints = useMemo(() => {
    // Sài Gòn -> Singapore -> Colombo -> Port Said -> Marseille -> Le Havre -> London -> Paris
    const waypoints = [
      latLngToVector3(10.8, 106.7, 2.03), // Sài Gòn
      latLngToVector3(1.35, 103.8, 2.06), // Singapore
      latLngToVector3(6.92, 79.86, 2.1), // Colombo
      latLngToVector3(31.26, 32.3, 2.14), // Port Said (Suez)
      latLngToVector3(43.3, 5.37, 2.16), // Marseille
      latLngToVector3(49.49, 0.1, 2.18), // Le Havre
      latLngToVector3(51.5, -0.12, 2.19), // London
      latLngToVector3(48.85, 2.35, 2.04), // Paris
    ];
    const curve = new CatmullRomCurve3(waypoints);
    return new TubeGeometry(curve, 180, 0.016, 8, false);
  }, []);

  useFrame(() => {
    if (!tubeMesh.current) return;
    const progress = sceneIndex === 10 ? 1 : sceneIndex >= 4 ? Math.min(0.3 + sceneBeat * 0.18, 1) : 0.25;
    const count = tubeMesh.current.geometry.index?.count ?? 0;
    tubeMesh.current.geometry.setDrawRange(0, Math.floor(count * progress));
  });

  return (
    <mesh ref={tubeMesh} geometry={routePoints}>
      <meshBasicMaterial color="#f7c845" />
    </mesh>
  );
}

// -------------------------------------------------------------
// 3. ARCHIVAL MANUSCRIPT (1919 YÊU SÁCH & 1920 LUẬN CƯƠNG LÊNIN)
// -------------------------------------------------------------
export function DetailedManuscript({
  active,
  sceneIndex,
}: {
  active: boolean;
  sceneIndex: number;
}) {
  const isTheses = sceneIndex === 6;
  const sheetGroup = useRef<Group>(null);

  React.useEffect(() => {
    if (!sheetGroup.current) return;
    const tl = gsap.timeline({ defaults: { duration: 1.4, ease: 'power3.inOut' } });
    tl.to(sheetGroup.current.position, { x: active ? 0 : 0.5, y: active ? 0 : -0.2, z: active ? 0 : -1.2 }, 0);
    tl.to(sheetGroup.current.rotation, { x: active ? 0.05 : 0.3, y: active ? -0.1 : 0.4 }, 0);
    return () => {
      tl.kill();
    };
  }, [active]);

  return (
    <group ref={sheetGroup} visible={active} position={[0, 0, 0]} rotation={[0.05, -0.1, 0]}>
      {/* 3D Curved Antique Parchment Document */}
      <group position={[0, 0, 0]}>
        {/* Paper drop shadow backing */}
        <mesh position={[0.04, -0.04, -0.06]}>
          <planeGeometry args={[3.2, 4.0]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.3} />
        </mesh>

        {/* Parchment sheet with slight thickness */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3.1, 3.9, 0.02]} />
          <meshStandardMaterial
            color={isTheses ? '#f4ebd8' : '#f0e6d2'}
            roughness={0.92}
            metalness={0.02}
          />
        </mesh>

        {/* Vintage Archival Border Frame (Gold & Burgundy filigree) */}
        <mesh position={[0, 0, 0.015]}>
          <planeGeometry args={[2.85, 3.65]} />
          <meshBasicMaterial color="#781d1d" wireframe wireframeLinewidth={2} />
        </mesh>

        {/* Document Header Banner */}
        <mesh position={[0, 1.45, 0.016]}>
          <planeGeometry args={[2.5, 0.32]} />
          <meshBasicMaterial color="#821d1d" />
        </mesh>

        {/* French / Vietnamese Historical Title Lines */}
        <mesh position={[0, 1.45, 0.018]}>
          <planeGeometry args={[2.2, 0.08]} />
          <meshBasicMaterial color="#ffd875" />
        </mesh>
        <mesh position={[0, 1.15, 0.016]}>
          <planeGeometry args={[2.0, 0.04]} />
          <meshBasicMaterial color="#2d2218" />
        </mesh>

        {/* Dual columns of text engravings */}
        {Array.from({ length: 12 }).map((_, i) => (
          <React.Fragment key={i}>
            {/* Left column */}
            <mesh position={[-0.65, 0.9 - i * 0.16, 0.016]}>
              <planeGeometry args={[1.05, 0.025]} />
              <meshBasicMaterial color="#3d3126" transparent opacity={0.65} />
            </mesh>
            {/* Right column */}
            <mesh position={[0.65, 0.9 - i * 0.16, 0.016]}>
              <planeGeometry args={[1.05, 0.025]} />
              <meshBasicMaterial color="#3d3126" transparent opacity={0.65} />
            </mesh>
          </React.Fragment>
        ))}

        {/* 3D RED WAX SEAL (Con dấu sáp đỏ) with embossed golden star */}
        <group position={[0, -1.35, 0.025]}>
          {/* Wax disc with uneven edge */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.32, 0.36, 0.05, 24]} />
            <meshStandardMaterial color="#8f1414" roughness={0.4} metalness={0.15} />
          </mesh>
          {/* Raised outer rim */}
          <mesh position={[0, 0, 0.03]}>
            <torusGeometry args={[0.26, 0.03, 12, 24]} />
            <meshStandardMaterial color="#a61a1a" roughness={0.35} />
          </mesh>
          {/* Embossed Golden Star in wax */}
          <mesh position={[0, 0, 0.035]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.02, 5]} />
            <meshStandardMaterial color="#e5b642" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Silk Ribbon tails hanging below */}
          <mesh position={[-0.08, -0.32, -0.01]} rotation={[0, 0, 0.12]}>
            <planeGeometry args={[0.14, 0.45]} />
            <meshBasicMaterial color="#7a0f0f" side={DoubleSide} />
          </mesh>
          <mesh position={[0.08, -0.32, -0.01]} rotation={[0, 0, -0.15]}>
            <planeGeometry args={[0.14, 0.45]} />
            <meshBasicMaterial color="#7a0f0f" side={DoubleSide} />
          </mesh>
        </group>
      </group>

      {/* ANTIQUE BRASS QUILL PEN (Bút lông ngỗng) */}
      <group position={[1.8, -0.6, 0.1]} rotation={[0.2, -0.15, 0.55]}>
        {/* White feather blade */}
        <mesh position={[0, 0.9, 0]}>
          <boxGeometry args={[0.22, 1.4, 0.02]} />
          <meshStandardMaterial color="#f7f3ea" roughness={0.9} />
        </mesh>
        {/* Central quill spine */}
        <mesh position={[0, 0.6, 0]}>
          <cylinderGeometry args={[0.015, 0.025, 1.8, 8]} />
          <meshStandardMaterial color="#dfd4c0" roughness={0.8} />
        </mesh>
        {/* Brass pen nib (Ngòi bút đồng) */}
        <mesh position={[0, -0.35, 0]}>
          <coneGeometry args={[0.03, 0.14, 8]} />
          <meshStandardMaterial color="#d4a838" metalness={0.85} roughness={0.2} />
        </mesh>
      </group>

      {/* INKWELL & MAGNIFYING GLASS */}
      <group position={[-1.75, -1.2, 0]}>
        {/* Brass Inkwell */}
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.22, 0.28, 0.32, 16]} />
          <meshStandardMaterial color="#c29838" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.32, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.06, 16]} />
          <meshStandardMaterial color="#2d2218" roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
}

// -------------------------------------------------------------
// 4. CONGRESS OF TOURS ROSTRUM & BALLOT BOX (12.1920)
// -------------------------------------------------------------
export function DetailedToursCongress({ active }: { active: boolean }) {
  return (
    <group visible={active} position={[0, -0.3, -0.2]}>
      {/* Neoclassical Architectural Columns in the background */}
      <group position={[0, 0.6, -1.8]}>
        {[-3.6, -1.8, 1.8, 3.6].map((x, i) => (
          <group key={i} position={[x, 0, 0]}>
            {/* Fluted Column Shaft */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.22, 0.25, 4.2, 24]} />
              <meshStandardMaterial color="#ded2bf" roughness={0.8} />
            </mesh>
            {/* Column Capital */}
            <mesh position={[0, 2.15, 0]}>
              <boxGeometry args={[0.62, 0.18, 0.62]} />
              <meshStandardMaterial color="#ebdcc7" roughness={0.7} />
            </mesh>
            {/* Column Base Plinth */}
            <mesh position={[0, -2.15, 0]}>
              <boxGeometry args={[0.68, 0.22, 0.68]} />
              <meshStandardMaterial color="#c7b79f" roughness={0.85} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Gilded Monumental "1920" Numerals floating in the backdrop */}
      <group position={[0, 1.8, -1.2]}>
        <mesh>
          <boxGeometry args={[2.4, 0.55, 0.1]} />
          <meshStandardMaterial color="#d4a338" metalness={0.85} roughness={0.25} />
        </mesh>
        <mesh position={[0, -0.38, 0]}>
          <planeGeometry args={[3.2, 0.2]} />
          <meshBasicMaterial color="#8f1818" />
        </mesh>
      </group>

      {/* Speaker's Wooden Rostrum / Podium (Bục phát biểu Đại hội Tours) */}
      <group position={[0, -0.4, 0.2]}>
        {/* Main carved wooden rostrum body */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.4, 1.25, 0.85]} />
          <meshStandardMaterial color="#382115" roughness={0.75} />
        </mesh>

        {/* Top slanted reading desk */}
        <mesh position={[0, 0.66, 0.05]} rotation={[-0.2, 0, 0]}>
          <boxGeometry args={[1.5, 0.08, 0.95]} />
          <meshStandardMaterial color="#4d2e1e" roughness={0.7} />
        </mesh>

        {/* Revolutionary Red Velvet Drape with Gold Bullion Trim */}
        <mesh position={[0, 0.08, 0.44]}>
          <planeGeometry args={[1.2, 0.95]} />
          <meshStandardMaterial color="#8c1212" roughness={0.8} />
        </mesh>
        {/* Golden fringe trim at bottom */}
        <mesh position={[0, -0.4, 0.45]}>
          <boxGeometry args={[1.22, 0.04, 0.02]} />
          <meshStandardMaterial color="#e5b842" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Historic Congress Ballot Box (Hòm phiếu biểu quyết Đại hội) */}
        <group position={[0.9, 0.1, 0.1]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.55, 0.45, 0.45]} />
            <meshStandardMaterial
              color="#543725"
              transparent
              opacity={0.7}
              roughness={0.3}
              metalness={0.4}
            />
          </mesh>
          {/* Wooden frames */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.58, 0.48, 0.48]} />
            <meshStandardMaterial color="#d4a838" metalness={0.8} wireframe />
          </mesh>
          {/* Glowing golden voting ballots inside */}
          <mesh position={[0, -0.08, 0]} rotation={[0.2, 0.4, 0]}>
            <boxGeometry args={[0.25, 0.03, 0.18]} />
            <meshBasicMaterial color="#fff0b3" />
          </mesh>
        </group>
      </group>
    </group>
  );
}

// -------------------------------------------------------------
// 5. GRAND 3D LOTUS FLOWER & BEVELED GOLDEN STAR (HOA SEN & SAO VÀNG)
// -------------------------------------------------------------
export function DetailedLotusAndStar({
  active,
  sceneBeat,
}: {
  active: boolean;
  sceneBeat: number;
}) {
  const lotusGroup = useRef<Group>(null);
  const starRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!active) return;
    if (lotusGroup.current) {
      lotusGroup.current.rotation.y += delta * 0.15;
    }
    if (starRef.current) {
      starRef.current.rotation.y += delta * 0.35;
      starRef.current.position.y = 1.35 + Math.sin(Date.now() * 0.002) * 0.08;
    }
  });

  return (
    <group visible={active} position={[0, -0.2, 0]}>
      {/* 3D BEVELED GOLDEN STAR (Ngôi sao vàng 5 cánh với các mặt vát nổi) */}
      <group ref={starRef} position={[0, 1.35, 0]} scale={1.2}>
        {/* Center beveled 5-point star */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.65, 0.65, 0.14, 5]} />
          <meshStandardMaterial
            color="#f7ca45"
            metalness={0.88}
            roughness={0.2}
            emissive="#a67714"
            emissiveIntensity={0.35}
          />
        </mesh>
        {/* Star golden aura flare */}
        <mesh>
          <sphereGeometry args={[0.82, 16, 16]} />
          <meshBasicMaterial color="#ffeaa7" transparent opacity={0.12} />
        </mesh>
      </group>

      {/* 3D BLOOMING LOTUS FLOWER (Hoa sen nở với các lớp cánh xếp tầng) */}
      <group ref={lotusGroup} position={[0, -0.6, 0]}>
        {/* Central Lotus Seedpod Receptacle (Gương sen vàng) */}
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.34, 0.24, 0.2, 24]} />
          <meshStandardMaterial color="#d4a838" roughness={0.4} metalness={0.5} />
        </mesh>

        {/* Ring of Golden Seeds on seedpod */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * Math.PI * 2) / 8;
          return (
            <mesh key={i} position={[Math.cos(angle) * 0.2, 0.33, Math.sin(angle) * 0.2]}>
              <sphereGeometry args={[0.035, 8, 8]} />
              <meshStandardMaterial color="#8f6b1e" metalness={0.8} />
            </mesh>
          );
        })}

        {/* LAYER 1: Inner Petals (6 cánh búp trong khum tròn) */}
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i * Math.PI * 2) / 6;
          return (
            <group key={i} rotation={[0, angle, 0]}>
              <mesh position={[0, 0.38, 0.32]} rotation={[0.42, 0, 0]} scale={[1, 1, 0.2]}>
                <cylinderGeometry args={[0.02, 0.16, 0.55, 6]} />
                <meshStandardMaterial color="#fffbf0" roughness={0.65} />
              </mesh>
            </group>
          );
        })}

        {/* LAYER 2: Mid Petals (8 cánh nở rạng rỡ) */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * Math.PI * 2) / 8 + 0.35;
          return (
            <group key={i} rotation={[0, angle, 0]}>
              <mesh position={[0, 0.28, 0.55]} rotation={[0.78, 0, 0]} scale={[1, 1, 0.18]}>
                <cylinderGeometry args={[0.02, 0.24, 0.72, 6]} />
                <meshStandardMaterial color="#fff8e8" roughness={0.65} />
              </mesh>
            </group>
          );
        })}

        {/* LAYER 3: Outer Gracefully Drooping Petals (10 cánh uốn cong thanh thoát) */}
        {Array.from({ length: 10 }).map((_, i) => {
          const angle = (i * Math.PI * 2) / 10;
          return (
            <group key={i} rotation={[0, angle, 0]}>
              <mesh position={[0, 0.12, 0.82]} rotation={[1.15, 0, 0]} scale={[1, 1, 0.16]}>
                <cylinderGeometry args={[0.02, 0.28, 0.85, 6]} />
                <meshStandardMaterial color="#ede0c7" roughness={0.7} />
              </mesh>
            </group>
          );
        })}

        {/* JADE GREEN LOTUS PAD (Lá sen xanh ngọc viền vàng) */}
        <mesh position={[0, -0.05, 0]}>
          <cylinderGeometry args={[1.45, 1.45, 0.03, 32]} />
          <meshStandardMaterial color="#1a3536" roughness={0.8} />
        </mesh>
        <mesh position={[0, -0.03, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.45, 0.02, 8, 32]} />
          <meshStandardMaterial color="#d4a838" metalness={0.75} roughness={0.3} />
        </mesh>
      </group>

      {/* 6 FACETED CONCEPT CRYSTAL PRISMS WITH CONNECTING ENERGY BEAMS */}
      <ConceptCrystalBeams active={active} sceneBeat={sceneBeat} />
    </group>
  );
}

function ConceptCrystalBeams({ active, sceneBeat }: { active: boolean; sceneBeat: number }) {
  const crystalNodes = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => {
      const angle = (i * Math.PI) / 3 - Math.PI / 2;
      const radius = 2.4;
      return new Vector3(Math.cos(angle) * radius, Math.sin(angle) * 0.85 + 0.2, Math.sin(angle) * 0.4);
    });
  }, []);

  return (
    <group visible={active}>
      {crystalNodes.map((pt, i) => (
        <group key={i} position={pt}>
          <mesh scale={i === sceneBeat ? 1.4 : 1.0}>
            <octahedronGeometry args={[0.18, 0]} />
            <meshStandardMaterial
              color={i === sceneBeat ? '#ffd700' : '#d4a838'}
              metalness={0.9}
              roughness={0.2}
              emissive={i === sceneBeat ? '#d48812' : '#000000'}
              emissiveIntensity={0.6}
            />
          </mesh>
          {/* Orbital light ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.26, 0.012, 8, 24]} />
            <meshBasicMaterial color="#ffe89e" transparent opacity={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
