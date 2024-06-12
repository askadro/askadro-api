# İlk aşama: Yapı oluşturma
FROM node:22 AS build
WORKDIR /app
COPY . .
RUN npm config set fetch-retry-mintimeout 200000 && npm config set fetch-retry-maxtimeout 1200000

# Bağımlılıkları yükleyin
RUN npm install --ignore-scripts -g npm@10.8.1
RUN npm install --ignore-scripts  -g @nestjs/cli
RUN npm install --ignore-scripts -g rimraf
# Kodları kopyalayın ve projeyi derleyin
RUN npm install
RUN npm run build

# İkinci aşama: Çalıştırma
FROM node:22
WORKDIR /app

# Gerekli paketleri yükleyin

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY package*.json ./

CMD ["npm", "run", "start:prod"]
