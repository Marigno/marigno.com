//src/staticcms/index.js
import CMS from '@staticcms/core';

CMS.init({
  config: {
    backend: {
      name: "git-gateway",
      branch: "master"
    }
  }
});