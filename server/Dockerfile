# Multi-stage build for the resume-preview Fly.io service.
# Uses Node 20 + Debian slim (bookworm) to get native canvas prebuilts
# from @napi-rs/canvas without needing Cairo/Pango system libs.

# ── Builder ──────────────────────────────────────────────────────────
FROM node:20-bookworm-slim AS builder

WORKDIR /app

# Install deps with lockfile-like strictness (no lockfile yet — use npm install)
COPY package.json ./
RUN npm install --no-audit --no-fund --loglevel=error

# Compile TypeScript
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# ── Runtime ──────────────────────────────────────────────────────────
FROM node:20-bookworm-slim AS runtime

ENV NODE_ENV=production
WORKDIR /app

# Copy prod deps + compiled JS
COPY package.json ./
RUN npm install --omit=dev --no-audit --no-fund --loglevel=error

COPY --from=builder /app/dist ./dist

# Fly.io's default internal port. Also set via fly.toml.
ENV PORT=8080
EXPOSE 8080

# Non-root user is standard practice; node image ships with `node` user
USER node

CMD ["node", "dist/server.js"]
