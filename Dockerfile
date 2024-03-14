FROM node:18-alpine

LABEL maintainer="https://suk.kr"

ENV NODE_ENV=production
ENV TZ=Asia/Seoul

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "start:prod"]