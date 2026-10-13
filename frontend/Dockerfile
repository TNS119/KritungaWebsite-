# Multi-stage Dockerfile for Kritunga Next.js Frontend
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root and frontend package definitions
COPY package.json package-lock.json ./
COPY frontend/package.json ./frontend/

RUN npm ci --workspace=frontend

# Copy frontend source and public assets
COPY frontend ./frontend

WORKDIR /app/frontend

# Build Next.js production bundle
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Stage 2: Production Runner
FROM node:20-alpine AS runner

WORKDIR /app/frontend

ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/frontend/node_modules ./node_modules
COPY --from=builder /app/frontend/.next ./.next
COPY --from=builder /app/frontend/public ./public
COPY --from=builder /app/frontend/package.json ./

EXPOSE 3000

CMD ["npm", "run", "start"]
