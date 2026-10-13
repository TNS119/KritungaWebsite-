# Multi-stage Dockerfile for Kritunga Backend Service
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root and backend package definitions
COPY package.json package-lock.json ./
COPY backend/package.json ./backend/
COPY backend/tsconfig.json ./backend/
COPY backend/prisma ./backend/prisma/

# Install dependencies including Prisma
RUN npm ci --workspace=backend

# Copy backend source
COPY backend/src ./backend/src/

# Generate Prisma Client and compile TypeScript
WORKDIR /app/backend
RUN npx prisma generate
RUN npm run build

# Stage 2: Minimal Production Image
FROM node:20-alpine AS runner

WORKDIR /app/backend

ENV NODE_ENV=production
ENV PORT=5000

# Install openssl for Prisma runtime
RUN apk add --no-cache openssl

# Create persistent storage directory for SQLite database
RUN mkdir -p /app/backend/data

# Copy built artifacts and dependencies
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/backend/node_modules ./node_modules
COPY --from=builder /app/backend/dist ./dist
COPY --from=builder /app/backend/prisma ./prisma
COPY --from=builder /app/backend/package.json ./

EXPOSE 5000

CMD ["npm", "run", "start:prod"]
