FROM node:9 AS build

WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm install

COPY . /app/
RUN $(npm bin)/hexo generate

FROM nginx

COPY --from=build /app/public /usr/share/nginx/html
