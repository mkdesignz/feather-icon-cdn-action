FROM node:23-alpine3.20

WORKDIR /app

COPY package.json ./
RUN yarn install

COPY . .

EXPOSE 3000

RUN yarn build

CMD ["yarn", "start"]
