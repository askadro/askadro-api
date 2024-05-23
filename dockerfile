# Base image
FROM node:21.2-alpine AS build

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY src src
COPY tsconfig*.json ./

RUN npm config set fetch-retry-mintimeout 200000 && npm config set fetch-retry-maxtimeout 1200000
RUN npm install --ignore-scripts -g npm@10.2.5 && npm i --ignore-scripts -g rimraf

RUN npm ci --ignore-scripts && npm run prebuild && npm run build && npm prune --production

FROM node:21.1-alpine
RUN apk upgrade --no-cache
USER node
WORKDIR /app
ENV TZ=Europe/Istanbul
COPY --from=build /app/dist dist
COPY --from=build /app/node_modules node_modules
EXPOSE 3000

CMD [ "node", "dist/main.js" ]
