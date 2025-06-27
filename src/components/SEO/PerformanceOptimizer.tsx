import { useEffect } from 'react';

interface PerformanceOptimizerProps {
  preloadImages?: string[];
  prefetchRoutes?: string[];
}

const PerformanceOptimizer: React.FC<PerformanceOptimizerProps> = ({
  preloadImages = [],
  prefetchRoutes = []
}) => {
  useEffect(() => {
    // Preload critical images
    preloadImages.forEach(imageSrc => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = imageSrc;
      document.head.appendChild(link);
    });

    // Prefetch routes
    prefetchRoutes.forEach(route => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = route;
      document.head.appendChild(link);
    });

    // Cleanup function
    return () => {
      // Remove preload links on unmount
      document.querySelectorAll('link[rel="preload"]').forEach(link => {
        if (preloadImages.includes(link.getAttribute('href') || '')) {
          link.remove();
        }
      });
    };
  }, [preloadImages, prefetchRoutes]);

  return null;
};

export default PerformanceOptimizer; 