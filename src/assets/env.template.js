(function(window) {
    window["env"] = window["env"] || {};
  
    // Environment variables
    window["env"]["kubernetesApiUrl"] = "${KUBERNETESAPI_SERVICE_URL}";
  })(this);