require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const pool = require("./db/db");
const { historyRouter } = require("./routers/historyRouter");
const { likeRouter } = require("./routers/likeRouter");
const { playlistRouter } = require("./routers/playlistRouter");
const { watchlaterRouter } = require("./routers/watchlaterRouter");
const { authRouter } = require("./routers/authRouter");
const { passiveAuth } = require("./middlewares/passiveAuth");
const { videosRouter } = require("./routers/videosRouter");
const { verify, sign } = require("./utils/jwtservice");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/user/history", historyRouter);
app.use("/api/user/likes", likeRouter);
app.use("/api/user/playlists", playlistRouter);
app.use("/api/user/watchlater", watchlaterRouter);
app.use("/api/auth", authRouter);
app.use("/api/videos", videosRouter);

app.get("/api/categories", async (req, res) => {
  try {
    const categories = await pool.query("SELECT * FROM category");
    res.status(200).json({ categories: categories.rows });
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
});

app.get("/api/refresh", async (req, res) => {
  console.log("refresh");
  try {
    const verifiedRefreshToken = verify(req.cookies.jwt);
    if (verifiedRefreshToken) {
      const newAccessToken = sign({
        firstName: verifiedRefreshToken.firstName,
        email: verifiedRefreshToken.email,
      });
      res.status(200).json({
        firstName: verifiedRefreshToken.firstName,
        accessToken: newAccessToken,
      });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  } catch (error) {
    res.status(403).json({ message: "Invalid Refresh Token" });
  }
});

app.listen("5000", () => console.log("Server Started on port 5000"));
