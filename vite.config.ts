import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { createProxyMiddleware } from 'http-proxy-middleware';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icon-192.png', 'icon-512.png'],
      manifest: {
        name: 'Code Expo',
        short_name: 'Code Expo',
        description: 'GitHubプロジェクトのショーケース',
        theme_color: '#18181b',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  server: {
    proxy: {
      '/api/ogp': {
        target: 'http://localhost:5173',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/ogp/, '/ogp'),
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.error('Proxy Error:', err);
            res.writeHead(500, {
              'Content-Type': 'application/json',
            });
            res.end(JSON.stringify({}));
          });
        }
      }
    }
  }
});