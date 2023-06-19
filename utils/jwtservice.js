const jwt = require("jsonwebtoken");

const sign = (payload, type) => {
  return jwt.sign(
    payload,
    type === "access"
      ? process.env.JWT_ACCESS_SECRET
      : process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: type === "access" ? "5s" : "24 hours",
    }
  );
};

const verify = (token, type) => {
  try {
    return jwt.verify(
      token,
      type === "access"
        ? process.env.JWT_ACCESS_SECRET
        : process.env.JWT_REFRESH_SECRET
    );
  } catch {
    return false;
  }
};

module.exports = { sign, verify };
