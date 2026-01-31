import { useRef, useEffect } from 'react';

export const useCanvas = (image: string | null) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // Canvas setup and drawing logic
  }, [image]);

  return canvasRef;
};
