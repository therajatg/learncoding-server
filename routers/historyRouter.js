const express = require("express");

const historyRouter = express.Router();

historyRouter.get("/", (req, res) => {
  res.send("I am in history router");
});

module.exports = { historyRouter };
