const jwt = require("jsonwebtoken");

const sign = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "3 hours",
  });
};

const verify = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return false;
  }
};

module.exports = { sign, verify };
