FROM node:10.11.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./package* ./
RUN npm install

COPY . .

RUN npm run build

ENV HOST 0.0.0.0
EXPOSE 3000

CMD [ "npm", "start" ]