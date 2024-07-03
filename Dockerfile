FROM node:21-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install -g @nestjs/cli
RUN npm ci --only=production
# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 5062

# Start the application
CMD [ "node", "dist/main.js" ]
