FROM node:16.13.1
WORKDIR /app
COPY package.json /app
RUN yarn
COPY . /app
CMD ["yarn", "start"]