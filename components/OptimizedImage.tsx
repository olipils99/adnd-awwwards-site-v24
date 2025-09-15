"use client";
import Image, { ImageProps } from "next/image";
import { useState, useEffect } from "react";

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  onLoad?: () => void;
  onError?: () => void;
}

// Simple base64 blur data URL for gray placeholder
const DEFAULT_BLUR_DATA_URL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=";

export default function OptimizedImage({
  src,
  alt,
  className = "",
  onLoad,
  onError,
  placeholder = "blur",
  blurDataURL,
  priority = true, // Force priority loading by default
  loading = "eager", // Force eager loading by default
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Preload the image immediately when component mounts
  useEffect(() => {
    if (src) {
      const img = new window.Image();
      img.onload = () => {
        setIsLoading(false);
        onLoad?.();
      };
      img.onerror = () => {
        setIsLoading(false);
        setHasError(true);
        onError?.();
      };
      img.src = src;
    }
  }, [src, onLoad, onError]);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  if (hasError) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ aspectRatio: props.aspectRatio }}
      >
        <span className="text-gray-500 text-sm">Image non disponible</span>
      </div>
    );
  }

  // Use provided blurDataURL or default one
  const finalBlurDataURL = blurDataURL || DEFAULT_BLUR_DATA_URL;

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      <Image
        src={src}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        placeholder={placeholder}
        blurDataURL={finalBlurDataURL}
        priority={priority}
        loading={loading}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        {...props}
      />
    </div>
  );
}
