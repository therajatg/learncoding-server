const express = require("express");
const pool = require("../db/db");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  console.log("djdwjcndwjncwejhbchejwdbcvjwebvejhrwbvcehjr");
  const { email, password } = req.body;
  try {
    await pool.query(
      "INSERT INTO learncoding (email, password) VALUES ($1, $2)",
      [email, password]
    );
  } catch (error) {}
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const admin = await db
    .selectFrom("admin")
    .where("admin.email", "=", email)
    .selectAll()
    .executeTakeFirst();

  if (admin) {
    // console.log(admin.password);
    const isPasswordValid = compareHash(password, admin.password);
    if (isPasswordValid) {
      //   res.send("valid user");
      const token = sign({
        sub: "admin",
        email,
      });
      res.cookie("jwt", token, { httpOnly: true });
    } else {
      res.status(400).send("Invalid User");
    }
  } else {
    res.status(400).send("Invalid User");
  }
});

module.exports = { authRouter };
