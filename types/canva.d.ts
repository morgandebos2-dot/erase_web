// Type definitions for canvas-related types
export interface Point {
  x: number;
  y: number;
}

export interface CanvasState {
  isErasing: boolean;
  image: string | null;
  // Add other state properties as needed
}
