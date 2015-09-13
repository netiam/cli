FROM mhart/alpine-node:4

RUN apk add --update make gcc g++ python

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app/
COPY ./dist /app
RUN npm install --production

RUN apk del make gcc g++ python && rm -rf /tmp/* /var/cache/apk/* /root/.npm /root/.node-gyp

ENV NODE_ENV {{=it.server.env}}
ENV WORKERS {{=it.server.workers}}
ENV PORT {{=it.server.port}}
ENV DB_NAME {{=it.database.name}}
ENV DB_HOST {{=it.database.host}}
ENV DB_PORT {{=it.database.port}}
ENV DB_USER {{=it.database.username}}
ENV DB_PASS {{=it.database.password}}

EXPOSE {{=it.server.port}}

CMD ["node", "cluster.js"]
