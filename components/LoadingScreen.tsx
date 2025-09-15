"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const loadingTexts = [
    "Chargement de nos réalisations...",
    "Préparation de votre expérience...",
    "Optimisation des images...",
    "Presque prêt !"
  ];

  useEffect(() => {
    // Simulation du chargement progressif
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 500); // Délai pour l'animation de sortie
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5; // Progression variable
      });
    }, 200);

    // Changement de texte
    const textInterval = setInterval(() => {
      setCurrentText(prev => (prev + 1) % loadingTexts.length);
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#011700] flex items-center justify-center">
      {/* Logo et contenu principal */}
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8 animate-pulse">
          <Image
            src="/logo-white.svg"
            alt="ADND Logo"
            width={120}
            height={120}
            className="mx-auto"
            priority
          />
        </div>

        {/* Titre */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          ADND
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Aménagement et Design Naturel Durable
        </p>

        {/* Barre de progression */}
        <div className="w-80 mx-auto mb-6">
          <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-green-500 to-green-400 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-center mt-2">
            <span className="text-sm text-gray-400">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Texte de chargement animé */}
        <div className="h-6 flex items-center justify-center">
          <p className="text-gray-300 text-sm animate-pulse">
            {loadingTexts[currentText]}
          </p>
        </div>

        {/* Points de chargement */}
        <div className="flex justify-center space-x-1 mt-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      </div>

      {/* Effet de particules en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-400 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}

