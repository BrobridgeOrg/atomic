VERSION 0.7 # earthfile-version
FROM node:16-alpine3.17

WORKDIR /atomic

build-docker-brosync-jobmgr-base:
    FROM +base
    ARG IMAGE_VERSION=dev
    ARG EARTHLY_GIT_HASH
    LABEL org.opencontainers.image.source=https://github.com/BrobridgeOrg/atomic
    WORKDIR /atomic
    COPY --dir packages .
    COPY --dir build .
    COPY package.json .
    COPY Gruntfile.js .
    COPY gitconfig .
    ENV TZ Asia/Taipei
    RUN apk update && apk upgrade --available \
        && apk add --no-cache ca-certificates git build-base tzdata bash \
        && npm install body-parser@1.20.2 express@4.18.2 qs@6.5.3 minimatch@3.0.5 \
        && npm install atomic-jetstream@0.0.17 \
        && npm run build \
        && cp build/docker/settings.js /atomic/packages/node_modules/node-red/settings.js \
        && cp build/docker/atomic-logo.png /atomic/packages/node_modules/@node-red/editor-client/public/red/images/node-red-256.png \
        && sed -i 's/main/_main/g' packages/node_modules/@node-red/editor-client/package.json \
        && adduser -S -u 1001 app -G node \
        && mkdir -p /data/atomic \
        && chmod 770 -R /data && chown -R app:0 /data \
        && rm -rf build packages/node_modules/@node-red/editor-client/src \
        && apk del git build-base \
        && rm -rf /var/cache/apk/* \
        && echo -e "time: $(date +'%Y-%m-%d %H:%M:%S')\ngit: ${EARTHLY_GIT_HASH}" > /atomic/BUILD_INFO 
    USER app
    ENV NODE_PATH /data/atomic/node_modules
    ENV ATOMIC_PUBLISH_COMMAND='cd /data/atomic && git add . && git commit -m "updated by atomic" && git push'
    ENTRYPOINT [ "npm", "start", "--cache", "/data/atomic/.npm", "--", "--userDir", "/data/atomic", "/data/atomic/flows.json" ]
    EXPOSE 1880
    SAVE IMAGE --push ghcr.io/brobridgeorg/atomic/atomic-brosync-jobmgr-base:$IMAGE_VERSION
