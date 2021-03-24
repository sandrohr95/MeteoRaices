FROM node:12

WORKDIR /usr/src/app/api

COPY package*.json ./

RUN npm install

EXPOSE 9000

CMD ["npm", "start"]
