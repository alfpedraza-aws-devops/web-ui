(function(window) {
    window["env"] = window["env"] || {};
  
    // Environment variables
    window["env"]["kubernetesApiUrl"] = "http://localhost:8001/api/v1/namespaces/default/services/kubernetes-api:kubernetes-api/proxy";
  })(this);