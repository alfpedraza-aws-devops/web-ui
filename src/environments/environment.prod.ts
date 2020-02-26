export const environment = {
  production: true,
  springBootUrl: window["env"]["springBootUrl"] || "http://localhost:8080/vote",
  hostName: window["env"]["hostName"] || "localhost"
};