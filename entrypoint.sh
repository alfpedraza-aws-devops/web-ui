#!/bin/sh

# Replace configuration variables in the transpiled code.
envsubst \
    < /usr/share/nginx/html/assets/env.template.js \
    > /usr/share/nginx/html/assets/env.js

# Runs nginx
nginx -g 'daemon off;'