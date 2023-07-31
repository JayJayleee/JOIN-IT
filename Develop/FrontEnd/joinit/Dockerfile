#FROM node:18 as build
#WORKDIR /app
#COPY package*.json ./
#ADD package*.json /app/package*.json
#RUN /bin/sh -c /bin/sh -c npm install
#ADD . /app
#COPY ./ ./
#RUN npm run build

#FROM nginx
#COPY --from=build /app/build /usr/share/nginx/html

# 개발 서버 실행 환경
FROM node:18

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
