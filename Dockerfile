# İlk aşama: Yapı oluşturma
FROM node:21.2-alpine AS build
WORKDIR /app

# Gerekli paketleri yükleyin
RUN apk add --no-cache python3 make g++

COPY package*.json ./

RUN npm config set fetch-retry-mintimeout 200000 && npm config set fetch-retry-maxtimeout 1200000

# Bağımlılıkları yükleyin
RUN npm install --ignore-scripts -g npm@10.8.1 && npm i --ignore-scripts -g rimraf
RUN npm ci

# Kodları kopyalayın ve projeyi derleyin
COPY . .
RUN npm run build

# Gereksiz bağımlılıkları temizleyin
RUN npm prune --production

# İkinci aşama: Çalıştırma
FROM node:21.2-alpine
WORKDIR /app

# Gerekli paketleri yükleyin
RUN apk add --no-cache python3 make g++

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY package*.json ./

EXPOSE 5062

CMD ["npm", "run", "start:prod"]
