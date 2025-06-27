/// <reference types = "vitest" />
/// <reference types = "Vite/client" />
/// <reference types = "@testing-library/jest-dom" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true
  },
  server: {
  port: 5173,
  host: true  // Allow connections from outside the container
}
})
