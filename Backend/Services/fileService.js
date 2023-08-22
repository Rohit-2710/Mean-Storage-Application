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
  async getAllFiles(data) {
    return this.db.createConnection("file").then((dbModel) => {
      return new Promise((resolve, reject) => {
        dbModel
          .aggregate([{ $match: { email: data.email } }])
          .then((result) => {
            resolve(result);
          })
          .catch((err) => {
            reject(err);
          })
          .finally(() => {
            this.db.closeConnection();
          });
      });
    });
  }
  async getFilesByType(data) {
    return this.db.createConnection("file").then((dbModel) => {
      return new Promise((resolve, reject) => {
        dbModel
          .aggregate([
            { $match: { email: data.email, fileType: data.fileType } },
          ])
          .then((result) => {
            resolve(result);
          })
          .catch((err) => {
            reject(err);
          })
          .finally(() => {
            this.db.closeConnection();
          });
      });
    });
  }
  async deleteFile(data) {
    return this.db.createConnection("file").then((dbModel) => {
      return new Promise((resolve, reject) => {
        dbModel
          .deleteOne({ _id: new this.db.mongoose.Types.ObjectId(data.id) })
          .then(() => {
            resolve({});
          })
          .catch((err) => {
            reject({});
          })
          .finally(() => {
            this.db.closeConnection();
          });
      });
    });
  }
}
module.exports = new FileUploads();
