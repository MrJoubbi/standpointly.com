#!/usr/bin/env bash
set -e

echo "=========================================================="
echo "🔄 Standpointly — 1-Click Update Script"
echo "=========================================================="

cd "$(dirname "$0")"

# 1. Fetch latest changes from GitHub
echo "📥 1/4 Fetching latest code from GitHub..."
git fetch origin main
git reset --hard origin/main

# Print current commit
echo "📌 Running commit:"
git log -1 --oneline

# 2. Stop current container
echo "⏹️ 2/4 Stopping old container..."
docker compose down

# 3. Build fresh without cache to prevent stale Next.js builds
echo "🔨 3/4 Building fresh production container (no cache)..."
docker compose build --no-cache

# 4. Start the new container
echo "🚀 4/4 Starting updated container..."
docker compose up -d

# 5. Verify live status
echo "🩺 Verifying health..."
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
