"use client"
import React, { useRef, useState, useEffect } from 'react';
import styles from './Wireframe.module.css';

const Wireframe = () => {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isErasing, setIsErasing] = useState<boolean>(false);
  const lastPosition = useRef<{ x: number, y: number } | null>(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.type.match('image.*')) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        setImage(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const startErasing = () => {
    setIsErasing(true);
    lastPosition.current = null;
  };

  const stopErasing = () => {
    setIsErasing(false);
  };

  const erase = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isErasing || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (event.nativeEvent.offsetX) * scaleX;
    const y = (event.nativeEvent.offsetY) * scaleY;

    ctx.globalCompositeOperation = 'destination-out';

    if (lastPosition.current) {
      ctx.beginPath();
      ctx.lineWidth = 40;
      ctx.lineCap = 'round';
      ctx.moveTo(lastPosition.current.x, lastPosition.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    lastPosition.current = { x, y };

    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();
  };

  useEffect(() => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
    img.src = image;
  }, [image]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Pixel Eraser</h1>
      </header>
      <div className={styles.canvasArea}>
        {image ? (
          <canvas
            ref={canvasRef}
            onMouseDown={startErasing}
            onMouseUp={stopErasing}
            onMouseMove={erase}
            onMouseLeave={stopErasing}
            className={styles.canvas}
          />
        ) : (
          <p>No image uploaded</p>
        )}
      </div>
      <div className={styles.controls}>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleFileChange}
        />
        <button onClick={handleUploadClick} className={styles.uploadButton}>
          Upload Image
        </button>
        <button className={styles.eraseButton} onMouseDown={startErasing} onMouseUp={stopErasing} onMouseLeave={stopErasing}>
          <img
            src="https://mistralaiblackforestprod.blob.core.windows.net/images/blackforest/c15b/0f1d/-6cc/b-4161-aced-6f5c4d4e24a8/image.jpg?se=2026-02-07T06%3A36%3A14Z&sp=r&sv=2025-01-05&sr=b&sig=5bNfuQN9AbqY1rPQApOObbrMwcbEBK%2BA5C2ZsaypKQw%3D"
            alt="Eraser"
            className={styles.eraseIcon}
          />
          <span>Erase</span>
        </button>
      </div>
    </div>
  );
};

export default Wireframe;
