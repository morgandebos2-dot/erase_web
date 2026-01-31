import { useState } from 'react';

export const useEraser = () => {
  const [isErasing, setIsErasing] = useState<boolean>(false);

  const handleMouseDown = () => setIsErasing(true);
  const handleMouseUp = () => setIsErasing(false);

  return { isErasing, handleMouseDown, handleMouseUp };
};
