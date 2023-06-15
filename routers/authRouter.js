const express = require("express");
const pool = require("../db/db");
const { hash, compareHash } = require("../utils/hash");
const { sign } = require("../utils/jwtservice");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const checkingEmail = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (checkingEmail.rowCount) {
      res.status(400).json({ message: "Email already registered" });
    } else {
      await pool.query(
        "INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)",
        [firstName, lastName, email, hash(password)]
      );
      const token = sign({
        firstName,
        email,
      });
      res.cookie("jwt", token);
      res.status(200).json({ message: "Signup Successful" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  if (user.rowCount) {
    const isPasswordValid = compareHash(password, user.password);
    if (isPasswordValid) {
      const token = sign({
        sub: "admin",
        email,
      });
      res.cookie("jwt", token);
    } else {
      res.status(400).json({ message: "Invalid User" });
    }
  } else {
    res.status(400).json({ message: "Invalid User" });
  }
});

module.exports = { authRouter };
