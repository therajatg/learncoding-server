const express = require("express");
const pool = require("../db/db");
const { hash } = require("../utils/hash");
const { sign } = require("../utils/jwtservice");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const checkingEmail = await pool.query(
      "SELECT FROM users WHERE email = $1",
      [email]
    );
    if (checkingEmail.rowCount) {
      res.status(400).json({ message: "Email already registered" });
      console.log(checkingEmail);
    } else {
      await pool.query(
        "INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)",
        [firstName, lastName, email, hash(password)]
      );
      const token = sign({
        firstName,
        email,
      });
      res.cookie("jwt", token, { httpOnly: true });
      res.status(200).json({ message: "Signup Successful" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// authRouter.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const admin = await db
//     .selectFrom("admin")
//     .where("admin.email", "=", email)
//     .selectAll()
//     .executeTakeFirst();

//   if (admin) {
//     // console.log(admin.password);
//     const isPasswordValid = compareHash(password, admin.password);
//     if (isPasswordValid) {
//       //   res.send("valid user");
//       const token = sign({
//         sub: "admin",
//         email,
//       });
//       res.cookie("jwt", token, { httpOnly: true });
//     } else {
//       res.status(400).send("Invalid User");
//     }
//   } else {
//     res.status(400).send("Invalid User");
//   }
// });

module.exports = { authRouter };
