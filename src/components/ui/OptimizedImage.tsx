import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  sizes?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  sizes = '100vw'
}) => {
  // Generar srcSet para diferentes tamaños de pantalla
  const generateSrcSet = () => {
    const widths = [320, 640, 768, 1024, 1280, 1536];
    return widths
      .map(w => `${src}?w=${w}&format=webp ${w}w`)
      .join(', ');
  };

  return (
    <picture>
      {/* WebP format for modern browsers */}
      <source
        type="image/webp"
        srcSet={generateSrcSet()}
        sizes={sizes}
      />
      {/* Fallback for browsers that don't support WebP */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        className={`${className} max-w-full h-auto`}
        decoding="async"
        onError={(e) => {
          const img = e.currentTarget;
          img.onerror = null;
          img.src = '/placeholder.png'; // Fallback image
        }}
      />
    </picture>
  );
};

// HOC para lazy loading de imágenes
export const withLazyLoading = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return class extends React.Component<P> {
    render() {
      return (
        <React.Suspense
          fallback={
            <div className="animate-pulse bg-gray-200 rounded-lg">
              <div className="w-full h-full" />
            </div>
          }
        >
          <WrappedComponent {...this.props} />
        </React.Suspense>
      );
    }
  };
};

export default OptimizedImage;
