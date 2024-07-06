FROM node:21.2-alpine as Build

# Set working directory
WORKDIR /app
COPY package*.json ./
COPY src src
COPY tsconfig*.json ./

RUN npm config set fetch-retry-mintimeout 200000 && npm config set fetch-retry-maxtimeout 1200000
RUN npm install --ignore-scripts -g npm@10.2.4 && npm i --ignore-scripts -g rimraf

# Install dependencies
RUN #npm install -g @nestjs/cli
RUN npm ci --ignore-scripts && npm run prebuild && npm run build && npm prune --production

FROM node:21.2-alpine
RUN apk upgrade --no-cache
USER node
WORKDIR /app
ENV TZ=Europe/Istanbul
COPY --from=build /app/dist dist
COPY --from=build /app/node_modules node_modules
# Expose the port the app runs on
EXPOSE 5062

# Start the application
CMD [ "node", "dist/main.js" ]
