(function(window) {
    window["env"] = window["env"] || {};
  
    // Environment variables (Will be replaced by "/entrypoint.sh" at build time)
    // The result will be saved into "src/assets/env.js"
    window["env"]["kubernetesApiUrl"] = "${KUBERNETESAPI_SERVICE_URL}";
  })(this);