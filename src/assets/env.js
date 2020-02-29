(function(window) {
    window["env"] = window["env"] || {};
  
    // Environment variables (They are only valid at development time.
    // They will be replaced at built time by "/entrypoint.sh")
    window["env"]["kubernetesApiUrl"] = "http://a94911f66599911eaa5bc02fba4d2adf-647009387.us-east-2.elb.amazonaws.com";
  })(this);