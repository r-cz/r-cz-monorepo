#!/usr/bin/env bun

/**
 * Cloudflare Pages build script
 * 
 * This script properly builds packages before building the apps
 * to ensure all dependencies are available during the build process.
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

// Define app to build based on environment variable (defaults to 'main')
const APP_TO_BUILD = process.env.APP_TO_BUILD || 'main';

// Function to safely run a build command only if it exists in package.json
function safelyBuildPackage(packagePath) {
  const packageJsonPath = join(packagePath, 'package.json');
  
  if (!existsSync(packageJsonPath)) {
    console.log(`No package.json found at ${packagePath}, skipping.`);
    return;
  }
  
  try {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
    
    if (packageJson.scripts && packageJson.scripts.build) {
      console.log(`Building ${packageJson.name || 'package'}...`);
      execSync(`cd ${packagePath} && bun run build`, { stdio: 'inherit' });
    } else {
      console.log(`No build script found for ${packageJson.name || packagePath}, skipping.`);
    }
  } catch (error) {
    console.warn(`Warning: Failed to build ${packagePath}:`, error.message);
  }
}

console.log(`Building for Cloudflare Pages: ${APP_TO_BUILD}`);

try {
  // Build all packages in the correct dependency order
  const packagesToBuild = [
    'packages/config',
    'packages/theme',
    'packages/shadcn-ui',
    'packages/ui'
  ];
  
  for (const pkg of packagesToBuild) {
    safelyBuildPackage(pkg);
  }
  
  // Then build the specific app
  console.log(`Building app: ${APP_TO_BUILD}...`);
  execSync(`cd apps/${APP_TO_BUILD} && bun run build`, { stdio: 'inherit' });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
