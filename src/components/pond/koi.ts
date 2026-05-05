import * as THREE from "three";

/**
 * Helpers for procedurally building koi geometries and pond decorations.
 *
 * Everything here is deliberately small and CPU-cheap. We avoid loading
 * external models so the hero stays self-contained and predictable.
 */

/**
 * Ovoid koi body: sphere stretched along Z, slightly squashed on Y.
 * Returns a fresh geometry the caller is responsible for disposing.
 */
export function createKoiBodyGeometry(): THREE.BufferGeometry {
  const geometry = new THREE.SphereGeometry(0.25, 24, 16);
  geometry.scale(0.7, 0.55, 1.6);
  // Pull the head into a slight point.
  const pos = geometry.attributes.position;
  for (let i = 0; i < pos.count; i += 1) {
    const z = pos.getZ(i);
    if (z > 0.25) {
      pos.setX(i, pos.getX(i) * 0.85);
      pos.setY(i, pos.getY(i) * 0.85);
    }
  }
  pos.needsUpdate = true;
  geometry.computeVertexNormals();
  return geometry;
}

/**
 * Translucent triangular tail fin, attached behind the koi body.
 */
export function createKoiTailGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(-0.18, 0.18);
  shape.quadraticCurveTo(-0.3, 0, -0.18, -0.18);
  shape.lineTo(0, 0);
  const geometry = new THREE.ShapeGeometry(shape);
  geometry.rotateY(Math.PI / 2);
  return geometry;
}

/**
 * Lotus pad: a flat disc with a pie-slice missing, sitting on the water.
 */
export function createLotusPadGeometry(radius = 0.6): THREE.BufferGeometry {
  const geometry = new THREE.CircleGeometry(radius, 36, Math.PI * 0.18, Math.PI * 1.82);
  geometry.rotateX(-Math.PI / 2);
  return geometry;
}

/** Small lotus blossom approximated by stacked triangles. */
export function createLotusBlossomGeometry(): THREE.BufferGeometry {
  const geometry = new THREE.ConeGeometry(0.12, 0.18, 6, 1, true);
  geometry.rotateX(Math.PI);
  geometry.translate(0, 0.05, 0);
  return geometry;
}

/**
 * A bezier-ish closed loop on the water plane. Returns a function that maps
 * `t` ∈ [0, 1] to a point on the loop, plus tangent for orientation.
 */
export interface KoiPath {
  sample: (t: number) => { position: THREE.Vector2; tangent: THREE.Vector2 };
  duration: number;
}

export function makeKoiPath(seed: number): KoiPath {
  // Gentle elliptical loops with phase + size jitter so each koi feels unique.
  const a = 2.4 + (seed * 0.37) % 1.2;
  const b = 1.6 + (seed * 0.51) % 0.8;
  const phase = (seed * 1.31) % (Math.PI * 2);
  const cx = (Math.cos(seed * 2.1) * 0.6) - 0.1;
  const cy = (Math.sin(seed * 1.7) * 0.4) + 0.05;

  return {
    duration: 16 + ((seed * 3.7) % 8),
    sample(t: number) {
      const angle = t * Math.PI * 2 + phase;
      const x = cx + Math.cos(angle) * a + Math.cos(angle * 2) * 0.15;
      const y = cy + Math.sin(angle) * b + Math.sin(angle * 3) * 0.08;
      const tx = -Math.sin(angle) * a - Math.sin(angle * 2) * 0.3;
      const ty = Math.cos(angle) * b + Math.cos(angle * 3) * 0.24;
      const tangent = new THREE.Vector2(tx, ty).normalize();
      return { position: new THREE.Vector2(x, y), tangent };
    },
  };
}
