'use client';
import { useEffect, useRef } from 'react';

interface WireframeProps {
  uploadedImage: string | null;
  selectedColor: string;
}

export default function Wireframe({ uploadedImage, selectedColor }: WireframeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;

    // Load uploaded image as background
    if (uploadedImage) {
      const img = new Image();
      img.src = uploadedImage;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
    }

    // Drawing logic
    const startDrawing = (e: MouseEvent) => {
      isDrawingRef.current = true;
      draw(e, ctx);
    };

    const stopDrawing = () => {
      isDrawingRef.current = false;
      ctx.beginPath();
    };

    const draw = (e: MouseEvent, context: CanvasRenderingContext2D) => {
      if (!isDrawingRef.current) return;
      context.lineWidth = 5;
      context.lineCap = 'round';
      context.strokeStyle = selectedColor;
      context.lineTo(e.offsetX, e.offsetY);
      context.stroke();
      context.beginPath();
      context.moveTo(e.offsetX, e.offsetY);
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', (e) => draw(e, ctx));
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', (e) => draw(e, ctx));
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseout', stopDrawing);
    };
  }, [uploadedImage, selectedColor]);

  return <canvas ref={canvasRef} style={{ border: '1px solid #ccc', marginTop: '1rem' }} />;
}
