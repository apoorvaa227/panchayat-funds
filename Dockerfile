FROM node:21 

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["node", "server.js"]