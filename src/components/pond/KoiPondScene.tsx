"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import {
  createKoiBodyGeometry,
  createKoiTailGeometry,
  makeKoiPath,
} from "@/components/pond/koi";
import { type Season,SEASON_SCENE } from "@/lib/season/types";

interface SceneProps {
  season: Season;
}

/**
 * Top-level Three canvas. Mounts an ortho-ish perspective camera looking
 * straight down at the pond plane and dispatches the rest to subcomponents.
 *
 * The wrapping div is positioned `absolute inset-0` so the canvas fills the
 * hero section without affecting layout.
 */
export default function KoiPondScene({ season }: SceneProps) {
  return (
    <Canvas
      shadows={false}
      dpr={[1, 1.6]}
      camera={{ position: [0, 3.4, 0.6], fov: 38, near: 0.1, far: 50 }}
      gl={{
        antialias: true,
        alpha: true,
        premultipliedAlpha: false,
        powerPreference: "high-performance",
      }}
      style={{ position: "absolute", inset: 0 }}
    >
      <SceneContents season={season} />
    </Canvas>
  );
}

function SceneContents({ season }: SceneProps) {
  const palette = SEASON_SCENE[season];
  const { gl, camera } = useThree();

  useEffect(() => {
    camera.lookAt(0, 0, 0);
  }, [camera]);

  // Transparent clear so the painted SVG scenery underneath shows through.
  // The pond water is now drawn by the SVG layer; this scene only adds
  // koi, lotus highlights, and ripples on top.
  useEffect(() => {
    gl.setClearColor(new THREE.Color(palette.sky), 0);
  }, [gl, palette.sky]);

  return (
    <>
      <ambientLight intensity={0.75} color={new THREE.Color(palette.sky)} />
      <directionalLight
        position={[3, 6, 2]}
        intensity={1.05}
        color={new THREE.Color(palette.sky)}
      />
      <hemisphereLight
        args={[new THREE.Color(palette.sky), new THREE.Color(palette.waterDeep), 0.55]}
      />

      <Water palette={palette} />
      <KoiSchool palette={palette} />
    </>
  );
}

/**
 * The water surface plus mouse-driven ripple system.
 *
 * Implementation notes:
 *  - The water itself is a single MeshBasicMaterial with a procedural canvas
 *    texture that we re-tint per palette change (cheaper than a custom shader,
 *    fine for a portfolio hero).
 *  - Pointer ripples are a small object pool of 12 ring meshes that fade out
 *    over their lifetime — so we never create / GC meshes during interaction.
 */
function Water({ palette }: { palette: (typeof SEASON_SCENE)[Season] }) {
  const groupRef = useRef<THREE.Group>(null);

  // The texture is now a *transparent* caustics overlay that floats on
  // top of the painted SVG pond beneath the canvas. We no longer fill
  // the surface with a solid water color — that would obscure the
  // painterly background. Only specular streaks + a faint wash remain.
  const waterTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    // A very faint tint so the canvas isn't a hard cut-out — picks up
    // some of the water color so the koi feel "in" the pond.
    ctx.fillStyle = palette.water;
    ctx.globalAlpha = 0.18;
    ctx.fillRect(0, 0, 512, 512);
    ctx.globalAlpha = 1;

    ctx.globalCompositeOperation = "lighter";
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 1.4;
    for (let i = 0; i < 70; i += 1) {
      const x1 = Math.random() * 512;
      const y1 = Math.random() * 512;
      const x2 = x1 + (Math.random() - 0.5) * 240;
      const y2 = y1 + (Math.random() - 0.5) * 80;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.bezierCurveTo(
        x1 + 40,
        y1 + 20,
        x2 - 40,
        y2 - 20,
        x2,
        y2
      );
      ctx.stroke();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.anisotropy = 4;
    return tex;
  }, [palette.water]);

  useEffect(
    () => () => {
      waterTexture.dispose();
    },
    [waterTexture]
  );

  // Pointer ripple pool.
  const RIPPLE_COUNT = 16;
  interface Ripple {
    mesh: THREE.Mesh<THREE.RingGeometry, THREE.MeshBasicMaterial>;
    born: number;
    duration: number;
    active: boolean;
  }
  const ripplesRef = useRef<Ripple[]>([]);
  const pointerWorld = useRef(new THREE.Vector3());
  const lastSpawn = useRef(0);

  useEffect(() => {
    const group = groupRef.current;
    const ripples: Ripple[] = [];
    for (let i = 0; i < RIPPLE_COUNT; i += 1) {
      const geo = new THREE.RingGeometry(0.05, 0.07, 48);
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(palette.sky),
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.y = 0.011;
      mesh.visible = false;
      group?.add(mesh);
      ripples.push({ mesh, born: 0, duration: 1, active: false });
    }
    ripplesRef.current = ripples;
    return () => {
      ripples.forEach((r) => {
        r.mesh.geometry.dispose();
        r.mesh.material.dispose();
        group?.remove(r.mesh);
      });
      ripplesRef.current = [];
    };
  }, [palette.sky]);

  // Re-tint ripples when season changes (without recreating them).
  useEffect(() => {
    ripplesRef.current.forEach((r) => {
      r.mesh.material.color = new THREE.Color(palette.sky);
    });
  }, [palette.sky]);

  // Track pointer in world coords on the water plane.
  const { camera } = useThree();
  useEffect(() => {
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

    const onMove = (e: PointerEvent) => {
      const target = e.target as HTMLCanvasElement | null;
      if (!target?.getBoundingClientRect) return;
      const rect = target.getBoundingClientRect();
      ndc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      ndc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(ndc, camera);
      const hit = new THREE.Vector3();
      if (raycaster.ray.intersectPlane(plane, hit)) {
        pointerWorld.current.copy(hit);
        spawnRipple();
      }
    };
    const onLeave = () => {
      // No-op; ripples just stop spawning naturally.
    };

    function spawnRipple() {
      const now = performance.now() / 1000;
      // Throttle to ~12 ripples per second max.
      if (now - lastSpawn.current < 0.08) return;
      lastSpawn.current = now;
      const ripple = ripplesRef.current.find((r) => !r.active);
      if (!ripple) return;
      ripple.active = true;
      ripple.born = now;
      ripple.duration = 1.6 + Math.random() * 0.6;
      ripple.mesh.position.set(
        pointerWorld.current.x,
        0.011,
        pointerWorld.current.z
      );
      ripple.mesh.scale.setScalar(1);
      ripple.mesh.material.opacity = 0.45;
      ripple.mesh.visible = true;
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [camera]);

  useFrame((_, delta) => {
    waterTexture.offset.x += delta * 0.012;
    waterTexture.offset.y += delta * 0.008;

    const now = performance.now() / 1000;
    ripplesRef.current.forEach((r) => {
      if (!r.active) return;
      const age = now - r.born;
      const t = age / r.duration;
      if (t >= 1) {
        r.active = false;
        r.mesh.visible = false;
        return;
      }
      const radius = 0.1 + t * 1.5;
      r.mesh.scale.setScalar(radius);
      r.mesh.material.opacity = 0.45 * (1 - t) ** 1.4;
    });
  });

  return (
    <group ref={groupRef}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[16, 16, 1, 1]} />
        <meshBasicMaterial map={waterTexture} transparent />
      </mesh>
    </group>
  );
}

