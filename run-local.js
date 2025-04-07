import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if concurrently is installed
try {
  execSync('npx concurrently --version', { stdio: 'ignore' });
} catch (error) {
  console.log('Installing concurrently...');
  execSync('npm install --save-dev concurrently', { stdio: 'inherit' });
}

// Check if nanoid is installed
try {
  execSync('npx nanoid --version', { stdio: 'ignore' });
} catch (error) {
  console.log('Installing nanoid...');
  execSync('npm install --save nanoid', { stdio: 'inherit' });
}

// Start the application
console.log('Starting the application locally...');
execSync('npx tsx server/index.local.ts', { stdio: 'inherit' });