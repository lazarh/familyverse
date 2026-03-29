# Stage 1: Install dependencies and build the application
FROM --platform=linux/arm/v7 node:20 AS builder

WORKDIR /app

# Copy package.json and lock file
COPY package.json ./
COPY package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy Drizzle config
COPY drizzle.config.ts ./

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Production image
FROM --platform=linux/arm/v7 node:20-alpine AS runner

WORKDIR /app

# Set environment variables
ENV NODE_ENV production
ENV PORT 3000

# Install OpenSSL for arm/v7
RUN apk add --no-cache openssl

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy package.json and lock file from builder stage
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json* ./

# Install production dependencies
RUN npm ci --omit=dev

# Copy drizzle config and database files
COPY --from=builder /app/drizzle.config.ts ./
COPY --from=builder /app/drizzle ./drizzle/

# Copy database file location
RUN mkdir -p /app/prisma && chown -R nextjs:nodejs /app/prisma

# Copy the built application from the builder stage
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts

# Copy libsql for arm/v7
COPY --from=builder /app/node_modules/@libsql/client ./node_modules/@libsql/client

USER nextjs

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
