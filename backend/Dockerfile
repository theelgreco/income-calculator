# Stage 1: build
FROM node:22-alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Run your build
RUN rm -rf dist && npx prisma generate && npx tsc && cp -R public dist/public

# Stage 2: production
FROM node:22-alpine
WORKDIR /app

# Install OpenSSL
RUN apk add --no-cache openssl

# Install only prod deps
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built files from build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma

# Set working directory to dist if your entrypoint is there
WORKDIR /app
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/index.js"]