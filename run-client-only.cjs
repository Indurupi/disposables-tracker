// Run this with: node run-client-only.cjs
const { exec } = require('child_process');

console.log('========================================');
console.log('Starting My Disposables App - CLIENT ONLY MODE');
console.log('========================================');
console.log('- Using mock data for all API requests');
console.log('- Frontend will run on http://localhost:3000');
console.log('- No backend server required');
console.log('========================================');

// Run the Vite dev server with the client-only config
exec('npx vite --config vite.client-only.config.js', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  
  console.log(stdout);
  console.error(stderr);
});