# Stage 1: Install dependencies and build the application
FROM node:20 AS builder

WORKDIR /app

# Copy package.json and lock file
# Assumes you are using npm and have a package-lock.json.
# If you're using yarn, use 'COPY yarn.lock ./' and 'RUN yarn install --frozen-lockfile'
# If you're using pnpm, use 'COPY pnpm-lock.yaml ./' and 'RUN pnpm install --frozen-lockfile'
COPY package.json ./
COPY package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy prisma schema
COPY prisma ./prisma/

# Generate Prisma client
# This ensures the client is generated with the correct platform for the build environment
RUN npx prisma generate

# Copy the rest of the application code
# Ensure .dockerignore is set up to exclude node_modules, .git, .next, prisma/dev.db etc.
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine AS runner

WORKDIR /app

# Set environment variables
ENV NODE_ENV production
ENV PORT 3000

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy package.json and lock file from builder stage for installing only production dependencies
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json* ./
# If using yarn:
# COPY --from=builder /app/yarn.lock ./
# If using pnpm:
# COPY --from=builder /app/pnpm-lock.yaml ./

# Install production dependencies
# Ensure your package.json has a "start" script, e.g., "next start"
RUN npm ci --omit=dev
# If using yarn:
# RUN yarn install --production --frozen-lockfile
# If using pnpm:
# RUN pnpm install --prod --frozen-lockfile


# Copy the built application from the builder stage
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts
# Copy prisma schema and migrations for runtime (if needed, e.g., for running migrations or if schema is read at runtime)
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
# Copy the generated Prisma client, including the query engine for Alpine
COPY --from=builder --chown=nextjs:nodejs /app/src/generated/prisma ./src/generated/prisma

# Change ownership of the app directory
USER nextjs

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]