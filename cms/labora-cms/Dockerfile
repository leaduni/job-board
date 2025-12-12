# Multi-stage build for Next.js + Payload CMS
# Uses Node 20 to match engines and modern Next

FROM node:20-alpine AS deps
WORKDIR /app
# Enable pnpm via corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install OS deps needed by sharp
RUN apk add --no-cache \
  python3 \
  make \
  g++ \
  libc6-compat \
  git

# Copy lockfiles and package manifest first for better caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies (prod and dev for build)
RUN pnpm install --frozen-lockfile

FROM node:20-alpine AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate

# OS deps for sharp during build
RUN apk add --no-cache \
  python3 \
  make \
  g++ \
  libc6-compat \
  git

COPY --from=deps /app/node_modules /app/node_modules
COPY . .

# Build Next app
ENV NODE_ENV=production
RUN pnpm build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Minimal runtime deps
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN apk add --no-cache \
  libc6-compat \
  wget

# Copy only necessary files
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
# Optional: public assets. Remove if directory doesn't exist.
# COPY --from=builder /app/public ./public
COPY --from=builder /app/src ./src

# Expose port
EXPOSE 3000

# Default start command (Next production server)
CMD ["pnpm", "start"]
