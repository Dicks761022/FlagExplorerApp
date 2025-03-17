// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Optional, if you prefer global test functions like 'describe', 'it'
    environment: 'jsdom', // Use jsdom for React testing
  },
});
