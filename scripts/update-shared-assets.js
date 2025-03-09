/**
 * Update Shared Assets Script
 * 
 * This utility script is for updating shared assets from app directories.
 * NOTE: Going forward, new assets should be added directly to packages/assets/
 * This script is mainly for initial setup or synchronization.
 */

const fs = require('fs');
const path = require('path');

// Paths
const mainIconsPath = path.join(__dirname, '../apps/main/public/icons');
const assetsIconsPath = path.join(__dirname, '../packages/assets/icons');
const socialPreviewsPath = path.join(__dirname, '../packages/assets/social');

console.log('🔄 Updating shared assets repository...');

// Create destination directories if they don't exist
if (!fs.existsSync(assetsIconsPath)) {
  fs.mkdirSync(assetsIconsPath, { recursive: true });
  console.log('📁 Created directory:', assetsIconsPath);
}

if (!fs.existsSync(socialPreviewsPath)) {
  fs.mkdirSync(socialPreviewsPath, { recursive: true });
  console.log('📁 Created directory:', socialPreviewsPath);
}

// Copy icons from main app to assets package
console.log('✅ Syncing icon files...');
if (fs.existsSync(mainIconsPath)) {
  fs.readdirSync(mainIconsPath).forEach(file => {
    const sourcePath = path.join(mainIconsPath, file);
    const destPath = path.join(assetsIconsPath, file);
    
    // Skip if not a file
    if (!fs.lstatSync(sourcePath).isFile()) return;
    
    // Copy the file
    fs.copyFileSync(sourcePath, destPath);
    console.log(`  • Copied ${file}`);
  });
} else {
  console.log('⚠️ Main app icons directory not found. Skipping icons sync.');
}

// Copy social previews
const mainPreviewPath = path.join(__dirname, '../apps/main/public/social-preview.png');
if (fs.existsSync(mainPreviewPath)) {
  fs.copyFileSync(
    mainPreviewPath, 
    path.join(socialPreviewsPath, 'main-preview.png')
  );
  console.log('✅ Copied main social preview');
}

const toolsPreviewPath = path.join(__dirname, '../apps/tools/public/social-preview.png');
if (fs.existsSync(toolsPreviewPath)) {
  fs.copyFileSync(
    toolsPreviewPath, 
    path.join(socialPreviewsPath, 'tools-preview.png')
  );
  console.log('✅ Copied tools social preview');
}

console.log('\n💼 Asset update complete!');
console.log('📝 Note: New assets should be added directly to packages/assets/');
