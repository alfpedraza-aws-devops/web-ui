#!/bin/sh

# This shell script will be executed as the entrypoint of the Docker 
# container that will execute this Angular application. It's purpose
# it's to inject the environment variables from the container into the
# Angular source code.

# Replace configuration variables in the transpiled code.
# The configuration variables comes from the image environment variables.
envsubst \
    < /usr/share/nginx/html/assets/env.template.js \
    > /usr/share/nginx/html/assets/env.js

# Runs nginx web server to serve the Angular application on port 80.
nginx -g 'daemon off;'