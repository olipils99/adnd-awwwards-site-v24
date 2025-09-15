"use client";
import { useState, useEffect } from "react";
import ProjectLoader from "./ProjectLoader";
import { Project } from "@/lib/data";

interface ProjectPageClientProps {
  project: Project;
  children: React.ReactNode;
}

export default function ProjectPageClient({ project, children }: ProjectPageClientProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [allImages, setAllImages] = useState<string[]>([]);

  useEffect(() => {
    // Collecter toutes les images du projet
    const images = [project.img];
    if (project.gallery) {
      images.push(...project.gallery);
    }
    setAllImages(images);
  }, [project]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <ProjectLoader 
        images={allImages} 
        onComplete={handleLoadingComplete} 
      />
    );
  }

  return <>{children}</>;
}

