import { env } from './env';

export const imageConfig = {
  // Configuraciones de calidad para diferentes formatos
  quality: {
    jpeg: env.IMAGE_QUALITY_JPEG || 80,
    webp: env.IMAGE_QUALITY_WEBP || 80,
    avif: env.IMAGE_QUALITY_AVIF || 80,
    png: env.IMAGE_QUALITY_PNG || 80
  },

  // Tamaños predefinidos para diferentes breakpoints
  sizes: {
    thumbnail: env.IMAGE_SIZE_THUMBNAIL || 150,
    small: env.IMAGE_SIZE_SMALL || 300,
    medium: env.IMAGE_SIZE_MEDIUM || 600,
    large: env.IMAGE_SIZE_LARGE || 900,
    hero: env.IMAGE_SIZE_HERO || 1920
  },

  // Breakpoints para responsive images
  breakpoints: {
    sm: env.BREAKPOINT_SM || 640,
    md: env.BREAKPOINT_MD || 768,
    lg: env.BREAKPOINT_LG || 1024,
    xl: env.BREAKPOINT_XL || 1280,
    '2xl': env.BREAKPOINT_2XL || 1536
  },

  // Configuraciones para lazy loading
  lazyLoading: {
    threshold: env.LAZY_LOADING_THRESHOLD || 0.1,
    rootMargin: env.LAZY_LOADING_ROOT_MARGIN || '50px 0px'
  },

  // Placeholder para imágenes no cargadas
  placeholder: {
    color: env.PLACEHOLDER_COLOR || '#f3f4f6',
    svg: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%23f3f4f6'/%3E%3C/svg%3E`
  },

  // Formatos soportados
  supportedFormats: env.SUPPORTED_FORMATS || ['webp', 'avif', 'jpeg', 'png'],

  // Configuración de cache
  cache: {
    maxAge: env.CACHE_MAX_AGE || 31536000, // 1 año en segundos
    immutable: env.CACHE_IMMUTABLE || true
  },

  // Optimizaciones por tipo de contenido
  optimizations: {
    hero: {
      quality: env.HERO_QUALITY || 85,
      formats: env.HERO_FORMATS || ['webp', 'jpeg'],
      sizes: env.HERO_SIZES || [768, 1024, 1920]
    },
    thumbnail: {
      quality: env.THUMBNAIL_QUALITY || 70,
      formats: env.THUMBNAIL_FORMATS || ['webp'],
      sizes: env.THUMBNAIL_SIZES || [150, 300]
    },
    content: {
      quality: env.CONTENT_QUALITY || 80,
      formats: env.CONTENT_FORMATS || ['webp', 'jpeg'],
      sizes: env.CONTENT_SIZES || [300, 600, 900]
    }
  }
};

// Función para generar srcSet
export const generateSrcSet = (
  imagePath: string,
  sizes: number[],
  format: string = 'webp'
) => {
  return sizes
    .map(size => `${imagePath}?w=${size}&format=${format} ${size}w`)
    .join(', ');
};

// Función para generar sizes attribute
export const generateSizes = (breakpoints: { [key: string]: number }) => {
  return Object.entries(breakpoints)
    .map(([breakpoint, size]) => `(min-width: ${size}px) ${size}px`)
    .join(', ') + ', 100vw';
};

export default imageConfig;
