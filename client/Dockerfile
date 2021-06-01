FROM node:13.12.0-alpine

WORKDIR /meteoapp

#env
ENV PATH /meteoapp/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install --silent
RUN npm install react-scripts@4.0.1 -g --silent

# add app
COPY . ./

EXPOSE 3000

CMD ["npm", "start"]
