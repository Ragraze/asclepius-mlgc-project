FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . . 
ENV PORT=
ENV MODEL_URL=
CMD [ "npm", "start"]
