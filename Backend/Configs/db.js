const mongoose = require("mongoose");
const dotenv = require("dotenv");
class DB {
  constructor() {
    this.db = mongoose;
    dotenv.config();
  }

  declareSchema() {
    this.Schema = this.db.Schema({
      file: String,
      tenant: String,
      fileName: String,
      fileType: String,
    });
  }
  async createConnection(collection) {
    await this.db.connect(`${process.env.DB_URL}/${process.env.DB}`);
    const model = this.db.model(collection, this.Schema);
    return model;
  }
  dbConfig() {
    this.declareSchema();
  }
}

module.exports = DB;
