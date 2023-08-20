class Routes {
  constructor(app) {
    this.app = app;
  }
  appRoutes() {
    this.app.route("/register").get();
    this.app.route("/register").post();
  }
  routeConfig() {
    this.appRoutes();
  }
}
module.exports = Routes;
