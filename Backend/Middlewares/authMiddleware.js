const auth = require("./../Controllers/authController");

module.exports = {
  authVerifyer: (req, res, next) => {
    const token = req?.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res.status(403).send("Access Denied");
    }
    auth
      .verifyToken(token)
      .then((data) => {
        req.email = data.email;
        next();
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).send("Invalid Token");
      });
  },
};