function KoiSchool({
  palette,
}: {
  palette: (typeof SEASON_SCENE)[Season];
}) {
  const bodyGeo = useMemo(() => createKoiBodyGeometry(), []);
  const tailGeo = useMemo(() => createKoiTailGeometry(), []);

  useEffect(
    () => () => {
      bodyGeo.dispose();
      tailGeo.dispose();
    },
    [bodyGeo, tailGeo]
  );

  // Five koi with varied colors / sizes / paths.
  const koi = useMemo(
    () =>
      [
        { color: palette.koiA, scale: 1.0, seed: 0.6 },
        { color: palette.koiB, scale: 0.85, seed: 1.7 },
        { color: palette.koiA, scale: 1.1, seed: 2.4 },
        { color: palette.koiB, scale: 0.9, seed: 3.1 },
        { color: palette.koiA, scale: 0.95, seed: 4.5 },
      ].map((k) => ({
        ...k,
        path: makeKoiPath(k.seed),
        tStart: Math.random(),
      })),
    [palette.koiA, palette.koiB]
  );

  return (
    <group>
      {koi.map((k, i) => (
        <Koi
          key={i}
          color={k.color}
          scale={k.scale}
          path={k.path}
          tStart={k.tStart}
          bodyGeo={bodyGeo}
          tailGeo={tailGeo}
        />
      ))}
    </group>
  );
}

function Koi({
  color,
  scale,
  path,
  tStart,
  bodyGeo,
  tailGeo,
}: {
  color: string;
  scale: number;
  path: ReturnType<typeof makeKoiPath>;
  tStart: number;
  bodyGeo: THREE.BufferGeometry;
  tailGeo: THREE.BufferGeometry;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const tailRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const elapsed = state.clock.elapsedTime;
    const t = ((elapsed / path.duration) + tStart) % 1;
    const { position, tangent } = path.sample(t);
    groupRef.current.position.x = position.x;
    groupRef.current.position.z = position.y;
    // Smoothly rotate to face tangent direction (atan2 over the XZ plane).
    const targetYaw = Math.atan2(tangent.x, tangent.y);
    const current = groupRef.current.rotation.y;
    const wrapped = THREE.MathUtils.lerp(
      current,
      // shortest-arc lerp
      current + ((targetYaw - current + Math.PI * 3) % (Math.PI * 2)) - Math.PI,
      0.12
    );
    groupRef.current.rotation.y = wrapped;
    // Gentle vertical wobble.
    groupRef.current.position.y = 0.02 + Math.sin(elapsed * 1.4 + tStart * 6) * 0.01;
    // Tail wag.
    if (tailRef.current) {
      tailRef.current.rotation.y = Math.sin(elapsed * 6 + tStart * 9) * 0.7;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      <mesh geometry={bodyGeo}>
        <meshStandardMaterial
          color={new THREE.Color(color)}
          roughness={0.45}
          metalness={0.05}
        />
      </mesh>
      <mesh
        ref={tailRef}
        geometry={tailGeo}
        position={[0, 0, -0.4]}
        scale={[1, 1, 1]}
      >
        <meshStandardMaterial
          color={new THREE.Color(color)}
          transparent
          opacity={0.85}
          roughness={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Subtle white belly highlight */}
      <mesh position={[0, -0.06, 0]}>
        <sphereGeometry args={[0.18, 12, 8]} />
        <meshStandardMaterial
          color={new THREE.Color("#ffffff")}
          transparent
          opacity={0.35}
          roughness={0.5}
        />
      </mesh>
    </group>
  );
}
