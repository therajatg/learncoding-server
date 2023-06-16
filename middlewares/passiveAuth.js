const { verify } = require("../utils/jwtservice");

const passiveAuth = (req, res, next) => {
  const jwtCookie = req.cookies?.jwt;
  const payload = verify(jwtCookie);
  if (payload) {
    req.jwt = payload;
  } else {
    res.clearCookie("jwt");
  }
  next();
};

module.exports = { passiveAuth };
