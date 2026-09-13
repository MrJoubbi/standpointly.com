# Project Knowledge & Deployment Rules

## VPS Production Deployment Procedure (aaPanel / Docker / Nginx)

When deploying changes to `https://standpointly.com` on the VPS (`/www/wwwroot/standpointly.com`), always use this exact sequence:

1. **Clear aaPanel Proxy Cache & Lock Attributes**:
   - `chattr -i .user.ini 2>/dev/null || true` (prevents aaPanel `.user.ini` file-lock errors during git clean/reset)
   - `rm -rf /www/server/nginx/proxy_cache_dir/* /dev/shm/nginx_cache/* 2>/dev/null || true` (clears stale Nginx proxy/fastcgi cache)

2. **Git Synchronization**:
   - `git fetch origin main`
   - `git reset --hard origin/main`

3. **Clean Docker Rebuild**:
   - `docker compose down --remove-orphans`
   - `docker compose build --no-cache` (crucial: avoids stale Next.js build layer caching)
   - `docker compose up -d --force-recreate`

4. **Nginx Reload & Verification**:
   - `nginx -s reload`
   - `curl -s http://127.0.0.1:3000/api/vps-test`

The all-in-one script `/www/wwwroot/standpointly.com/update.sh` has this procedure pre-configured.
