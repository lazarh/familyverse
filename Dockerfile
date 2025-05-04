\
# Stage 1: Install dependencies and build the application
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install Prisma CLI globally (needed for generation) - alternatively add it as a dev dependency
# RUN npm install -g prisma

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install --frozen-lockfile

# Copy Prisma schema
COPY prisma ./prisma/

# Generate Prisma client
# Ensure your DATABASE_URL is set appropriately in your deployment environment or CI/CD pipeline
# If DATABASE_URL is needed during build time for generation, you might need to pass it as a build arg.
# For now, assuming generation doesn't require DB connection or it's handled via env vars later.
RUN npx prisma generate

# Copy the rest of the application code
COPY . .

# Set NEXTAUTH_SECRET build argument (optional, better to use runtime env vars)
ARG NEXTAUTH_SECRET
ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET}

# Build the Next.js application
# Ensure DATABASE_URL is available if your build process needs it
# ENV DATABASE_URL=${DATABASE_URL} # Example if needed during build
RUN npm run build

# Prune development dependencies
RUN npm prune --production

# Stage 2: Production image
FROM node:20-alpine AS runner
WORKDIR /app

# Create a non-root user and group
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Copy generated Prisma client (ensure path matches your setup)
# Adjust the source path if your prisma client output differs
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
# If using the default output location (relative to schema):
# COPY --from=builder /app/prisma ./prisma # Copy schema if needed at runtime
# COPY --from=builder /app/src/generated/prisma ./src/generated/prisma # Adjust if needed

# Set user
USER nextjs

# Expose the port the app runs on
EXPOSE 3000

# Set environment variables (use runtime env vars for secrets)
# ENV NODE_ENV=production # Next.js automatically sets this for production builds
# ENV NEXTAUTH_URL=http://localhost:3000 # Set your production URL
# ENV NEXTAUTH_SECRET= # Provide this at runtime
# ENV DATABASE_URL= # Provide this at runtime

# Start the application
CMD ["node", "server.js"]

# Note: Ensure your next.config.ts has `output: 'standalone'` for this setup.
# If not, adjust the COPY commands and CMD accordingly (e.g., CMD ["npm", "start"])
