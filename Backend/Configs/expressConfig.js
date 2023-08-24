const express = require("express");
const cors = require("cors");

class ExpressConfig {
  constructor(app) {
    this.app = app;
  }
  config() {
    this.app.use([express.urlencoded(), express.json(), cors()]);
    this.app.set("view engine", "html");
    this.app.use(express.static(require("path").join("public")));
  }
}
module.exports = ExpressConfig;
