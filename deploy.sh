#!/usr/bin/env bash
set -e

echo "=========================================================="
echo "🚀 Standpointly — Production VPS Deployment Script"
echo "=========================================================="

# 1. Check if Docker and Docker Compose are installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first:"
    echo "   curl -fsSL https://get.docker.com | sh"
    exit 1
fi

if ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose is not installed or enabled."
    exit 1
fi

# 2. Check if .env exists, if not copy from .env.example
if [ ! -f .env ]; then
    echo "⚠️  No .env file found. Creating .env from .env.example..."
    cp .env.example .env
    echo "👉 Please edit .env with your domain name (SITE_URL) before launching."
fi

# 3. Pull / Build containers
echo "📦 Building Standpointly production container (including Playwright/Chromium)..."
docker compose build --pull

# 4. Start services in background
echo "⚡ Starting services..."
docker compose up -d

# 5. Check health
echo "🔍 Checking container status..."
sleep 3
docker compose ps

echo "=========================================================="
echo "✅ Standpointly is now running on 127.0.0.1:3000"
echo "   Next steps:"
echo "   - Cloudflare Tunnel: Connect tunnel to http://localhost:3000"
echo "   - OR Nginx: Symlink nginx.conf to /etc/nginx/sites-enabled/"
echo "=========================================================="
