import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a temporary vite config for client-only mode
const tempConfigPath = path.join(__dirname, 'vite.client-only.config.ts');

// Create the client-only Vite config
const clientOnlyConfig = `
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'),
      '@assets': path.resolve(__dirname, './client/assets'),
      '@components': path.resolve(__dirname, './client/src/components'),
      '@lib': path.resolve(__dirname, './client/src/lib'),
      '@hooks': path.resolve(__dirname, './client/src/hooks'),
      '@icons': path.resolve(__dirname, './client/src/icons'),
      '@shared': path.resolve(__dirname, './shared'),
    },
  },
  server: {
    port: 3000,
    cors: true,
    open: true,
    host: true,
  }
});
`;

// Write the temporary config file
fs.writeFileSync(tempConfigPath, clientOnlyConfig);

// Install dependencies if needed
try {
  execSync('npx vite --version', { stdio: 'ignore' });
} catch (error) {
  console.log('Installing vite...');
  execSync('npm install --save-dev vite', { stdio: 'inherit' });
}

console.log('Starting client-only mode on port 3000...');
console.log('This will use mock data for API requests');
console.log('All API requests will be intercepted and served with local data');

try {
  // Start the client with the temporary config
  execSync(`npx vite --config ${tempConfigPath}`, { stdio: 'inherit' });
} catch (error) {
  console.error('Error starting client:', error);
} finally {
  // Clean up temporary config
  if (fs.existsSync(tempConfigPath)) {
    fs.unlinkSync(tempConfigPath);
  }
}