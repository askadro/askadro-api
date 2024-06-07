# Stage 1: Build the application
FROM node:21.2-alpine AS build

WORKDIR /app

# Install npm packages with package-lock.json
COPY package*.json ./
RUN npm ci --ignore-scripts

# Copy the source code
COPY src src
COPY tsconfig*.json ./

# Build the application
RUN npm run build

# Stage 2: Create a minimal runtime image
FROM node:21.1-alpine

# Set environment variables
ENV NODE_ENV=production \
    TZ=Europe/Istanbul

# Update packages and clean up
RUN apk update && \
    apk upgrade && \
    rm -rf /var/cache/apk/*

# Create a non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Switch to the non-root user
USER nodejs

WORKDIR /app

# Copy built files and node_modules from previous stage
COPY --from=build /app/dist dist
COPY --from=build --chown=nodejs:nodejs /app/node_modules node_modules

EXPOSE 5062

# Start the application
CMD ["node", "dist/main.js"]
