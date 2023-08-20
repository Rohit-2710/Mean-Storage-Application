const mongooseDB = require("./../Configs/db");
const auth = require("./../Controllers/authController");

class UserService {
  constructor() {
    this.db = new mongooseDB();
    this.db.dbConfig();
  }
  async registerUser(data) {
    data.password = auth.hashPassword(data?.password);
    return this.db.createConnection("user").then(async (dbModel) => {
      const user = new dbModel(data);
      return user.save().then((data) => {
        this.db.closeConnection();

        return data;
      });
    });
  }
}
module.exports = new UserService();
