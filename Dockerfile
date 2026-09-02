# Multi-stage production Dockerfile for Standpointly with Playwright Chromium support
FROM node:20-bookworm-slim AS base
WORKDIR /app
ENV NODE_ENV=production
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

# --- 1. Install dependencies ---
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
# Install all dependencies (including devDependencies like Tailwind/PostCSS needed for Next.js build)
RUN npm install --include=dev --legacy-peer-deps

# --- 2. Build Next.js app ---
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set dummy env during build time if needed
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
RUN npm run build

# --- 3. Production runner ---
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NEXT_TELEMETRY_DISABLED=1
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright
ENV CHROMIUM_PATH=/usr/bin/chromium

# Install required system packages for Playwright Chromium and fonts (including international Arabic fonts)
RUN apt-get update && apt-get install -y --no-install-recommends \
    chromium \
    fonts-liberation \
    fonts-noto-core \
    fonts-noto-cjk \
    fonts-noto-extra \
    fonts-kacst \
    fonts-freefont-ttf \
    ca-certificates \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libxshmfence1 \
    libx11-xcb1 \
    && mkdir -p /ms-playwright \
    && npx --yes playwright@1.58.0 install chromium \
    && chmod -R 777 /ms-playwright \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Add non-root node user permissions
RUN mkdir -p /app/config /app/public /app/.next

# Copy standalone build and static assets
COPY --from=builder /app/public ./public
COPY --from=builder /app/config ./config
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Expose Next.js default port
EXPOSE 3000

# Start Next.js standalone server
CMD ["node", "server.js"]
