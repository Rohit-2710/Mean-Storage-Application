const expressConfig = require("./expressConfig");
const express = require("express");
const dotenv = require("dotenv");
class AppConfig {
  constructor() {
    dotenv.config();
    this.app = express();
  }
  config() {
    new expressConfig(this.app).config();
  }
}
module.exports = AppConfig;
