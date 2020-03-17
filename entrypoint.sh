#!/bin/sh

# This shell script will be executed as the entrypoint of the Docker 
# container that will execute this Angular application. Its purpose
# is to inject the environment variables from the Docker container into
# the Angular transpiled source code.

# Replace the configuration variables in the transpiled code.
# The values come from the Docker container environment variables.
envsubst \
    < /usr/share/nginx/html/assets/env.template.js \
    > /usr/share/nginx/html/assets/env.js

# Run the nginx web server to serve the Angular application on port 80.
nginx -g 'daemon off;'