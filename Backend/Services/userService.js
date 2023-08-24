const mongoDB = require("./../Configs/db");
const auth = require("./../Controllers/authController");

class UserService {
  constructor() {
    this.db = new mongoDB();
    this.db.dbConfig();
  }
  async registerUser(data) {
    data.password = auth.hashPassword(data?.password);
    return this.db.createConnection("user").then(async (dbModel) => {
      const user = new dbModel(data);
      return new Promise((resolve, reject) => {
        user
          .save()
          .then((response) => {
            resolve(response);
          })
          .catch((err) => {
            if (err.code === 11000) {
              reject(
                `Email ${
                  err.keyValue[Object.keys(err.keyValue)[0]]
                } already exists`
              );
            }
            reject(err.errors.email.message);
          })
          .finally(() => {
            this.db.closeConnection();
          });
      });
    });
  }
  async loginUser(data) {
    if (Object.keys(data).length > 0) {
      return this.db.createConnection("user").then(async (dbModel) => {
        let response = await dbModel.findOne({ email: data.email }).lean();
        return new Promise((resolve, reject) => {
          if (auth.comparePassword(data.password, response.password)) {
            const generatedToken = auth.generateToken({
              email: response.email,
            });
            response.token = generatedToken;
            resolve(response);
          } else {
            reject("Wrong password");
          }
        });
      });
    }
  }
}
module.exports = new UserService();
