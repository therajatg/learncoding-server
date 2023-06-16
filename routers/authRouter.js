const express = require("express");
const pool = require("../db/db");
const { hash, compareHash } = require("../utils/hash");
const { sign } = require("../utils/jwtservice");
const { passiveAuth } = require("../middlewares/passiveAuth");

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
  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rowCount) {
      const isPasswordValid = compareHash(password, user.rows[0].password);
      if (isPasswordValid) {
        const token = sign({
          firstname: user.rows[0].firstname,
          email,
        });
        res.cookie("jwt", token);
        res.status(200).json({ message: "Login Successful" });
      } else {
        res.status(400).json({ message: "Invalid User" });
      }
    } else {
      res.status(400).json({ message: "Invalid User" });
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid User" });
  }
});

authRouter.post("/logout", async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "successfully logged out" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = { authRouter };
