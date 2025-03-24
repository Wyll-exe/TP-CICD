FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY startPost.sh /app/startPost.sh
RUN chmod +x /app/startPost.sh


EXPOSE 3000

CMD ["/bin/bash", "/app/startPost.sh"]