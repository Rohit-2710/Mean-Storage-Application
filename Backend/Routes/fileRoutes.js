const multer = require("multer");
const uploads = multer();
const { authVerifyer } = require("./../Middlewares/authMiddleware");
const fileController = require("./../Controllers/fileController");

class Routes {
  constructor(app) {
    this.app = app;
  }
  appRoutes() {
    this.app
      .route("/uploadSingle")
      .post(authVerifyer, uploads.single("file"), fileController.uploadSingle);
    this.app.route("/allFiles").get(authVerifyer, fileController.getAllFiles);
    this.app
      .route("/fileByType")
      .get(authVerifyer, fileController.getFilesByType);
  }
  routeConfig() {
    this.appRoutes();
  }
}
module.exports = Routes;
