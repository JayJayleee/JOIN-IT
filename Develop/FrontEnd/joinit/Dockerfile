FROM node:alpine as builder
WORKDIR '/usr/src/app'
COPY package*.json ./
ADD package*.json /usr/src/app/package*.json
RUN npm install
ADD . /usr/src/app
COPY ./ ./
CMD ["npm","run","build"]
FROM nginx
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
