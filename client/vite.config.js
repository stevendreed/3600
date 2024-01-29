import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // added to prevent mongoose && vite from coliding on the same port
      '/api': "http://localhost:5173" 
    }
  }
});
