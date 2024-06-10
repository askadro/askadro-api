FROM node:21.2-alpine AS build
WORKDIR /app
COPY package*.json ./
COPY src ./src
COPY tsconfig*.json ./
COPY .env .

RUN npm config set fetch-retry-mintimeout 200000 && npm config set fetch-retry-maxtimeout 1200000
RUN npm install --ignore-scripts -g npm@10.8.1 && npm i --ignore-scripts -g rimraf

RUN npm ci --ignore-scripts && npm run build && npm prune --production

FROM node:21.2-alpine
RUN apk upgrade --no-cache
USER node
WORKDIR /app


EXPOSE 5062

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY package*.json ./

CMD ["node", "dist/main.js"]
