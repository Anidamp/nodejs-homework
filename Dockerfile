FROM node:16

WORKDIR /usr/src/

COPY package*.json .

RUN npm i

COPY . .

EXPOSE 5000

CMD ["npm", "start"]