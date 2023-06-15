const { verify } = require("../utils/jwtservice");

const gatedAccess = (req, res, next) => {
  const jwtCookie = req.cookies.jwt;

  const payload = verify(jwtCookie);

  if (payload) {
    req.jwt = payload;
    next();
  } else {
    res.json({ message: "Unauthorized Request" });
  }
};

module.exports = { gatedAccess };
