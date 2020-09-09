FROM node:12-buster

RUN set -e; \
    apt update; \
    apt install -y gettext; \
    rm -rf /var/lib/apt/lists/*

ARG branch=master

ENV NODE_ENV production
WORKDIR /opt/magic_mirror

RUN git clone --depth 1 -b ${branch} https://github.com/MichMich/MagicMirror.git .
RUN cp -R modules /opt/default_modules
RUN cp -R config /opt/default_config
RUN npm install --unsafe-perm --silent

RUN git clone --depth 1 -b master https://github.com/KirAsh4/calendar_monthly.git /opt/magic_mirror/modules/calendar_monthly
RUN git clone --depth 1 -b master https://github.com/shbatm/MMM-Carousel /opt/magic_mirror/modules/MMM-Carousel
RUN git clone --depth 1 -b master https://github.com/Toreke/MMM-Dynamic-Modules.git /opt/magic_mirror/modules/MMM-Dynamic-Modules
RUN git clone --depth 1 -b master https://github.com/alberttwong/MMM-iFrame.git /opt/magic_mirror/modules/MMM-iFrame
RUN git clone --depth 1 -b master https://github.com/shbatm/MMM-KeyBindings.git /opt/magic_mirror/modules/MMM-KeyBindings
RUN git clone --depth 1 -b master https://github.com/Jopyth/MMM-Remote-Control.git /opt/magic_mirror/modules/MMM-Remote-Control
RUN git clone --depth 1 -b master https://github.com/ronny3050/internet-monitor.git /opt/magic_mirror/modules/internet-monitor
RUN git clone --depth 1 -b master https://github.com/koldaman/MMM-MQTTExt.git /opt/magic_mirror/modules/MMM-MQTT


WORKDIR /opt/magic_mirror/modules/MMM-MQTT
RUN npm install

WORKDIR /opt/magic_mirror/modules/internet-monitor
RUN npm install

WORKDIR /opt/magic_mirror

COPY mm-docker-config.js docker-entrypoint.sh ./
RUN chmod +x ./docker-entrypoint.sh

EXPOSE 8080
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["node", "serveronly"]
