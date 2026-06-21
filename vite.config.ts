import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
// Served as a GitHub Pages project site under the user's custom domain:
//   https://reganmaharjan.com.np/anubhuti/
// so assets must resolve under the /anubhuti/ subpath.
export default defineConfig({
  base: '/anubhuti/',
  plugins: [react()],
});
