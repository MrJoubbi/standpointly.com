#!/usr/bin/env bash
set -e

echo "=========================================================="
echo "🔄 Standpointly — 1-Click Update Script"
echo "=========================================================="

cd "$(dirname "$0")"

# 0. Unlock aaPanel file attributes if set
chattr -i .user.ini 2>/dev/null || true

# 1. Fetch latest changes from GitHub
echo "📥 1/5 Fetching latest code from GitHub..."
git fetch origin main
git reset --hard origin/main

# Print current commit
echo "📌 Running commit:"
git log -1 --oneline

# 2. Clear aaPanel / Nginx proxy cache
echo "🧹 2/5 Clearing Nginx proxy cache..."
rm -rf /www/server/nginx/proxy_cache_dir/* /dev/shm/nginx_cache/* 2>/dev/null || true

# 3. Stop current container
echo "⏹️ 3/5 Stopping old container..."
docker compose down --remove-orphans

# 4. Build fresh without cache to prevent stale Next.js builds
echo "🔨 4/5 Building fresh production container (no cache)..."
docker compose build --no-cache

# 5. Start the new container & reload Nginx
echo "🚀 5/5 Starting updated container..."
docker compose up -d --force-recreate
nginx -s reload 2>/dev/null || true

# 6. Verify live status
echo "🩺 Verifying health on port 3000..."
sleep 4

if curl -s -f http://127.0.0.1:3000/api/vps-test > /dev/null; then
    echo ""
    echo "=========================================================="
    echo "✅ UPDATE SUCCESSFUL!"
    echo "   Latest commit is live on http://127.0.0.1:3000"
    echo "   Visit: https://standpointly.com"
    echo "=========================================================="
else
    echo ""
    echo "⚠️ Container started, checking docker ps:"
    docker compose ps
fi

