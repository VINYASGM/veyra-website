'use client';

import { useEffect } from 'react';

/**
 * Suppresses known upstream console warnings that we cannot fix from userland:
 * - THREE.Clock deprecation (from @react-three/fiber v9 internals, fixed in v10)
 */
export function SuppressKnownWarnings() {
  useEffect(() => {
    const originalWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      const msg = typeof args[0] === 'string' ? args[0] : '';
      if (msg.includes('THREE.Clock')) return;
      originalWarn.apply(console, args);
    };

    return () => {
      console.warn = originalWarn;
    };
  }, []);

  return null;
}
