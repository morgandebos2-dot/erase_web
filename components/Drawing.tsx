'use client';
import { useRef, useState, useEffect, ChangeEvent } from 'react';

interface DrawingProps {
  uploadedImage: string | null;
  selectedColor: string;
}

export default function Drawing({ uploadedImage, selectedColor }: DrawingProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [brushSize, setBrushSize] = useState<number>(5);
  const brushSizeRef = useRef<number>(5);
  const isDrawingRef = useRef<boolean>(false);

  // Update brush size ref whenever the state changes
  useEffect(() => {
    brushSizeRef.current = brushSize;
  }, [brushSize]);

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

  // Set up drawing logic only once
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

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
      context.globalCompositeOperation = 'source-over';
      context.strokeStyle = selectedColor;
      context.lineWidth = brushSizeRef.current;
      context.lineCap = 'round';
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
  }, [selectedColor]);

  return (
    <div>
      <div>
        <label>
          Brush Size:
          <input
            type="range"
            min="1"
            max="50"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
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