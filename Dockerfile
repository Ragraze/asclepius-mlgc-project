FROM node:18.16.0
WORKDIR /src/server/server.js
ENV PORT 3000
COPY . .
RUN npm install
EXPOSE 3000
CMD [ "npm", "run", "start"]