const cors_anywhere = require("cors-anywhere");

const host = "0.0.0.0";
const port = 8080;

cors_anywhere
  .createServer({
    originWhitelist: [], // Allow all origins
    removeHeaders: ["cookie", "cookie2"],
  })
  .listen(port, host, function () {
    console.log("CORS Anywhere server running at http://" + host + ":" + port);
  });
