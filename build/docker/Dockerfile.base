FROM node:16-alpine3.17
#FROM node:16-buster-slim
WORKDIR /atomic
COPY . .


RUN apk update && apk upgrade --available && apk add --no-cache git build-base
#RUN apt update && apt upgrade -y && apt install -y git make python3 g++ 
#RUN rm -rf ./package-lock.json ./node_modules
#RUN npm install -g npm-check-updates && ncu -u && npm update
#RUN npm install && npm audit fix && npm run build 
RUN npm install  body-parser@1.20.2 express@4.18.2 qs@6.5.3 minimatch@3.0.5 #&& npm install qs@6.7.3

RUN mkdir -p /data/atomic
RUN chmod 770 -R /data && chown -R 1001:0 /data
RUN mv ./gitconfig /.gitconfig
RUN rm -rf ./build  ./packages/node_modules/@node-red/editor-client/src

USER 1001
ENV NODE_PATH /data/atomic/node_modules
#ENV NODE_RED_ENABLE_PROJECTS=true
ENV ATOMIC_PUBLISH_COMMAND='cd /data/atomic && git add . && git commit -m "updated by atomic" && git push'
ENTRYPOINT [ "npm", "start", "--cache", "/data/atomic/.npm", "--", "--userDir", "/data/atomic", "/data/atomic/flows.json" ]

