const auth = require("./../Controllers/authController");

module.exports = {
  authVerifyer: (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(403).send("Access Denied");
    }
    auth
      .verifyToken(token)
      .then((data) => {
        req.user = data;
        next();
      })
      .catch((err) => {
        return res.status(400).send("Invalid Token");
      });
  },
};
