FROM kkarczmarczyk/node-yarn
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn run build:prod
ENV PORT=80
ENTRYPOINT [ "node", "server/server.js" ]