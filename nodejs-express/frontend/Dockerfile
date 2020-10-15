FROM node:12

WORKDIR /usr/src/app

COPY package.json package-lock.json* yarn.lock* ./

RUN set -ex \
    && ([ -f yarn.lock ] && yarn install) \
    || ([ -f package-lock.json ] && npm ci) \
    || ([ -f package.json ] && npm install)

COPY . .

CMD [ "npm", "start" ]
