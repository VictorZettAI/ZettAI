import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import viteCompression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Cargar variables de entorno basadas en el modo
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
        manifest: {
          name: env.VITE_APP_NAME || 'ZettAI',
          short_name: env.VITE_APP_SHORT_NAME || 'ZettAI',
          description: env.VITE_APP_DESCRIPTION || 'Soluciones de IA innovadoras para empresas',
          theme_color: env.VITE_APP_THEME_COLOR || '#ffffff',
          background_color: env.VITE_APP_BACKGROUND_COLOR || '#ffffff',
          display: 'standalone',
          start_url: '/',
          icons: [
            {
              src: '/icon-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: '/icon-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        }
      }),
      viteCompression({
        algorithm: 'brotli',
        ext: '.br'
      }),
      viteCompression({
        algorithm: 'gzip'
      }),
      visualizer({
        open: true,
        filename: 'dist/stats.html'
      })
    ],
    server: {
      port: 5173,
      strictPort: false,
      host: true,
      open: true,
      hmr: {
        protocol: 'ws',
        host: 'localhost'
      },
      watch: {
        usePolling: true
      }
    },
    preview: {
      port: 5173,
      strictPort: false,
      host: true
    },
    build: {
      target: 'esnext',
      outDir: 'dist',
      assetsDir: 'assets',
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'router-vendor': ['react-router-dom'],
            'ui-vendor': [
              '@radix-ui/react-accordion',
              '@radix-ui/react-avatar',
              '@radix-ui/react-slot',
              '@radix-ui/react-tabs',
              '@radix-ui/react-toast',
              '@radix-ui/react-tooltip'
            ],
            'animation-vendor': ['framer-motion', '@studio-freight/lenis']
          },
          assetFileNames: (assetInfo) => {
            const extType = assetInfo.name.split('.').at(1);
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              return 'assets/images/[name]-[hash][extname]';
            }
            if (/webp|avif/i.test(extType)) {
              return 'assets/images/[name]-[hash][extname]';
            }
            if (/mp4|webm/i.test(extType)) {
              return 'assets/videos/[name]-[hash][extname]';
            }
            if (/woff|woff2|eot|ttf|otf/i.test(extType)) {
              return 'assets/fonts/[name]-[hash][extname]';
            }
            return 'assets/[name]-[hash][extname]';
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js'
        }
      },
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      assetsInlineLimit: 4096,
      cssCodeSplit: true,
      sourcemap: false,
      modulePreload: true,
      reportCompressedSize: false
    }
  }
});
