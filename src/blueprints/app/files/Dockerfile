FROM mhart/alpine-node:6

RUN apk add --update make gcc g++ python

# Install graphicsmagick from source because install via apk not working
ENV PKGNAME=graphicsmagick
ENV PKGVER=1.3.24
ENV PKGSOURCE=http://downloads.sourceforge.net/$PKGNAME/$PKGNAME/$PKGVER/GraphicsMagick-$PKGVER.tar.lz

# Installing graphicsmagick dependencies
RUN apk add --update lzip \
                     wget \
                     ffmpeg \
                     libjpeg-turbo-dev \
                     libpng-dev \
                     libtool \
                     libgomp && \
    wget $PKGSOURCE && \
    lzip -d -c GraphicsMagick-$PKGVER.tar.lz | tar -xvf - && \
    cd GraphicsMagick-$PKGVER && \
    ./configure \
      --build=$CBUILD \
      --host=$CHOST \
      --prefix=/usr \
      --sysconfdir=/etc \
      --mandir=/usr/share/man \
      --infodir=/usr/share/info \
      --localstatedir=/var \
      --enable-shared \
      --disable-static \
      --with-modules \
      --with-threads \
      --with-gs-font-dir=/usr/share/fonts/Type1 \
      --with-quantum-depth=16 && \
    make && \
    make install && \
    cd / && \
    rm -rf GraphicsMagick-$PKGVER && \
    rm GraphicsMagick-$PKGVER.tar.lz

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app/
COPY ./dist /app
RUN npm install --production

RUN apk del make gcc g++ python && rm -rf /tmp/* /var/cache/apk/* /root/.npm /root/.node-gyp

ENV NODE_ENV {{=it.server.env}}
ENV WORKERS {{=it.server.workers}}
ENV PORT {{=it.server.port}}
{{? it.db.name }}
ENV DB_NAME {{=it.db.name}}
{{?}}
{{? it.db.host }}
ENV DB_HOST {{=it.db.host}}
{{?}}
{{? it.db.port }}
ENV DB_PORT {{=it.db.port}}
{{?}}
{{? it.db.username }}
ENV DB_USER {{=it.db.username}}
{{?}}
{{? it.db.username }}
ENV DB_PASS {{=it.db.password}}
{{?}}

EXPOSE {{=it.server.port}}

CMD ["node", "cluster.js"]
