FROM node:21.2-alpine AS build
WORKDIR /app
COPY package*.json ./
COPY src ./src
COPY tsconfig*.json ./

RUN npm config set fetch-retry-mintimeout 200000 && npm config set fetch-retry-maxtimeout 1200000
RUN npm install --ignore-scripts -g npm@10.8.1 && npm i --ignore-scripts -g rimraf

RUN npm ci --ignore-scripts && npm run build && npm prune --production

FROM node:21.2-alpine
RUN apk upgrade --no-cache
USER node
WORKDIR /app

ENV NODE_ENV=production
ENV TZ=Europe/Istanbul
ENV PORT=5062
ENV HOST=localhost
ENV DB_PORT=5431
ENV DB_PASSWORD=24262060
ENV DB_USERNAME=postgres
ENV DB_DATABASE=askadrovip
ENV SALT_OR_ROUNDS=10
ENV APP_NAME='AS KADRO VİP'
ENV EXPIRES_IN=7d
ENV EXPIRES_REFRESH=7
ENV REFRESH_TOKEN_TIME=604800000
ENV SECRET_KEY_JWT=askadrovip-mustafa-dursun
ENV MAIL_FROM_NAME=askadro
ENV MAIL_FROM_ADDRESS=hakanxd@askadrovip.com
ENV MAIL_HOST=mail.askadrovip.com
ENV MAIL_PORT=465
ENV MAIL_USERNAME=hakanxd@askadrovip.com
ENV MAIL_PASSWORD=5CsaF9bm.xn2CGY
ENV MAIL_SUBJECT="Talepler için personel temin listesi"

EXPOSE 5062

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY package*.json ./

CMD ["node", "dist/main.js"]
