# Kullanılan Node sürümünü ve çalışma dizinini ayarla
FROM node:21.2-alpine AS build

# Çalışma dizinini ayarla
WORKDIR /app

# Gereken dosyaları kopyala
COPY package*.json ./
COPY src src
COPY tsconfig*.json ./

# npm ayarlarını yap ve bağımlılıkları yükle
RUN npm config set fetch-retry-mintimeout 200000 && \
    npm config set fetch-retry-maxtimeout 1200000 && \
    npm install --ignore-scripts -g rimraf && \
    npm install --ignore-scripts

# Ön yapılandırmayı ve yapıyı çalıştır
RUN npm run prebuild && npm run build

# Final aşaması: Küçük bir Node.js imajı kullan
FROM node:21.2-alpine

# Gereken paketleri yükle
RUN apk add --no-cache make gcc g++ python3

# Node kullanıcısına geç
USER node

# Çalışma dizinini ayarla
WORKDIR /app

# Zaman dilimini ayarla
ENV TZ=Europe/Istanbul

# Gerekli dosyaları kopyala
COPY --from=build /app/dist dist
COPY --from=build /app/node_modules node_modules
COPY --from=build /app/package*.json ./

# Servis için gerekli portu aç
EXPOSE 5062

# Uygulamayı başlat
CMD ["node", "dist/main.js"]
