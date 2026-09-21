FROM node:22-alpine AS base
WORKDIR /app
COPY package.json ./
COPY server/package.json server/package.json
COPY client/package.json client/package.json
RUN npm install
RUN npm --prefix server install
RUN npm --prefix client install

COPY . .
RUN npm --prefix client run build

EXPOSE 4000
CMD ["npm", "--prefix", "server", "run", "start"]
