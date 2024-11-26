import { useState, useEffect } from 'react';

const images = [
  '/background1.jpg',
  '/background2.jpg',
  '/background3.jpg',
  '/background4.jpg',
  '/background5.jpg',
];

export function useBackgroundRotation(interval = 5000) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return images[currentImageIndex];
}

