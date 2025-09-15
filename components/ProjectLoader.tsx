"use client";
import { useState, useEffect } from "react";

interface ProjectLoaderProps {
  images: string[];
  onComplete: () => void;
}

export default function ProjectLoader({ images, onComplete }: ProjectLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (images.length === 0) {
      onComplete();
      return;
    }

    let loadedCount = 0;
    const totalImages = images.length;

    const loadImage = (src: string): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          setProgress((loadedCount / totalImages) * 100);
          resolve();
        };
        img.onerror = () => {
          loadedCount++;
          setProgress((loadedCount / totalImages) * 100);
          resolve();
        };
        img.src = src;
      });
    };

    // Charger toutes les images
    Promise.all(images.map(loadImage)).then(() => {
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(onComplete, 300);
      }, 500);
    });
  }, [images, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-sm flex items-center justify-center">
      <div className="text-center">
        {/* Icône de chargement */}
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto border-4 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
        </div>

        {/* Titre */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Chargement du projet
        </h2>

        {/* Barre de progression */}
        <div className="w-64 mx-auto mb-4">
          <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-green-500 to-green-400 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-center mt-2">
            <span className="text-sm text-gray-600">
              {Math.round(progress)}% - {images.length} image{images.length > 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Animation de points */}
        <div className="flex justify-center space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

