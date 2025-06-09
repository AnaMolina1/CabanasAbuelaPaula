// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Proyecto Cabañas',
        short_name: 'Cabañas',
        description: 'Aplicación para reservas de cabañas',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'images/casaicono.png', // Asegúrate de que este archivo exista en public/images/
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'images/casaicono.png', // Usamos el mismo icono para 512x512
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        // Configuración adicional de caché (opcional)
      }
    })
  ]
});
