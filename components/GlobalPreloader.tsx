"use client";
import { useEffect } from 'react';
import { PROJECTS } from '@/lib/data';
import { BEFORE_AFTER_IMAGES } from '@/lib/beforeAfterData';

export default function GlobalPreloader() {
  useEffect(() => {
    // Précharger toutes les images et vidéos immédiatement
    const preloadAssets = () => {
      const allAssets: string[] = [];
      
      // Collecter toutes les images et vidéos des projets
      PROJECTS.forEach(project => {
        if (project.img) allAssets.push(project.img);
        if (project.video) allAssets.push(project.video);
        if (project.poster) allAssets.push(project.poster);
        if (project.gallery) allAssets.push(...project.gallery);
      });

      // Collecter toutes les images avant-après
      BEFORE_AFTER_IMAGES.forEach(image => {
        if (image.before) allAssets.push(image.before);
        if (image.after) allAssets.push(image.after);
      });

      // Précharger chaque asset
      allAssets.forEach(src => {
        const isVideo = src.toLowerCase().endsWith('.mp4') || 
                       src.toLowerCase().endsWith('.webm') || 
                       src.toLowerCase().endsWith('.mov');

        if (isVideo) {
          const video = document.createElement('video');
          video.src = src;
          video.preload = 'auto';
          video.style.display = 'none';
          document.body.appendChild(video);
          
          // Nettoyer après chargement
          video.onloadeddata = () => {
            document.body.removeChild(video);
          };
          video.onerror = () => {
            document.body.removeChild(video);
          };
        } else {
          const img = new Image();
          img.src = src;
          // Pas besoin de nettoyer les images, elles sont gérées par le navigateur
        }
      });
    };

    // Démarrer le préchargement immédiatement
    preloadAssets();
  }, []);

  return null; // Ce composant ne rend rien
}
