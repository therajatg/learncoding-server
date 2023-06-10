const express = require("express");

const playlistRouter = express.Router();

playlistRouter.get("/", (req, res) => {});

module.exports = { playlistRouter };
