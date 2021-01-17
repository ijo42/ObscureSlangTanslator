FROM node:14
USER node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .
CMD [ "node", "index.js" ]