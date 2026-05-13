'use client';

import { useState, useEffect } from 'react';
import { getGPUTier } from 'detect-gpu';

interface DevicePerformance {
  tier: 'high' | 'medium' | 'low';
  particleCount: number;
  enableConnections: boolean;
  enableInteractivity: boolean;
  ready: boolean;
}

export function useDevicePerformance(): DevicePerformance {
  const [perf, setPerf] = useState<DevicePerformance>({
    tier: 'medium',
    particleCount: 500,
    enableConnections: true,
    enableInteractivity: true,
    ready: false,
  });

  useEffect(() => {
    async function detect() {
      try {
        const gpuTier = await getGPUTier();
        const cores = navigator.hardwareConcurrency || 4;
        const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);

        let tier: DevicePerformance['tier'];
        let particleCount: number;
        let enableConnections: boolean;
        let enableInteractivity: boolean;

        if (gpuTier.tier >= 3 && cores >= 8 && !isMobile) {
          tier = 'high';
          particleCount = 800;
          enableConnections = true;
          enableInteractivity = true;
        } else if (gpuTier.tier >= 2 && cores >= 4) {
          tier = 'medium';
          particleCount = isMobile ? 200 : 500;
          enableConnections = !isMobile;
          enableInteractivity = true;
        } else {
          tier = 'low';
          particleCount = 150;
          enableConnections = false;
          enableInteractivity = false;
        }

        setPerf({ tier, particleCount, enableConnections, enableInteractivity, ready: true });
      } catch {
        setPerf({
          tier: 'medium',
          particleCount: 400,
          enableConnections: true,
          enableInteractivity: true,
          ready: true,
        });
      }
    }

    detect();
  }, []);

  return perf;
}
