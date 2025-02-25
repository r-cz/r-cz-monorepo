#!/bin/bash

echo "Setting up r-cz-monorepo..."

# Install dependencies
echo "Installing dependencies..."
bun install

# Build packages first
echo "Building shared packages..."
cd packages/config && bun run build
cd ../ui && bun run build
cd ../..

# Build main app
echo "Building main app..."
cd apps/main && bun run build
cd ../..

# Build tools app
echo "Building tools app..."
cd apps/tools && bun run build
cd ../..

echo "Setup complete!"
