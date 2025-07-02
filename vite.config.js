// vite.config.js

// Import Vite's defineConfig helper and the React plugin
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Export the configuration
export default defineConfig({
  plugins: [react()], // Enable React plugin for JSX support, fast refresh, etc.

  server: {
    hmr: true, // Enable Hot Module Replacement (live updates during dev)

    watch: {
      usePolling: true, // Use polling to detect file changes (helps in WSL, Docker, or networked environments)
    },
  },
});
