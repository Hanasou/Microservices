FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install && npm install typescript -g

COPY . .

RUN tsc

CMD ["npm", "start"]