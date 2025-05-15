FROM node:9 AS build

WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn install --pure-lockfile

COPY . /app/
RUN yarn run hexo generate

FROM busybox

COPY --from=build /app/public /public_html
