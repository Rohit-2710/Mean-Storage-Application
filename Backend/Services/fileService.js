const mongoDB = require("./../Configs/db");

class FileUploads {
  constructor() {
    this.db = new mongoDB();
    this.db.dbConfig();
  }
  async uploadSingle(data) {
    return this.db.createConnection("file").then((dbModel) => {
      const file = new dbModel(data);
      return new Promise((resolve, reject) => {
        file
          .save()
          .then((data) => {
            resolve(data);
          })
          .catch((err) => reject(err))
          .finally(() => this.db.closeConnection());
      });
    });
  }
}
module.exports = new FileUploads();
