import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/smartjhola': 'http://localhost:5500', //backend port 
    },
  },
});
