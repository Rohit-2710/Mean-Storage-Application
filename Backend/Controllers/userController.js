const userService = require("./../Services/userService");

class UserController {
  constructor() {}
  async registerUser(req, res) {
    try {
      const data = req.body;

      if (Object.keys(data).length > 0) {
        userService
          .registerUser(data)
          .then((response) => {
            res.status(200).json(response);
          })
          .catch((err) => {
            return res.status(500).json({ message: err });
          });
      } else {
        res.status(500).json({ message: "No user data found" });
      }
    } catch (err) {
      res.status(500).json({ message: "error occured while registering user" });
    }
  }
  async userLogin(req, res) {
    try {
      const data = req.body;
      console.log(data);
      if (Object.keys(data).length > 0) {
        userService
          .loginUser(data)
          .then((response) => {
            res.status(200).json(response);
          })
          .catch((err) => {
            res.status(401).json(err);
          });
      } else {
        res.status(500).json({ message: "No user data found" });
      }
    } catch (err) {
      res.status(500).json({ message: "error occured while registering user" });
    }
  }
}
module.exports = new UserController();
