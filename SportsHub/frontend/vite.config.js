import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable Fast Refresh for better development experience
      fastRefresh: true,
      // Support for modern JSX transform
      jsxRuntime: 'automatic'
    }),
    tailwindcss()
  ],
  // Modern build optimizations
  build: {
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router'],
          ui: ['lucide-react', 'motion']
        }
      }
    }
  },
  // Development server configuration
  server: {
    port: 3000,
    open: true,
    hmr: {
      overlay: true
    }
  },
  // Modern JavaScript features
  esbuild: {
    target: 'esnext',
    format: 'esm'
  }
})
