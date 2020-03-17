# Build Image
# Updates the packages in the image running "npm install".
# Installs angular and performs a "ng build" to generate the app.
FROM node:12.2.0 as build-image
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@8.3.23
COPY . /app
RUN ng build --output-path=dist --configuration=production

# Final Image
# Copies the transpiled code from the previous stage into the nginx path.
# Executes the entrypoint.sh bash script to set the environment variables.
FROM nginx:1.16.0-alpine
COPY --from=build-image /app/dist /usr/share/nginx/html
COPY --from=build-image /app/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
EXPOSE 80
CMD ["/entrypoint.sh"]