FROM node:7.7-alpine

# install deps
ADD package.json /tmp/package.json
RUN cd /tmp && npm install

# Copy deps
RUN mkdir -p /opt/to-do-app && cp -a /tmp/node_modules /opt/to-do-app

# Setup workdir
WORKDIR /opt/to-do-app
RUN mkdir /opt/to-do-app/dist
COPY dist /opt/to-do-app/dist
COPY server.js /opt/to-do-app
COPY initialize.js /opt/to-do-app

# run
EXPOSE 8080
CMD ["sh", "-c", "node initialize && node server"]
