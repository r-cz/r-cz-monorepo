#!/usr/bin/env bun

/**
 * Clean script for r-cz-monorepo
 * Removes build artifacts, caches, node_modules, and test results
 * 
 * Usage: 
 *   bun clean           - Interactive mode (asks for confirmation)
 *   bun clean:dry       - Dry run (shows what would be deleted)
 *   bun clean:force     - Force deletion without confirmation
 *   bun clean:test      - Clean only Playwright test artifacts
 *   bun clean:test:dry  - Dry run for test artifacts only
 */

import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { execSync } from 'node:child_process';
import { readdir } from 'node:fs/promises';

// Configuration
const DRY_RUN = process.argv.includes('--dry-run');
const FORCE = process.argv.includes('--force');
const HELP = process.argv.includes('--help') || process.argv.includes('-h');
const TEST_ONLY = process.argv.includes('--test-only');

// Help text
if (HELP) {
  console.log(`
Clean script for r-cz-monorepo
-------------------------------
Usage: bun run clean [options]

Options:
  --dry-run     Show what would be deleted without actually deleting
  --force       Skip confirmation prompt
  --test-only   Clean only Playwright test artifacts
  --help, -h    Show this help message

This script removes:
  - All node_modules directories
  - .next build directories
  - out directories (Next.js export)
  - dist directories (in packages)
  - .turbo cache directory
  - Playwright test results and reports
  `);
  process.exit(0);
}

// Paths to clean
const ROOT_DIR = resolve(process.cwd());

// Define Playwright test directories
const PLAYWRIGHT_DIRS = [
  join(ROOT_DIR, 'test-results'),
  join(ROOT_DIR, 'playwright-report'),
  join(ROOT_DIR, 'blob-report'),
  join(ROOT_DIR, 'playwright/.cache')
];
const PATHS_TO_CLEAN = TEST_ONLY 
  ? [...PLAYWRIGHT_DIRS] // Only include Playwright dirs in test-only mode
  : [
      join(ROOT_DIR, 'node_modules'),
      join(ROOT_DIR, '.turbo'),
      ...PLAYWRIGHT_DIRS
    ];

// Find all apps and packages directories
async function findDirectories() {
  // If test-only mode, we've already defined all paths
  if (TEST_ONLY) {
    return PATHS_TO_CLEAN.filter(path => existsSync(path));
  }

  // Add apps/*/{node_modules,.next,out}
  if (existsSync(join(ROOT_DIR, 'apps'))) {
    const appDirs = await readdir(join(ROOT_DIR, 'apps'));
    for (const app of appDirs) {
      if (app.startsWith('.')) continue;
      PATHS_TO_CLEAN.push(join(ROOT_DIR, 'apps', app, 'node_modules'));
      PATHS_TO_CLEAN.push(join(ROOT_DIR, 'apps', app, '.next'));
      PATHS_TO_CLEAN.push(join(ROOT_DIR, 'apps', app, 'out'));
    }
  }

  // Add packages/*/{node_modules,dist}
  if (existsSync(join(ROOT_DIR, 'packages'))) {
    const packageDirs = await readdir(join(ROOT_DIR, 'packages'));
    for (const pkg of packageDirs) {
      if (pkg.startsWith('.')) continue;
      PATHS_TO_CLEAN.push(join(ROOT_DIR, 'packages', pkg, 'node_modules'));
      PATHS_TO_CLEAN.push(join(ROOT_DIR, 'packages', pkg, 'dist'));
    }
  }

  // Filter to only existing paths
  return PATHS_TO_CLEAN.filter(path => existsSync(path));
}

// Print what will be deleted
async function printSummary(paths) {
  if (TEST_ONLY) {
    console.log('\nTest-only mode: Cleaning only Playwright test directories');
  }

  console.log('\nThe following directories will be deleted:');
  console.log('----------------------------------------');
  
  paths.forEach(path => {
    const relPath = path.replace(ROOT_DIR + '/', '');
    console.log(`- ${relPath}`);
  });
  
  // Calculate disk space to be freed
  try {
    const output = execSync(`du -sh "${paths.join('" "')}"`, { stdio: ['pipe', 'pipe', 'ignore'] }).toString();
    const totalSize = output.split('\n').reduce((acc, line) => {
      const match = line.match(/^(\d+(?:\.\d+)?[GMK]?)\s+/);
      return match ? `${match[1]}` : acc;
    }, '0');
    
    console.log(`\nTotal space to be freed: approximately ${totalSize}`);
  } catch (e) {
    // du command failed, skip size calculation
  }
}

// Ask for confirmation
async function confirm() {
  if (FORCE) return true;
  if (DRY_RUN) {
    console.log('\nDRY RUN: No files will be deleted.');
    return false;
  }
  
  console.log('\nAre you sure you want to delete these directories? (y/N)');
  const response = await new Promise(resolve => {
    process.stdin.resume();
    process.stdin.once('data', data => {
      process.stdin.pause();
      resolve(data.toString().trim().toLowerCase());
    });
  });
  
  return response === 'y' || response === 'yes';
}

// Delete directories
function cleanDirectories(paths) {
  if (DRY_RUN) {
    console.log('\nDRY RUN completed. No files were deleted.');
    return;
  }
  
  console.log('\nCleaning directories...');
  
  paths.forEach(path => {
    try {
      execSync(`rm -rf "${path}"`);
      console.log(`✅ Removed: ${path.replace(ROOT_DIR + '/', '')}`);
    } catch (error) {
      console.error(`❌ Failed to remove: ${path.replace(ROOT_DIR + '/', '')}`);
    }
  });
  
  console.log('\n🧹 Clean completed successfully!');
  
  if (TEST_ONLY) {
    console.log('All test reports and results have been cleaned.');
  } else {
    console.log('Run "bun install" to reinstall dependencies.');
  }
}

// Main function
async function main() {
  console.log('🧹 r-cz-monorepo Clean Script');
  
  // Find directories to clean
  const pathsToClean = await findDirectories();
  
  if (pathsToClean.length === 0) {
    console.log('No directories to clean. Everything is already clean!');
    return;
  }
  
  // Show what will be deleted
  await printSummary(pathsToClean);
  
  // Ask for confirmation
  const shouldProceed = await confirm();
  
  // Clean if confirmed
  if (shouldProceed) {
    cleanDirectories(pathsToClean);
  } else if (!DRY_RUN) {
    console.log('\nOperation cancelled. No files were deleted.');
  }
}

main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
