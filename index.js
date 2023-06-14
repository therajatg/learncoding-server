require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const pool = require("./db/db");

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const { historyRouter } = require("./routers/historyRouter");
const { likeRouter } = require("./routers/likeRouter");
const { playlistRouter } = require("./routers/playlistRouter");
const { watchlaterRouter } = require("./routers/watchlaterRouter");
const { authRouter } = require("./routers/authRouter");

app.use("/api/user/history", historyRouter);
app.use("/api/user/likes", likeRouter);
app.use("/api/user/playlists", playlistRouter);
app.use("/api/user/watchlater", watchlaterRouter);
app.use("/api/auth", authRouter);

app.get("/api/videos", async (req, res) => {
  let allVideos = await pool.query("SELECT * FROM video");
  res.status(200).json({ videos: allVideos.rows });
});

app.get("/api/categories", async (req, res) => {
  try {
    const categories = await pool.query("SELECT * FROM category");
    res.status(200).json({ categories: categories.rows });
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
});

app.listen("5000", () => console.log("Server Started on port 5000"));
