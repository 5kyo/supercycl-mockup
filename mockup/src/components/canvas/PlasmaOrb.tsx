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
const SHELL_OPACITY = 0.41;
const SHELL_BACK_OPACITY = 0.3;
const TIME_SCALE = 0.78;
const ROTATION_SPEED_X = 0.002;
const ROTATION_SPEED_Y = 0.005;
const PARTICLE_COUNT = 600;
const SPHERE_RADIUS = 0.95;
const CAMERA_Z = 2.4;
const COLOR_LERP_SPEED = 1.5; // per second

type OrbVariant = "green" | "warm";

interface ColorTheme {
  readonly deep: THREE.Color;
  readonly mid: THREE.Color;
  readonly bright: THREE.Color;
  readonly shell: THREE.Color;
  readonly shellBack: THREE.Color;
  readonly light: THREE.Color;
  readonly particle: THREE.Color;
}

const THEMES: Record<OrbVariant, ColorTheme> = {
  green: {
    deep: new THREE.Color(0x041a00),
    mid: new THREE.Color(0x00de0b),
    bright: new THREE.Color(0x37ff00),
    shell: new THREE.Color(0x00de0b),
    shellBack: new THREE.Color(0x002900),
    light: new THREE.Color(0x00de0b),
    particle: new THREE.Color(0xffffff),
  },
  warm: {
    deep: new THREE.Color(0x1a1000),
    mid: new THREE.Color(0xc89b00),
    bright: new THREE.Color(0xf0d060),
    shell: new THREE.Color(0xc89b00),
    shellBack: new THREE.Color(0x291e00),
    light: new THREE.Color(0xc89b00),
    particle: new THREE.Color(0xfff0c0),
  },
};

interface Props {
  readonly style?: CSSProperties;
  readonly variant?: OrbVariant;
}

function createShellMaterials(theme: ColorTheme): readonly [THREE.ShaderMaterial, THREE.ShaderMaterial] {
  const back = new THREE.ShaderMaterial({
    vertexShader: SHELL_VERTEX,
    fragmentShader: SHELL_FRAGMENT,
    uniforms: {
      uColor: { value: theme.shellBack.clone() },
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
      uColor: { value: theme.shell.clone() },
      uOpacity: { value: SHELL_OPACITY },
    },
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.FrontSide,
    depthWrite: false,
  });

  return [back, front] as const;
}

function createPlasmaMaterial(theme: ColorTheme): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uScale: { value: PLASMA_SCALE },
      uBrightness: { value: PLASMA_BRIGHTNESS },
      uThreshold: { value: VOID_THRESHOLD },
      uColorDeep: { value: theme.deep.clone() },
      uColorMid: { value: theme.mid.clone() },
      uColorBright: { value: theme.bright.clone() },
    },
    vertexShader: PLASMA_VERTEX,
    fragmentShader: PLASMA_FRAGMENT,
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
}

function createParticles(theme: ColorTheme): { geometry: THREE.BufferGeometry; material: THREE.ShaderMaterial } {
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
      uColor: { value: theme.particle.clone() },
    },
    vertexShader: PARTICLE_VERTEX,
    fragmentShader: PARTICLE_FRAGMENT,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  return { geometry, material };
}

function buildScene(scene: THREE.Scene, theme: ColorTheme) {
  const group = new THREE.Group();
  scene.add(group);

  const light = new THREE.PointLight(theme.light.getHex(), 2.0, 10);
  group.add(light);

  // Shell
  const shellGeo = new THREE.SphereGeometry(1.0, 64, 64);
  const [shellBack, shellFront] = createShellMaterials(theme);
  group.add(new THREE.Mesh(shellGeo, shellBack));
  group.add(new THREE.Mesh(shellGeo, shellFront));

  // Plasma
  const plasmaGeo = new THREE.SphereGeometry(0.998, 128, 128);
  const plasmaMat = createPlasmaMaterial(theme);
  const plasmaMesh = new THREE.Mesh(plasmaGeo, plasmaMat);
  group.add(plasmaMesh);

  // Particles
  const { geometry: particleGeo, material: particleMat } = createParticles(theme);
  group.add(new THREE.Points(particleGeo, particleMat));

  const geometries = [shellGeo, plasmaGeo, particleGeo];
  const materials = [shellBack, shellFront, plasmaMat, particleMat];

  return { group, light, plasmaMesh, shellBack, shellFront, plasmaMat, particleMat, geometries, materials };
}

function lerpColor(current: THREE.Color, target: THREE.Color, alpha: number): void {
  current.r += (target.r - current.r) * alpha;
  current.g += (target.g - current.g) * alpha;
  current.b += (target.b - current.b) * alpha;
}

export default function PlasmaOrb({ style, variant = "green" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const variantRef = useRef<OrbVariant>(variant);
  variantRef.current = variant;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const initialTheme = THEMES[variantRef.current];

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

    const { group, light, plasmaMesh, shellBack, shellFront, plasmaMat, particleMat, geometries, materials } =
      buildScene(scene, initialTheme);

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
      const dt = clock.getDelta();
      const t = clock.getElapsedTime();

      // Lerp colors toward target theme
      const target = THEMES[variantRef.current];
      const alpha = Math.min(1, dt * COLOR_LERP_SPEED);

      lerpColor(plasmaMat.uniforms.uColorDeep.value, target.deep, alpha);
      lerpColor(plasmaMat.uniforms.uColorMid.value, target.mid, alpha);
      lerpColor(plasmaMat.uniforms.uColorBright.value, target.bright, alpha);
      lerpColor(shellFront.uniforms.uColor.value, target.shell, alpha);
      lerpColor(shellBack.uniforms.uColor.value, target.shellBack, alpha);
      lerpColor(particleMat.uniforms.uColor.value, target.particle, alpha);
      lerpColor(light.color, target.light, alpha);

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
