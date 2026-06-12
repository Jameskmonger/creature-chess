FROM local/nodejs-base

ENV NX_DAEMON=false

ADD modules/@cc-engine/ ./modules/@cc-engine/
RUN yarn nx run-many -t build --projects='@cc-engine/*'

ADD modules/@cc-plugins/api/ ./modules/@cc-plugins/api/
RUN yarn nx run-many -t build --projects='@cc-plugins/api'

ADD modules/@creature-chess/ ./modules/@creature-chess/
RUN yarn nx run-many -t build --projects='@creature-chess/*'

ADD modules/@cc-plugins/ ./modules/@cc-plugins/
RUN yarn nx run-many -t build --projects='@cc-plugins/*'

ADD modules/@cc-server/ ./modules/@cc-server/
RUN yarn nx run-many -t build --projects='@cc-server/*'

ADD modules/@cc-bot/ ./modules/@cc-bot/
RUN yarn nx run-many -t build --projects='@cc-bot/*'
