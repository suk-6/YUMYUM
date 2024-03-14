FROM node:18-alpine

LABEL maintainer="https://suk.kr"

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start:prod"]