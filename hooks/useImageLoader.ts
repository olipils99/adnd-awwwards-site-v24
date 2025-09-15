"use client";
import { useState, useEffect } from "react";

interface UseImageLoaderProps {
  images: string[];
  minLoadTime?: number; // Temps minimum d'affichage du loading (ms)
}

export function useImageLoader({ images, minLoadTime = 2000 }: UseImageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(0);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    if (images.length === 0) {
      setIsLoading(false);
      return;
    }

    let loadedCount = 0;
    const imagePromises = images.map((src) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          setLoadedImages(loadedCount);
          resolve();
        };
        img.onerror = () => {
          loadedCount++;
          setLoadedImages(loadedCount);
          resolve(); // Continue même si une image échoue
        };
        img.src = src;
      });
    });

    Promise.all(imagePromises).then(() => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadTime - elapsedTime);
      
      setTimeout(() => {
        setIsLoading(false);
      }, remainingTime);
    });
  }, [images, minLoadTime, startTime]);

  return {
    isLoading,
    loadedImages,
    totalImages: images.length,
    progress: images.length > 0 ? (loadedImages / images.length) * 100 : 100
  };
}

