FROM node:lts-bullseye-slim
WORKDIR /home/node/app/
COPY ./package*.json /home/node/app/
RUN npm install
COPY ./src/ /home/node/app/src/
ENV PUBKEY d4c4a1d08220ddcb5e3137d41b46e5d0
ENV PRIKEY ee9839a677f517a64519ae3c2cb0066418ad764a
EXPOSE 3000
CMD ["npm", "run", "start"]