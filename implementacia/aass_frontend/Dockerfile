# syntax=docker/dockerfile:1
FROM node:19.0-alpine as build-stage
WORKDIR /query-fe
COPY package*.json ./
RUN npm install
COPY . .
RUN npm i -g @quasar/cli
RUN quasar build

# production stage
FROM nginx:stable-alpine as production-stage
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build-stage /query-fe/dist/spa /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
