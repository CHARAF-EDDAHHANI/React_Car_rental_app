// vite.config.js

// Import Vite's defineConfig helper and the React plugin
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Export the configuration
export default defineConfig({
  plugins: [react()], // Enable React plugin for JSX support, fast refresh, etc.
  


  server: {
    hmr: true, // Enable Hot Module Replacement (live updates during dev)
    port: 5173, // Set the development server port
    strictPort: true, // Ensure the server uses the specified port, even if it's already in use
    host: 'localhost', // Set the host to localhost for local development
    open: true, // Automatically open the browser when the server starts
    cors: true, // Enable CORS for cross-origin requests
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Proxy API requests to the backend server
        changeOrigin: true, // Change the origin of the host header to the target URL
        rewrite: (path) => path.replace(/^\/api/, ''), // Rewrite the path
      },
    },

    watch: {
      usePolling: true, // Use polling to detect file changes (helps in WSL, Docker, or networked environments)
      interval: 100, // Set the polling interval to 100ms
      ignored: ['**/node_modules/**', '**/.git/**'], // Ignore changes in node_modules and .git directories
      persistent: true, // Keep the watcher running
      followSymlinks: true, // Follow symlinks when watching files

    },
  },
});
