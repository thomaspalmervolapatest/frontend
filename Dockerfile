FROM node:18-alpine3.16 AS build_stage

WORKDIR /usr/src

COPY package*.json ./
COPY jsconfig.json ./
COPY .env ./
RUN npm i

COPY src src
COPY public public

RUN npm run build

FROM nginx:1.22-alpine

COPY --from=build_stage /usr/src/build /usr/share/nginx/app
COPY conf/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]