"use client";
import { useRef, useState } from "react";

export default function TextAdderPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [textPosition, setTextPosition] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  // Draw image and text on canvas
  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas || !uploadedImage) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = new window.Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      if (text) {
        ctx.font = "bold 40px Fredoka One, Arial Black, sans-serif";
        ctx.fillStyle = "#c82333";
        ctx.textBaseline = "top";
        ctx.fillText(text, textPosition.x, textPosition.y);
      }
    };
    img.src = uploadedImage;
  };

  // Redraw when image, text, or position changes
  React.useEffect(() => {
    draw();
    // eslint-disable-next-line
  }, [uploadedImage, text, textPosition]);

  // Drag text on canvas
  const handleCanvasPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    ctx.font = "bold 40px Fredoka One, Arial Black, sans-serif";
    const textWidth = ctx.measureText(text).width;
    const textHeight = 40; // Approximate
    if (
      x >= textPosition.x &&
      x <= textPosition.x + textWidth &&
      y >= textPosition.y &&
      y <= textPosition.y + textHeight
    ) {
      setDragging(true);
      setOffset({ x: x - textPosition.x, y: y - textPosition.y });
    }
  };

  const handleCanvasPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragging || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTextPosition({ x: x - offset.x, y: y - offset.y });
  };

  const handleCanvasPointerUp = () => {
    setDragging(false);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "image-with-text.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <main style={{ maxWidth: 900, margin: "2rem auto", textAlign: "center" }}>
      <h1 style={{ fontFamily: 'Fredoka One, Arial Black, sans-serif', fontSize: '2.2rem', marginBottom: '1.5rem' }}>Text Adder Tool</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} style={{ marginBottom: 16 }} />
      <div style={{ margin: '1rem 0' }}>
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          placeholder="Enter your text here"
          style={{ fontSize: 20, padding: 8, borderRadius: 8, border: '1px solid #ccc', width: 320 }}
        />
      </div>
      <div style={{ margin: '1.5rem 0' }}>
        <canvas
          ref={canvasRef}
          style={{ border: '2px solid #c82333', borderRadius: 12, maxWidth: '100%', touchAction: 'none', cursor: dragging ? 'grabbing' : 'grab' }}
          onPointerDown={handleCanvasPointerDown}
          onPointerMove={handleCanvasPointerMove}
          onPointerUp={handleCanvasPointerUp}
          onPointerLeave={handleCanvasPointerUp}
        />
      </div>
      <button
        onClick={handleDownload}
        style={{
          marginTop: '1rem',
          padding: '0.75rem 1.5rem',
          fontSize: '1.1rem',
          borderRadius: '8px',
          background: '#c82333',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 700
        }}
      >
        Download Image
      </button>
    </main>
  );
}
