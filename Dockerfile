FROM node:18.12.1

WORKDIR /app

COPY . .

RUN npm install

RUN npm run test

RUN npm run build

CMD ["node", "server.js"]

EXPOSE 3000
