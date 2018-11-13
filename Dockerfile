FROM node:alpine as build

RUN apk add --update gzip

WORKDIR /temp-build

COPY package*.json ./
COPY yarn.lock ./
RUN yarn

COPY . .
RUN yarn build
RUN yarn gzip

FROM nginx:alpine

COPY entry.sh /var/www/entry.sh
COPY .env.production /var/www/.env.production
COPY nginx.config /etc/nginx/conf.d/default.conf
COPY --from=build /temp-build/build /usr/share/nginx/html

ENTRYPOINT ["sh", "/var/www/entry.sh"]