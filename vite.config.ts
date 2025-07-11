/// <reference types = "vitest" />
/// <reference types = "Vite/client" />
/// <reference types = "@testing-library/jest-dom" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@types': path.resolve(__dirname, './src/types'),
      '@config': path.resolve(__dirname, './src/config'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ['./src/setupTests.ts'],
    include: ['src/**/*.test.{ts,tsx,js,jsx}'],
    exclude: [
      'e2e/**/*',
      '**/*.e2e.spec.ts',
      '**/*.e2e.test.ts',
      'node_modules/**/*.{test,spec}.{js,ts,jsx,tsx}'
    ]
  },
  server: {
    port: 5173,
    host: true  // Allow connections from outside the container
  }
})
