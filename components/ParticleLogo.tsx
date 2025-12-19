import React, { useMemo, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import meshData from '@/mesh-edited.json';
import { useTheme } from './ThemeContext';

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const PARTICLE_COUNT = 5000; // Reduced for cleaner, less dense look
const FLOATING_PARTICLE_COUNT = 200; // Floating particles for space/parallax feel
const TOTAL_PARTICLES = PARTICLE_COUNT + FLOATING_PARTICLE_COUNT;

// Theme Colors Definition
const COLORS = {
  dark: {
    primary: new THREE.Color('#dce6f0'),       // Matching original texture tint (looks White/Silver)
    outline: new THREE.Color('#f1f5f9'),       // Even lighter for outline
    floating: new THREE.Color('#94a3b8'),      // Slate-400 (lighter than Gray-500)
    glowPrimary: new THREE.Color('#ffffff'),   // Pure White (No Green)
    glowOutline: new THREE.Color('#ffffff'),   // Pure White (No Green)
  },
  light: {
    primary: new THREE.Color('#2eb886'),       // Vibrant Light Teal-Green
    outline: new THREE.Color('#4cd1a3'),       // Lighter Teal
    floating: new THREE.Color('#81e4c4'),      // Pale Teal
    glowPrimary: new THREE.Color('#10b981'),   // Emerald-500
    glowOutline: new THREE.Color('#34d399'),   // Emerald-400
  }
};

const MOUSE_INFLUENCE_RADIUS = 1.8; // Smaller area of effect
const MOUSE_ATTRACTION_STRENGTH = 0.25; // Stronger attraction
const MOUSE_ATTRACTION_LIMIT = 0.9; // Allow more movement toward mouse
const RETURN_FORCE = 0.06; // Slower return for more fluid motion

// Scale factor to fit the mesh nicely in the viewport (similar to original N logo size)
const MESH_SCALE = 2.5;

// -----------------------------------------------------------------------------
// Helper: Geometry Generation from Mesh
// -----------------------------------------------------------------------------

// Calculate triangle areas for weighted random sampling
const calculateTriangleAreas = (vertices: number[], indices: number[]) => {
  const areas: number[] = [];
  const triangleCount = indices.length / 3;

  for (let i = 0; i < triangleCount; i++) {
    const i0 = indices[i * 3];
    const i1 = indices[i * 3 + 1];
    const i2 = indices[i * 3 + 2];

    const v0 = new THREE.Vector3(
      vertices[i0 * 3],
      vertices[i0 * 3 + 1],
      vertices[i0 * 3 + 2]
    );
    const v1 = new THREE.Vector3(
      vertices[i1 * 3],
      vertices[i1 * 3 + 1],
      vertices[i1 * 3 + 2]
    );
    const v2 = new THREE.Vector3(
      vertices[i2 * 3],
      vertices[i2 * 3 + 1],
      vertices[i2 * 3 + 2]
    );

    // Calculate triangle area using cross product
    const edge1 = new THREE.Vector3().subVectors(v1, v0);
    const edge2 = new THREE.Vector3().subVectors(v2, v0);
    const cross = new THREE.Vector3().crossVectors(edge1, edge2);
    const area = cross.length() * 0.5;

    areas.push(area);
  }

  return areas;
};

// Sample a random point on a triangle using barycentric coordinates
const samplePointOnTriangle = (
  v0: THREE.Vector3,
  v1: THREE.Vector3,
  v2: THREE.Vector3
): THREE.Vector3 => {
  let r1 = Math.random();
  let r2 = Math.random();

  // Ensure point is inside triangle
  if (r1 + r2 > 1) {
    r1 = 1 - r1;
    r2 = 1 - r2;
  }

  const r3 = 1 - r1 - r2;

  return new THREE.Vector3(
    v0.x * r1 + v1.x * r2 + v2.x * r3,
    v0.y * r1 + v1.y * r2 + v2.y * r3,
    v0.z * r1 + v1.z * r2 + v2.z * r3
  );
};

// Check if a point is near the edge of a triangle
const isNearEdge = (
  point: THREE.Vector3,
  v0: THREE.Vector3,
  v1: THREE.Vector3,
  v2: THREE.Vector3,
  threshold: number = 0.15
): boolean => {
  // Calculate barycentric coordinates
  const edge1 = new THREE.Vector3().subVectors(v1, v0);
  const edge2 = new THREE.Vector3().subVectors(v2, v0);
  const vp = new THREE.Vector3().subVectors(point, v0);

  const d00 = edge1.dot(edge1);
  const d01 = edge1.dot(edge2);
  const d11 = edge2.dot(edge2);
  const d20 = vp.dot(edge1);
  const d21 = vp.dot(edge2);

  const denom = d00 * d11 - d01 * d01;
  const v = (d11 * d20 - d01 * d21) / denom;
  const w = (d00 * d21 - d01 * d20) / denom;
  const u = 1 - v - w;

  // Point is near edge if any barycentric coordinate is close to 0
  return u < threshold || v < threshold || w < threshold;
};

const generateMeshPoints = (count: number) => {
  const points: any[] = [];
  const vertices = meshData.vertices;
  const indices = meshData.indices;

  // Calculate triangle areas for weighted sampling
  const areas = calculateTriangleAreas(vertices, indices);
  const totalArea = areas.reduce((sum, area) => sum + area, 0);

  // Create cumulative distribution for weighted random sampling
  const cumulativeAreas: number[] = [];
  let cumulative = 0;
  for (const area of areas) {
    cumulative += area / totalArea;
    cumulativeAreas.push(cumulative);
  }

  // Calculate mesh center for centering
  let centerX = 0, centerY = 0, centerZ = 0;
  const vertexCount = vertices.length / 3;
  for (let i = 0; i < vertexCount; i++) {
    centerX += vertices[i * 3];
    centerY += vertices[i * 3 + 1];
    centerZ += vertices[i * 3 + 2];
  }
  centerX /= vertexCount;
  centerY /= vertexCount;
  centerZ /= vertexCount;

  for (let i = 0; i < count; i++) {
    // Weighted random triangle selection based on area
    const rand = Math.random();
    let triangleIndex = cumulativeAreas.findIndex(c => rand <= c);
    if (triangleIndex === -1) triangleIndex = cumulativeAreas.length - 1;

    // Get triangle vertices
    const i0 = indices[triangleIndex * 3];
    const i1 = indices[triangleIndex * 3 + 1];
    const i2 = indices[triangleIndex * 3 + 2];

    const v0 = new THREE.Vector3(
      vertices[i0 * 3],
      vertices[i0 * 3 + 1],
      vertices[i0 * 3 + 2]
    );
    const v1 = new THREE.Vector3(
      vertices[i1 * 3],
      vertices[i1 * 3 + 1],
      vertices[i1 * 3 + 2]
    );
    const v2 = new THREE.Vector3(
      vertices[i2 * 3],
      vertices[i2 * 3 + 1],
      vertices[i2 * 3 + 2]
    );

    // Sample random point on triangle
    const point = samplePointOnTriangle(v0, v1, v2);

    // Center and scale the point
    const x = (point.x - centerX) * MESH_SCALE;
    const y = (point.y - centerY) * MESH_SCALE;
    const z = (point.z - centerZ) * MESH_SCALE;

    // Determine if this is an outline particle (near triangle edges)
    const isOutline = isNearEdge(point, v0, v1, v2);

    // Add slight depth variation for volume
    const zVolume = (Math.random() - 0.5) * 0.1;

    points.push({
      initialX: x,
      initialY: y,
      initialZ: z + zVolume,
      x, y, z: z + zVolume,
      isOutline,
      isFloating: false,
      // Random phase for animation
      phase: Math.random() * Math.PI * 2,
      // Velocity for floating particles
      vx: 0,
      vy: 0,
      vz: 0,
    });
  }

  // Add floating particles that drift around the symbol - spread in depth for parallax
  for (let i = 0; i < FLOATING_PARTICLE_COUNT; i++) {
    // Start near random positions on the mesh but offset outward
    const baseIndex = Math.floor(Math.random() * count);
    const basePoint = points[baseIndex];

    // Offset from the symbol surface - wider spread
    const angle = Math.random() * Math.PI * 2;
    const radius = 0.5 + Math.random() * 2.5; // Wider spread
    const x = basePoint.initialX + Math.cos(angle) * radius;
    const y = basePoint.initialY + Math.sin(angle) * radius;
    // Much more Z depth spread for parallax - some in front, some behind
    const z = basePoint.initialZ + (Math.random() - 0.5) * 4.0;

    // Vary size based on depth (further = smaller for perspective)
    const depthFactor = (z + 2) / 4; // Normalize to 0-1 range roughly

    points.push({
      initialX: x,
      initialY: y,
      initialZ: z,
      x, y, z,
      isOutline: false,
      isFloating: true,
      depthFactor: Math.max(0.3, Math.min(1, depthFactor)), // Clamp between 0.3-1
      phase: Math.random() * Math.PI * 2,
      // Random drift velocity - slower
      vx: (Math.random() - 0.5) * 0.006,
      vy: (Math.random() - 0.5) * 0.006,
      vz: (Math.random() - 0.5) * 0.003,
    });
  }

  return points;
};

// -----------------------------------------------------------------------------
// Component: Particles
// -----------------------------------------------------------------------------

const Particles: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
  const { viewport, mouse } = useThree();
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Generate Texture - neutral white glow (color comes from instanceColor)
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const context = canvas.getContext('2d');
    if (context) {
      // Soft white glow texture - must be pure white for clean tinting
      const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.6)'); // Neutral pure white
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      context.fillStyle = gradient;
      context.fillRect(0, 0, 32, 32);
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  const particles = useMemo(() => generateMeshPoints(PARTICLE_COUNT), []);
  const themeColors = COLORS[theme];

  // Simulation State
  const state = useMemo(() => {
    const pos = new Float32Array(TOTAL_PARTICLES * 3);
    const original = new Float32Array(TOTAL_PARTICLES * 3);
    const colors = new Float32Array(TOTAL_PARTICLES * 3);
    const velocities = new Float32Array(TOTAL_PARTICLES * 3);

    particles.forEach((p, i) => {
      pos[i * 3] = p.x;
      pos[i * 3 + 1] = p.y;
      pos[i * 3 + 2] = p.z;

      original[i * 3] = p.initialX;
      original[i * 3 + 1] = p.initialY;
      original[i * 3 + 2] = p.initialZ;

      velocities[i * 3] = p.vx;
      velocities[i * 3 + 1] = p.vy;
      velocities[i * 3 + 2] = p.vz;

      const color = p.isFloating ? themeColors.floating : (p.isOutline ? themeColors.outline : themeColors.primary);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    });
    return { pos, original, colors, velocities };
  }, [particles, theme]); // Re-calculate when theme changes to bake initial colors

  // Keep track of current theme colors for the animation loop
  const currentColors = useRef(COLORS[theme]);
  useEffect(() => {
    currentColors.current = COLORS[theme];
  }, [theme]);

  useFrame((clockState) => {
    if (!meshRef.current) return;
    const time = clockState.clock.getElapsedTime();
    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;

    for (let i = 0; i < TOTAL_PARTICLES; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      let px = state.pos[ix];
      let py = state.pos[iy];
      let pz = state.pos[iz];

      const ox = state.original[ix];
      const oy = state.original[iy];
      const oz = state.original[iz];

      const isFloating = particles[i].isFloating;

      if (isFloating) {
        // Floating particles: drift freely with gentle motion
        let vx = state.velocities[ix];
        let vy = state.velocities[iy];
        let vz = state.velocities[iz];

        // Add very gentle swirling motion - slow and dreamy
        vx += Math.sin(time * 0.2 + i) * 0.00008;
        vy += Math.cos(time * 0.15 + i * 0.5) * 0.00008;
        vz += Math.sin(time * 0.1 + i * 0.3) * 0.00005;

        // Mouse attraction for floating particles (gentler effect)
        const dx = mouseX - px;
        const dy = mouseY - py;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);

        if (distToMouse < MOUSE_INFLUENCE_RADIUS * 1.5) {
          const influence = 1 - distToMouse / (MOUSE_INFLUENCE_RADIUS * 1.5);
          vx += (dx / distToMouse) * influence * 0.002;
          vy += (dy / distToMouse) * influence * 0.002;
        }

        // Apply velocity with damping
        px += vx;
        py += vy;
        pz += vz;

        // Gentle pull back toward original area (very weak)
        px += (ox - px) * 0.001;
        py += (oy - py) * 0.001;
        pz += (oz - pz) * 0.001;

        // Stronger damping for slower movement
        vx *= 0.98;
        vy *= 0.98;
        vz *= 0.98;

        state.velocities[ix] = vx;
        state.velocities[iy] = vy;
        state.velocities[iz] = vz;

        state.pos[ix] = px;
        state.pos[iy] = py;
        state.pos[iz] = pz;

        dummy.position.set(px, py, pz);

        // Floating particles: size varies by depth for parallax effect
        const depthFactor = particles[i].depthFactor || 0.5;
        const baseFloatScale = 0.025 + depthFactor * 0.04; // Closer = bigger
        const floatScale = baseFloatScale + Math.sin(time * 1.5 + i) * 0.008;
        dummy.scale.set(floatScale, floatScale, floatScale);

        // Color: dim color, glow green near mouse - also dimmer when further back
        const cFloating = currentColors.current.floating;
        const cGlow = currentColors.current.glowPrimary;

        let glowIntensity = 0;
        if (distToMouse < MOUSE_INFLUENCE_RADIUS * 1.5) {
          glowIntensity = (1 - distToMouse / (MOUSE_INFLUENCE_RADIUS * 1.5)) * 0.7;
        }
        // Dimmer when further back (lower depthFactor)
        const dimFactor = 0.4 + depthFactor * 0.6;
        const baseR = cFloating.r * dimFactor;
        const baseG = cFloating.g * dimFactor;
        const baseB = cFloating.b * dimFactor;
        const r = baseR + (cGlow.r - baseR) * glowIntensity;
        const g = baseG + (cGlow.g - baseG) * glowIntensity;
        const b = baseB + (cGlow.b - baseB) * glowIntensity;
        meshRef.current.setColorAt(i, new THREE.Color(r, g, b));
      } else {
        // Regular symbol particles
        // 1. "Thinking" Jitter
        const jitterSpeed = 4.0;
        const jitterAmp = particles[i].isOutline ? 0.005 : 0.015;
        const jx = Math.sin(time * jitterSpeed + i) * jitterAmp;
        const jy = Math.cos(time * jitterSpeed * 0.9 + i * 2) * jitterAmp;
        const jz = Math.sin(time * jitterSpeed * 1.1 + i * 3) * jitterAmp;

        // 2. "Breathing" Flow
        const flowPhase = time * 0.5 + ox * 0.5;
        const flow = Math.sin(flowPhase) * 0.03;

        // Calculate Target Position
        const targetX = ox + jx + flow;
        const targetY = oy + jy + flow * 0.5;
        const targetZ = oz + jz;

        // 3. Mouse Interaction (Attraction with limit to keep formation)
        const dx = mouseX - ox;
        const dy = mouseY - oy;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);

        let attractX = 0, attractY = 0, attractZ = 0;
        let glowIntensity = 0;

        if (distToMouse < MOUSE_INFLUENCE_RADIUS) {
          const influence = 1 - distToMouse / MOUSE_INFLUENCE_RADIUS;
          glowIntensity = influence;

          const dirX = dx / distToMouse;
          const dirY = dy / distToMouse;

          const attractionAmount = influence * MOUSE_ATTRACTION_STRENGTH;
          attractX = dirX * attractionAmount * MOUSE_ATTRACTION_LIMIT;
          attractY = dirY * attractionAmount * MOUSE_ATTRACTION_LIMIT;

          attractZ = influence * 0.15;
        }

        const finalTargetX = targetX + attractX;
        const finalTargetY = targetY + attractY;
        const finalTargetZ = targetZ + attractZ;

        px += (finalTargetX - px) * RETURN_FORCE;
        py += (finalTargetY - py) * RETURN_FORCE;
        pz += (finalTargetZ - pz) * RETURN_FORCE;

        state.pos[ix] = px;
        state.pos[iy] = py;
        state.pos[iz] = pz;

        dummy.position.set(px, py, pz);

        const baseScale = particles[i].isOutline ? 0.05 : 0.07;
        const breathScale = Math.sin(time * 3 + i) * 0.015;
        const glowScale = glowIntensity * 0.06;
        const scale = baseScale + breathScale + glowScale;
        dummy.scale.set(scale, scale, scale);

        const cOutline = currentColors.current.outline;
        const cPrimary = currentColors.current.primary;
        const cGlowOutline = currentColors.current.glowOutline;
        const cGlowPrimary = currentColors.current.glowPrimary;

        const baseColor = particles[i].isOutline ? cOutline : cPrimary;
        const glowColor = particles[i].isOutline ? cGlowOutline : cGlowPrimary;

        const r = baseColor.r + (glowColor.r - baseColor.r) * glowIntensity;
        const g = baseColor.g + (glowColor.g - baseColor.g) * glowIntensity;
        const b = baseColor.b + (glowColor.b - baseColor.b) * glowIntensity;
        meshRef.current.setColorAt(i, new THREE.Color(r, g, b));
      }

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    // Gentle wandering rotation - like an object floating in space
    meshRef.current.rotation.y = Math.sin(time * 0.12) * 0.15 + Math.sin(time * 0.05) * 0.08;
    meshRef.current.rotation.x = Math.sin(time * 0.08) * 0.06;
    meshRef.current.rotation.z = Math.cos(time * 0.1) * 0.04;

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  // Force color update when theme changes, as the loop might take a frame or logic needs reset
  useEffect(() => {
    // We rely on the useFrame loop to pick up `currentColors.current` and update on next tick
    // However, for static particles (if any stopped), we might want to force wake up
  }, [theme]);

  // Force buffer update when colors change (fixes reload race condition)
  const colorAttributeRef = useRef<THREE.InstancedBufferAttribute>(null);
  useEffect(() => {
    if (colorAttributeRef.current) {
      colorAttributeRef.current.needsUpdate = true;
    }
  }, [state.colors]);

  return (
    <instancedMesh key={theme} ref={meshRef} args={[undefined, undefined, TOTAL_PARTICLES]}>
      <planeGeometry args={[1, 1]} />
      <instancedBufferAttribute
        ref={colorAttributeRef}
        attach="instanceColor"
        args={[state.colors, 3]}
      />
      <meshBasicMaterial
        map={texture}
        transparent={true}
        blending={theme === 'light' ? THREE.NormalBlending : THREE.AdditiveBlending}
        depthWrite={false}
        opacity={theme === 'light' ? 0.8 : 0.85}
        vertexColors={false}
        color={theme === 'light' ? '#23946b' : '#dce6f0'}
      />
    </instancedMesh>
  );
};

// -----------------------------------------------------------------------------
// Component: Main Scene
// -----------------------------------------------------------------------------

const ParticleLogo: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="w-full h-full bg-transparent">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 60 }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <Particles key={theme} theme={theme} />
      </Canvas>
    </div>
  );
};

export default ParticleLogo;
