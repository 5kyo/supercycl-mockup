import { useRef, useEffect } from "react";
import type { CSSProperties } from "react";
import * as THREE from "three";
import {
  SHELL_VERTEX,
  SHELL_FRAGMENT,
  PLASMA_VERTEX,
  PLASMA_FRAGMENT,
  PARTICLE_VERTEX,
  PARTICLE_FRAGMENT,
} from "./plasmaShaders";

// --- Constants ---
const PLASMA_SCALE = 0.1404;
const PLASMA_BRIGHTNESS = 1.31;
const VOID_THRESHOLD = 0.072;
const COLOR_DEEP = 0x041a00;
const COLOR_MID = 0x00de0b;
const COLOR_BRIGHT = 0x37ff00;
const SHELL_COLOR = 0x00de0b;
const SHELL_BACK_COLOR = 0x002900;
const SHELL_OPACITY = 0.41;
const SHELL_BACK_OPACITY = 0.3;
const TIME_SCALE = 0.78;
const ROTATION_SPEED_X = 0.002;
const ROTATION_SPEED_Y = 0.005;
const PARTICLE_COUNT = 600;
const SPHERE_RADIUS = 0.95;
const CAMERA_Z = 2.4;

interface Props {
  readonly style?: CSSProperties;
}

function createShellMaterials(): readonly [THREE.ShaderMaterial, THREE.ShaderMaterial] {
  const back = new THREE.ShaderMaterial({
    vertexShader: SHELL_VERTEX,
    fragmentShader: SHELL_FRAGMENT,
    uniforms: {
      uColor: { value: new THREE.Color(SHELL_BACK_COLOR) },
      uOpacity: { value: SHELL_BACK_OPACITY },
    },
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    depthWrite: false,
  });

  const front = new THREE.ShaderMaterial({
    vertexShader: SHELL_VERTEX,
    fragmentShader: SHELL_FRAGMENT,
    uniforms: {
      uColor: { value: new THREE.Color(SHELL_COLOR) },
      uOpacity: { value: SHELL_OPACITY },
    },
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.FrontSide,
    depthWrite: false,
  });

  return [back, front] as const;
}

function createPlasmaMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uScale: { value: PLASMA_SCALE },
      uBrightness: { value: PLASMA_BRIGHTNESS },
      uThreshold: { value: VOID_THRESHOLD },
      uColorDeep: { value: new THREE.Color(COLOR_DEEP) },
      uColorMid: { value: new THREE.Color(COLOR_MID) },
      uColorBright: { value: new THREE.Color(COLOR_BRIGHT) },
    },
    vertexShader: PLASMA_VERTEX,
    fragmentShader: PLASMA_FRAGMENT,
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
}

function createParticles(): { geometry: THREE.BufferGeometry; material: THREE.ShaderMaterial } {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const sizes = new Float32Array(PARTICLE_COUNT);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const r = SPHERE_RADIUS * Math.cbrt(Math.random());
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
    sizes[i] = Math.random();
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(0xffffff) },
    },
    vertexShader: PARTICLE_VERTEX,
    fragmentShader: PARTICLE_FRAGMENT,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  return { geometry, material };
}

function buildScene(scene: THREE.Scene) {
  const group = new THREE.Group();
  scene.add(group);

  const light = new THREE.PointLight(0x00de0b, 2.0, 10);
  group.add(light);

  // Shell
  const shellGeo = new THREE.SphereGeometry(1.0, 64, 64);
  const [shellBack, shellFront] = createShellMaterials();
  group.add(new THREE.Mesh(shellGeo, shellBack));
  group.add(new THREE.Mesh(shellGeo, shellFront));

  // Plasma
  const plasmaGeo = new THREE.SphereGeometry(0.998, 128, 128);
  const plasmaMat = createPlasmaMaterial();
  const plasmaMesh = new THREE.Mesh(plasmaGeo, plasmaMat);
  group.add(plasmaMesh);

  // Particles
  const { geometry: particleGeo, material: particleMat } = createParticles();
  group.add(new THREE.Points(particleGeo, particleMat));

  const geometries = [shellGeo, plasmaGeo, particleGeo];
  const materials = [shellBack, shellFront, plasmaMat, particleMat];

  return { group, plasmaMesh, plasmaMat, particleMat, geometries, materials };
}

export default function PlasmaOrb({ style }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100);
    camera.position.z = CAMERA_Z;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.9;
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%";

    const { group, plasmaMesh, plasmaMat, particleMat, geometries, materials } =
      buildScene(scene);

    // Resize
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      if (width === 0 || height === 0) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });
    observer.observe(container);

    // Animation
    let disposed = false;
    let animId = 0;
    const clock = new THREE.Clock();

    function animate() {
      if (disposed) return;
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      plasmaMat.uniforms.uTime.value = t * TIME_SCALE;
      particleMat.uniforms.uTime.value = t;
      plasmaMesh.rotation.y = t * 0.08;
      group.rotation.x += ROTATION_SPEED_X;
      group.rotation.y += ROTATION_SPEED_Y;

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(animId);
      observer.disconnect();
      for (const geo of geometries) geo.dispose();
      for (const mat of materials) mat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", width: "100%", height: "100%", ...style }}
    />
  );
}
