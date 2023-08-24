const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class Auth {
  constructor() {}

  hashPassword(password) {
    if (password) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    }
  }
  comparePassword(password, hash) {
    if (password) {
      return bcrypt.compareSync(password, hash);
    }
  }

  generateToken(data) {
    if (Object.keys(data).length > 0) {
      return jwt.sign(data, process.env.PRIVATEKEY);
    }
  }
  verifyToken(token) {
    return new Promise((resolve, reject) => {
      try {
        if (token) {
          const result = jwt.verify(token, process.env.PRIVATEKEY);
          resolve(result);
        }
      } catch (err) {
        reject(err);
      }
    });
  }
}
module.exports = new Auth();
