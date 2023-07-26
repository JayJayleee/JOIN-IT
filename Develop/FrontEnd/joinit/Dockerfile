FROM node:latest as builder
WORKDIR '/usr/src/app'
COPY package*.json ./
ADD package*.json /usr/src/app/package*.json
RUN /bin/sh -c npm init && npm install
ADD . /usr/src/app
COPY ./ ./
CMD ["npm","run","start"]
FROM nginx
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
