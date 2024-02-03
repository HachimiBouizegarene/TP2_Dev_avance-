FROM node:lts-bullseye-slim
WORKDIR /home/node/app/
COPY ./package*.json /home/node/app/
RUN npm install
COPY ./src/ /home/node/app/src/
EXPOSE 3000
CMD ["npm", "run", "start"]