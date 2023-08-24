const mongoose = require("mongoose");
const dotenv = require("dotenv");
class DB {
  constructor() {
    this.mongoose = mongoose;
    dotenv.config();
  }

  declareSchema() {
    this.userSchema = this.mongoose.Schema({
      name: String,
      password: String,
      email: {
        type: String,
        unique: [true, "Email already exists in Database"],
        required: [true, "Email not provided"],
        trim: true,
        lowercase: true,
      },
      files: [
        {
          type: this.mongoose.Schema.Types.ObjectId,
          ref: "Files",
        },
      ],
    });

    this.fileSchema = this.mongoose.Schema({
      file: String,
      email: String,
      fileName: String,
      fileType: String,
    });
  }
  async createConnection(type) {
    await this.mongoose.connect(`${process.env.DB_URL}/${process.env.DB}`);
    if (type === "user") {
      const model = this.mongoose.model("Users", this.userSchema);
      return model;
    }
    const model = this.mongoose.model("Files", this.fileSchema);
    return model;
  }
  async closeConnection() {
    await this.mongoose.connection.close();
  }
  dbConfig() {
    this.declareSchema();
  }
}

module.exports = DB;
