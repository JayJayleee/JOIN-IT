FROM node:8
WORKDIR '/usr/src/app'
COPY package*.json ./
ADD package*.json /usr/src/app/package*.json
RUN /bin/sh -c /bin/sh -c npm install
ADD . /usr/src/app
COPY ./ ./
CMD ["npm","run","start"]
FROM nginx
