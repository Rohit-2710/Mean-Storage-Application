const userService = require("./../Services/userService");

class UserController {
  constructor() {}
  async registerUser(req, res) {
    try {
      const data = req.body;

      if (Object.keys(data).length > 0) {
        userService.registerUser(data).then((response) => {
          res.status(200).json(response);
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
