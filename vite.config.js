import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    /*
     * Erzwingt, dass @react-three/fiber und @react-three/drei
     * dieselbe React-Instanz wie die App benutzen.
     * Ohne diesen Fix: "Invalid hook call" / useMemo null-Fehler.
     */
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
    },
    dedupe: ['react', 'react-dom', 'react/jsx-runtime'],
  },
  optimizeDeps: {
    include: [
      'three',
      '@react-three/fiber',
      '@react-three/drei',
    ],
  },
  assetsInclude: ['**/*.glb', '**/*.gltf'],
  build: {
    // Verhindert den Warning-Spam und erleichtert das Vercel-Build (kein CI-Abbruch)
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        /*
         * Three.js + R3F + Drei in eigene Vendor-Chunks aufteilen.
         * Das halbiert ungefähr die Größe des Haupt-Chunks und
         * ermöglicht parallele Downloads beim ersten Load.
         */
        manualChunks: {
          'vendor-three':  ['three'],
          'vendor-r3f':    ['@react-three/fiber'],
          'vendor-drei':   ['@react-three/drei'],
          'vendor-motion': ['framer-motion'],
        },
      },
    },
  },
})

