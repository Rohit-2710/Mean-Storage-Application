const { authVerifyer } = require("./../Middlewares/authMiddleware");
const userController = require("./../Controllers/userController");

class UserRoutes {
  constructor(app) {
    this.app = app;
  }

  allRoutes() {
    this.app.route("/register").post(userController.registerUser);
    this.app.route("/login").post(userController.userLogin);
  }
  configRoutes() {
    this.allRoutes();
  }
}
module.exports = UserRoutes;
