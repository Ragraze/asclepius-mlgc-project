FROM node:18.16.0
WORKDIR /app
ENV PORT=8080
COPY . . 
RUN npm install
EXPOSE 8080
COPY .env .
CMD [ "npm", "run", "start"]