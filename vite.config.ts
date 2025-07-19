import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    react({
      // Exclude node_modules from transformation
      exclude: /node_modules/,
    }), 
    tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize build performance
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['@radix-ui/react-avatar', '@radix-ui/react-slot'],
          'lucide-vendor': ['lucide-react'],
          // App chunks
          'components': [
            './src/components/Header.tsx',
            './src/components/HeroSection.tsx',
            './src/components/SearchInput.tsx',
            './src/components/TagList.tsx'
          ]
        }
      }
    },
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {
    // Pre-bundle dependencies for faster dev server start
    include: [
      'react',
      'react-dom',
      'lucide-react',
      '@radix-ui/react-avatar',
      '@radix-ui/react-slot'
    ],
    // Exclude heavy dependencies from pre-bundling if needed
    exclude: []
  }
});
