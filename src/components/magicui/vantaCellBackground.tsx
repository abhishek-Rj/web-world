import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
// @ts-ignore
import CELLS from 'vanta/dist/vanta.cells.min';

export default function VantaCellsBackground() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      setVantaEffect(
        CELLS({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          color1: 0x000000,
          color2: 0x6c6c64,
          size: 4.5,
          speed: 2.5,
        })
      );
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      id="vanta-bg"
    />
  );
}
