import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('/node_modules/')) return;
          if (id.includes('/node_modules/react/') || id.includes('/node_modules/react-dom/') || id.includes('/node_modules/scheduler/')) return 'react-vendor';
          if (id.includes('/node_modules/three/')) return 'three-core';
          if (id.includes('/node_modules/@react-three/postprocessing/') || id.includes('/node_modules/postprocessing/') || id.includes('/node_modules/three-stdlib/')) return 'three-effects';
          if (id.includes('/node_modules/@react-three/') || id.includes('/node_modules/maath/')) return 'three-react';
          if (id.includes('/node_modules/gsap/') || id.includes('/node_modules/@gsap/')) return 'motion-vendor';
          if (id.includes('/node_modules/zustand/')) return 'state-vendor';
        },
      },
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'The Journey — 1911–1920',
        short_name: 'The Journey',
        description: 'Cinematic web presentation về hành trình tìm đường cứu nước, 1911–1920.',
        theme_color: '#071018',
        background_color: '#071018',
        display: 'fullscreen',
        orientation: 'landscape',
        icons: [{ src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' }],
      },
      workbox: {
        globPatterns: ['**/*.{html,js,css,svg,woff,woff2,ttf,ico,png,webp,avif}'],
        navigateFallback: 'index.html',
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
      },
    }),
  ],
});
