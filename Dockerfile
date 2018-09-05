FROM node:10

COPY . /app

WORKDIR /app

RUN npm install --production

ENV NODE_ENV=production

ENTRYPOINT ["node", "extract-stats.js"]
