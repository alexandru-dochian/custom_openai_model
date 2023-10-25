FROM node:14 as build
WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY src src
COPY public public
RUN npm run build

FROM nginx:latest
EXPOSE 4000

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
