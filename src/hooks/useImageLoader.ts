import { useState, useEffect } from 'react';

interface ImageLoaderOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useImageLoader = (
  imageUrl: string,
  options: ImageLoaderOptions = {}
) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [imageSrc, setImageSrc] = useState<string>('');

  useEffect(() => {
    const {
      threshold = 0.1,
      rootMargin = '50px 0px'
    } = options;

    const loadImage = (url: string) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(url);
        img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadImage(imageUrl)
              .then((url) => {
                setImageSrc(url as string);
                setIsLoaded(true);
              })
              .catch((err) => {
                setError(err as Error);
              });
            observer.disconnect();
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    // Create a dummy element to observe
    const element = document.createElement('div');
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [imageUrl, options]);

  return { isLoaded, error, imageSrc };
};

// Utilidad para precargar imágenes
export const preloadImages = (urls: string[]): Promise<void[]> => {
  const loadPromises = urls.map((url) => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve();
      img.onerror = () => reject();
    });
  });

  return Promise.all(loadPromises);
};

export default useImageLoader;
