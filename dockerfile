FROM node:18.16.1
COPY . /app
WORKDIR /app
RUN npm install
CMD ["npm", "run", "dev"]