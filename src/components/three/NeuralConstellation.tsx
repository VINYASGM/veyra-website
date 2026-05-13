'use client';

import { Canvas } from '@react-three/fiber';
import ParticleSystem from './ParticleSystem';

interface NeuralConstellationProps {
  particleCount: number;
  enableConnections: boolean;
  enableInteractivity: boolean;
}

export default function NeuralConstellation({
  particleCount,
  enableInteractivity,
}: NeuralConstellationProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 60 }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.5} />
      <ParticleSystem
        count={particleCount}
        enableInteractivity={enableInteractivity}
      />
    </Canvas>
  );
}
