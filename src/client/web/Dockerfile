FROM nginx:stable-alpine3.21-perl

# copy the app to the web foler
COPY web/. /usr/share/nginx/html

# copy the nginx config
COPY default.conf /etc/nginx/conf.d/default.conf

# expose port 80
EXPOSE 80

# start the website
CMD ["nginx", "-g", "daemon off;"]