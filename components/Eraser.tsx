'use client';
import { useRef, useState, useEffect, ChangeEvent } from 'react';

interface EraserProps {
  uploadedImage: string | null;
}

export default function Eraser({ uploadedImage }: EraserProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [eraserSize, setEraserSize] = useState<number>(20);
  const eraserSizeRef = useRef<number>(20);
  const isDrawingRef = useRef<boolean>(false);

  // Update eraser size ref whenever the state changes
  useEffect(() => {
    eraserSizeRef.current = eraserSize;
  }, [eraserSize]);

  // Draw the uploaded image on the canvas
  const drawImageOnCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !uploadedImage) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = uploadedImage;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  };

  // Initialize canvas and draw image when uploadedImage changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = 800;
    canvas.height = 600;
    drawImageOnCanvas();
  }, [uploadedImage]);

  // Set up eraser logic only once
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const startErasing = (e: MouseEvent) => {
      isDrawingRef.current = true;
      erase(e, ctx);
    };

    const stopErasing = () => {
      isDrawingRef.current = false;
      ctx.beginPath();
    };

    const erase = (e: MouseEvent, context: CanvasRenderingContext2D) => {
      if (!isDrawingRef.current) return;
      context.globalCompositeOperation = 'destination-out';
      context.lineWidth = eraserSizeRef.current;
      context.lineCap = 'round';
      context.lineTo(e.offsetX, e.offsetY);
      context.stroke();
      context.beginPath();
      context.moveTo(e.offsetX, e.offsetY);
    };

    canvas.addEventListener('mousedown', startErasing);
    canvas.addEventListener('mousemove', (e) => erase(e, ctx));
    canvas.addEventListener('mouseup', stopErasing);
    canvas.addEventListener('mouseout', stopErasing);

    return () => {
      canvas.removeEventListener('mousedown', startErasing);
      canvas.removeEventListener('mousemove', (e) => erase(e, ctx));
      canvas.removeEventListener('mouseup', stopErasing);
      canvas.removeEventListener('mouseout', stopErasing);
    };
  }, []); // Empty dependency array: runs only once

  return (
    <div>
      <div>
        <label>
          Eraser Size:
          <input
            type="range"
            min="5"
            max="100"
            value={eraserSize}
            onChange={(e) => setEraserSize(Number(e.target.value))}
          />
        </label>
      </div>
      <canvas
        ref={canvasRef}
        style={{ border: '1px solid #ccc', marginTop: '1rem' }}
      />
    </div>
  );
} 