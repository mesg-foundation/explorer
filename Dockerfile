FROM node:12.13.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .
RUN npm install
RUN npm rebuild
COPY . .
RUN npm run build
EXPOSE 3000
ENV ENGINE_HOST=engine
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD [ "npm", "start" ]