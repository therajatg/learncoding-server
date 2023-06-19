const { verify } = require("../utils/jwtservice");

const gatedAccess = (req, res, next) => {
  console.log(req.headers.authorization);

  const authHeader = req.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];
  const payload = verify(accessToken, "access");
  if (payload) {
    req.jwt = payload;
    next();
  } else {
    res.status(403).json({ message: "Unauthorized Request" });
  }
};

module.exports = { gatedAccess };
