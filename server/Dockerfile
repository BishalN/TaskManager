FROM node

WORKDIR /usr/src/app
COPY package.json ./

RUN yarn install

COPY . .

RUN yarn build

ENV NODE_ENV production

EXPOSE 4000
CMD [ "node", "dist/index.js" ]
USER node