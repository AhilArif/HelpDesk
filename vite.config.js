import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base:"./",
  server: {
    host: true,
    port: 2025, // Optional: Change port if needed
    strictPort: true,
    cors: true, // Allow all CORS requests
  }
})
