import { execSync } from 'child_process';

console.log('========================================');
console.log('Starting My Disposables App - CLIENT ONLY MODE');
console.log('========================================');
console.log('- Using mock data for all API requests');
console.log('- Frontend will run on http://localhost:3000');
console.log('- No backend server required');
console.log('========================================');

try {
  execSync('npx vite --config vite.client-only.config.js', { stdio: 'inherit' });
} catch (error) {
  console.error('Error starting client:', error);
}