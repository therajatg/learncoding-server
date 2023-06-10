const express = require("express");
const { historyRouter } = require("./routers/historyRouter");
const { likeRouter } = require("./routers/likeRouter");
const { playlistRouter } = require("./routers/playlistRouter");
const { watchlaterRouter } = require("./routers/watchlaterRouter");
const { authRouter } = require("./routers/authRouter");
const cors = require("cors");
const pool = require("./db/db");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/user/history", historyRouter);
app.use("/api/user/likes", likeRouter);
app.use("/api/user/playlists", playlistRouter);
app.use("/api/user/watchlater", watchlaterRouter);
app.use("/api/auth", authRouter);

app.get("/api/videos", async (req, res) => {
  let allVideos = await pool.query("SELECT * FROM videos");
  allVideos = allVideos.rows.map(
    (item) =>
      "http://res.cloudinary.com/therajatg/image/upload/f_auto,q_auto/video library/" +
      item.thumbnail
  );
  res.status(200).json(allVideos);
});

app.listen("5000", () => console.log("Server Started"));
