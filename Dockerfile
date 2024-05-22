FROM node:18.16.0
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . . 
ENV PORT=3000
ENV MODEL_URL=
CMD [ "npm", "run", "start"]
