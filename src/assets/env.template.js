(function(window) {
    window["env"] = window["env"] || {};
  
    // Environment variables
    window["env"]["springBootUrl"] = "${SPRINGBOOT_SERVICE_URL}";
    window["env"]["hostName"] = "${HOSTNAME}";
  })(this);