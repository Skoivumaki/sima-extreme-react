import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/sima/',
  build: {
    outDir: 'C:/xampp/htdocs/thshost/sima',
    emptyOutDir: true,
  },
});