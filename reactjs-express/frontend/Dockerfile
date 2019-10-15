FROM node:12 as builder

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.12-alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
