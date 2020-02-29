// This will take the environment configuration values from the
// "env" object built in "/src/assets/env.js", which is appended in index.html.
// When the application is packaged into a Docker container, the entrypoint.sh
// shell script will replace the values of this "env" object with the container
// environment variables. That's the only way to add dynamic configuration
// values to the Angular application.

export const environment = {
  production: true,
  kubernetesApiUrl: window["env"]["kubernetesApiUrl"]
};