"use client";
import { useState, useEffect } from "react";
import { PROJECTS } from "@/lib/data";
import ProjectLoader from "./ProjectLoader";

interface ProjectsGridClientProps {
  children: React.ReactNode;
}

export default function ProjectsGridClient({ children }: ProjectsGridClientProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Charger les images des premiers projets
    const priorityImages = PROJECTS.slice(0, 6).map(p => p.img);
    
    if (priorityImages.length === 0) {
      setIsLoading(false);
      return;
    }

    let loadedCount = 0;
    const totalImages = priorityImages.length;

    const loadImage = (src: string): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          if (loadedCount >= totalImages) {
            setTimeout(() => setIsLoading(false), 500);
          }
          resolve();
        };
        img.onerror = () => {
          loadedCount++;
          if (loadedCount >= totalImages) {
            setTimeout(() => setIsLoading(false), 500);
          }
          resolve();
        };
        img.src = src;
      });
    };

    Promise.all(priorityImages.map(loadImage));
  }, []);

  if (isLoading) {
    return (
      <ProjectLoader 
        images={PROJECTS.slice(0, 6).map(p => p.img)} 
        onComplete={() => setIsLoading(false)} 
      />
    );
  }

  return <>{children}</>;
}

