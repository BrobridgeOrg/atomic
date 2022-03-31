#FROM node:16-alpine3.12
FROM node:12-buster-slim
WORKDIR /atomic
COPY . .


RUN apt update && apt upgrade -y && apt install -y git make python3 g++ 
#RUN rm -rf ./package-lock.json ./node_modules
#RUN npm install -g npm-check-updates && ncu -u && npm update
RUN npm install && npm audit fix && npm run build && rm -rf packages/node_modules/@node-red/editor-client/src
RUN mkdir -p /data/atomic
RUN chmod 700 -R /data && chown -R 1001 /data
RUN mv ./gitconfig /.gitconfig

USER 1001
ENV NODE_PATH /data/atomic/node_modules
#ENV NODE_RED_ENABLE_PROJECTS=true
ENV ATOMIC_PUBLISH_COMMAND='cd /data/atomic && git add . && git commit -m "updated by atomic" && git push'
ENTRYPOINT [ "npm", "start", "--cache", "/data/atomic/.npm", "--", "--userDir", "/data/atomic", "/data/atomic/flows.json" ]

