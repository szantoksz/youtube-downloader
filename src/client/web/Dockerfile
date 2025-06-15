FROM caddy:2.10.0-alpine

# copy the app to the srv
COPY web/. /srv/

# copy the Caddyfile
COPY Caddyfile /etc/caddy/Caddyfile

# expose port 80
EXPOSE 80

# make environment variables
ENV APP="szantokszYtDownloader"
ENV VER="1.0.1"
ENV API_URL=""
