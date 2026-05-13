'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ConnectionLinesProps {
  particlePositions: Float32Array;
  particleCount: number;
  maxConnections?: number;
  connectionDistance?: number;
}

export default function ConnectionLines({
  particlePositions,
  particleCount,
  maxConnections = 300,
  connectionDistance = 2.5,
}: ConnectionLinesProps) {
  const lineRef = useRef<THREE.LineSegments>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(maxConnections * 6);
    const colors = new Float32Array(maxConnections * 6);
    return { positions, colors };
  }, [maxConnections]);

  useFrame(() => {
    if (!lineRef.current) return;

    const posArray = lineRef.current.geometry.attributes.position.array as Float32Array;
    const colArray = lineRef.current.geometry.attributes.color.array as Float32Array;

    let connectionCount = 0;

    for (let i = 0; i < particleCount && connectionCount < maxConnections; i++) {
      for (let j = i + 1; j < particleCount && connectionCount < maxConnections; j++) {
        const i3 = i * 3;
        const j3 = j * 3;

        const dx = particlePositions[i3] - particlePositions[j3];
        const dy = particlePositions[i3 + 1] - particlePositions[j3 + 1];
        const dz = particlePositions[i3 + 2] - particlePositions[j3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < connectionDistance) {
          const c6 = connectionCount * 6;
          const opacity = 1 - dist / connectionDistance;

          posArray[c6] = particlePositions[i3];
          posArray[c6 + 1] = particlePositions[i3 + 1];
          posArray[c6 + 2] = particlePositions[i3 + 2];
          posArray[c6 + 3] = particlePositions[j3];
          posArray[c6 + 4] = particlePositions[j3 + 1];
          posArray[c6 + 5] = particlePositions[j3 + 2];

          // Cyan with distance-based opacity
          colArray[c6] = 0;
          colArray[c6 + 1] = 0.83 * opacity;
          colArray[c6 + 2] = 1 * opacity;
          colArray[c6 + 3] = 0;
          colArray[c6 + 4] = 0.83 * opacity;
          colArray[c6 + 5] = 1 * opacity;

          connectionCount++;
        }
      }
    }

    // Zero out unused connections
    for (let i = connectionCount * 6; i < maxConnections * 6; i++) {
      posArray[i] = 0;
      colArray[i] = 0;
    }

    lineRef.current.geometry.attributes.position.needsUpdate = true;
    lineRef.current.geometry.attributes.color.needsUpdate = true;
    lineRef.current.geometry.setDrawRange(0, connectionCount * 2);
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <lineBasicMaterial
        vertexColors
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  );
}
