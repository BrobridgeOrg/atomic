FROM node:16-alpine3.12
WORKDIR /atomic
COPY . .

RUN apk update && apk upgrade --available
RUN npm install && npm run build && rm -rf packages/node_modules/@node-red/editor-client/src
RUN mkdir /data
RUN chmod 700 -R /data && chown -R 1001 /data

USER 1001
ENV NODE_PATH /data/node_modules
ENTRYPOINT [ "npm", "start", "--cache", "/data/.npm", "--", "--userDir", "/data", "/data/flows.json" ]


