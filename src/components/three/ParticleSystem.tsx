'use client';

import { useRef, useMemo, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleSystemProps {
  count: number;
  enableInteractivity: boolean;
}

export default function ParticleSystem({ count, enableInteractivity }: ParticleSystemProps) {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef(new THREE.Vector3(0, 0, 0));
  const { viewport } = useThree();

  const { positions, velocities, colors, sizes, basePositions } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const basePositions = new Float32Array(count * 3);

    const cyan = new THREE.Color('#00D4FF');
    const purple = new THREE.Color('#7C3AED');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Spherical distribution
      const radius = 4 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      basePositions[i3] = positions[i3];
      basePositions[i3 + 1] = positions[i3 + 1];
      basePositions[i3 + 2] = positions[i3 + 2];

      velocities[i3] = (Math.random() - 0.5) * 0.002;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.002;

      // Color gradient: cyan → purple
      const t = Math.random();
      const color = new THREE.Color().lerpColors(cyan, purple, t);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = 0.03 + Math.random() * 0.06;
    }

    return { positions, velocities, colors, sizes, basePositions };
  }, [count]);

  const handlePointerMove = useCallback((e: { point: THREE.Vector3 }) => {
    if (enableInteractivity) {
      mouseRef.current.copy(e.point);
    }
  }, [enableInteractivity]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const posArray = meshRef.current.geometry.attributes.position.array as Float32Array;
    const sizeArray = meshRef.current.geometry.attributes.size.array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Ambient floating
      posArray[i3] = basePositions[i3] + Math.sin(time * 0.3 + i * 0.1) * 0.15 + velocities[i3] * time;
      posArray[i3 + 1] = basePositions[i3 + 1] + Math.cos(time * 0.2 + i * 0.15) * 0.15 + velocities[i3 + 1] * time;
      posArray[i3 + 2] = basePositions[i3 + 2] + Math.sin(time * 0.25 + i * 0.05) * 0.1 + velocities[i3 + 2] * time;

      // Mouse interaction — glow effect
      if (enableInteractivity) {
        const dx = posArray[i3] - mouseRef.current.x;
        const dy = posArray[i3 + 1] - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 2.5) {
          const influence = 1 - dist / 2.5;
          sizeArray[i] = sizes[i] + influence * 0.08;
        } else {
          sizeArray[i] = sizes[i];
        }
      }

      // Pulsing
      sizeArray[i] *= 1 + Math.sin(time * 2 + i) * 0.15;
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.geometry.attributes.size.needsUpdate = true;

    // Slow global rotation
    meshRef.current.rotation.y = time * 0.03;
    meshRef.current.rotation.x = Math.sin(time * 0.02) * 0.1;
  });

  return (
    <group onPointerMove={handlePointerMove}>
      {/* Invisible plane for mouse tracking */}
      <mesh visible={false}>
        <planeGeometry args={[viewport.width * 2, viewport.height * 2]} />
        <meshBasicMaterial />
      </mesh>

      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
          <bufferAttribute
            attach="attributes-size"
            args={[sizes, 1]}
          />
        </bufferGeometry>
        <pointsMaterial
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          size={0.08}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
