'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { useDevicePerformance } from '@/hooks/useDevicePerformance';

const Scene = dynamic(() => import('./NeuralConstellation'), { ssr: false });

function LoadingFallback() {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0A0A0F',
    }}>
      <div style={{
        width: 40,
        height: 40,
        border: '3px solid rgba(0,212,255,0.2)',
        borderTop: '3px solid #00D4FF',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}

/* CSS-only fallback for very low-end devices */
function CSSFallback() {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(ellipse at 50% 50%, rgba(0,212,255,0.08) 0%, rgba(124,58,237,0.05) 40%, #0A0A0F 70%)',
      overflow: 'hidden',
    }}>
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            borderRadius: '50%',
            background: Math.random() > 0.5 ? '#00D4FF' : '#7C3AED',
            opacity: 0.3 + Math.random() * 0.5,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float-dot ${3 + Math.random() * 4}s ease-in-out infinite alternate`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes float-dot {
          from { transform: translate(0, 0) scale(1); opacity: 0.3; }
          to { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) scale(1.5); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}

interface SceneWrapperProps {
  className?: string;
  reducedParticles?: boolean;
}

export default function SceneWrapper({ className, reducedParticles }: SceneWrapperProps) {
  const perf = useDevicePerformance();

  if (!perf.ready) {
    return <LoadingFallback />;
  }

  if (perf.tier === 'low') {
    return <CSSFallback />;
  }

  const particleCount = reducedParticles
    ? Math.floor(perf.particleCount * 0.4)
    : perf.particleCount;

  return (
    <div className={className} style={{ position: 'absolute', inset: 0 }}>
      <Suspense fallback={<LoadingFallback />}>
        <Scene
          particleCount={particleCount}
          enableConnections={perf.enableConnections}
          enableInteractivity={perf.enableInteractivity}
        />
      </Suspense>
    </div>
  );
}
