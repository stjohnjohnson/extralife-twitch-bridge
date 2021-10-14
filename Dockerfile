FROM node:16-alpine
WORKDIR /usr/src/app
RUN chown -R node:node /usr/src/app
USER node
COPY --chown=node:node package*.json ./
RUN npm install
COPY app.js .
CMD [ "npm", "start" ]