FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install pnpm and dependencies
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the app
RUN pnpm run build

# Expose Vite port
EXPOSE 5173

# Run Vite preview server
CMD ["pnpm", "run", "preview", "--", "--host", "0.0.0.0"]
