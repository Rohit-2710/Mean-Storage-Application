const appConfig = require("./Configs/appConfig");
const dotenv = require("dotenv");
const userRoutes = require("./Routes/userRoutes");

class Server {
  constructor() {
    this.server = new appConfig();
    dotenv.config();
    this.server.config();
  }
  includeRoutes() {
    new userRoutes(this.server.app).configRoutes();
  }

  startServer() {
    try {
      this.includeRoutes();
      this.server.app.listen(3000, () => {
        console.log(
          `Server listening on ${process.env.HOST}/${process.env.PORT}`
        );
      });
    } catch (err) {
      console.log(err);
    }
  }
}
const server = new Server();
server.startServer();
