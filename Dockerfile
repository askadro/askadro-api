FROM node:21.2-alpine AS build
COPY . .

RUN npm i

CMD ["npm", "start"]
