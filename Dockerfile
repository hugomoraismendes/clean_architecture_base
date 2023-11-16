FROM node:20.9.0-alpine AS dev

ENV PATH="/application/node_modules/.bin:${PATH}"

COPY docker/hmendes-ca.crt /usr/local/share/ca-certificates/hmendes-ca.crt
RUN apk add git openssh ca-certificates bash sudo make build-base libcap curl mysql-client python3 && update-ca-certificates
RUN echo "node ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/node && chmod 0440 /etc/sudoers.d/node
RUN sudo setcap cap_net_bind_service=+ep /usr/local/bin/node

RUN npm -g update

CMD cd "/application" && \
  if [ "$WATCH_FILES" == "1" ]; then npm run watch; else node "dist/app.js"; fi
