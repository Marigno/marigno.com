//src/netlifycms/index.js
import CMS from "netlify-cms-app";

CMS.init({
  config: {
    backend: {
      name: "git-gateway"
    }
  }
});