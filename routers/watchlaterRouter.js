const express = require("express");
const { gatedAccess } = require("../middlewares/gatedAccess");

const watchlaterRouter = express.Router();

watchlaterRouter.get("/", gatedAccess, async (req, res) => {
  try {
    const user = await pool.query("SELECT _id FROM users WHERE email = $1", [
      req.jwt.email,
    ]);
    const userId = user.rows[0]._id;
    const watchLaterVideos = await pool.query(
      "SELECT * FROM watchlater LEFT JOIN video ON watchlater.video_id = video._id WHERE user_id = $1 ORDER BY timestamp ASC",
      [userId]
    );
    res.status(200).json({ history: historyVideos.rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

watchlaterRouter.post("/", gatedAccess, async (req, res) => {
  const { videoId } = req.body;
  try {
    const user = await pool.query("SELECT _id FROM users WHERE email = $1", [
      req.jwt.email,
    ]);
    const userId = user.rows[0]._id;
    await pool.query(
      "INSERT INTO watchlater (user_id, video_id) VALUES ($1, $2)",
      [userId, videoId]
    );
    res
      .status(200)
      .json({ message: "Video successfully added to watch later" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = { watchlaterRouter };
