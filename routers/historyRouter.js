const express = require("express");
const pool = require("../db/db");
const { gatedAccess } = require("../middlewares/gatedAccess");

const historyRouter = express.Router();

historyRouter.get("/", gatedAccess, async (req, res) => {
  console.log("cdcdwe");
  try {
    const user = await pool.query("SELECT _id FROM users WHERE email = $1", [
      req.jwt.email,
    ]);
    const userId = user.rows[0]._id;
    const historyVideos = await pool.query(
      "SELECT * FROM history LEFT JOIN video ON history.video_id = video._id WHERE user_id = $1 ORDER BY timestamp ASC",
      [userId]
    );
    res.status(200).json({ history: historyVideos.rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

historyRouter.post("/", gatedAccess, async (req, res) => {
  const { videoId } = req.body;
  try {
    const user = await pool.query("SELECT _id FROM users WHERE email = $1", [
      req.jwt.email,
    ]);
    const userId = user.rows[0]._id;
    const alreadyPresent = await pool.query(
      "UPDATE history SET timeStamp=CURRENT_TIMESTAMP WHERE user_id = $1 AND video_id = $2",
      [userId, videoId]
    );
    if (!alreadyPresent.rowCount) {
      await pool.query(
        "INSERT INTO history (user_id, video_id) VALUES ($1, $2)",
        [userId, videoId]
      );
    }
    res.status(200).json({ message: "Video successfully added to history" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

historyRouter.delete("/all", gatedAccess, async (req, res) => {
  try {
    const user = await pool.query("SELECT _id FROM users WHERE email = $1", [
      req.jwt.email,
    ]);
    const userId = user.rows[0]._id;
    console.log("userId", userId);
    await pool.query("DELETE FROM history WHERE video_id = $1", [userId]);
    res.status(200).json({ message: "History Cleared" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

historyRouter.delete("/:videoId", gatedAccess, async (req, res) => {
  try {
    const { videoId } = req.params;
    const user = await pool.query("SELECT _id FROM users WHERE email = $1", [
      req.jwt.email,
    ]);
    const userId = user.rows[0]._id;

    await pool.query(
      "DELETE FROM history WHERE video_id = $1 AND user_id = $2",
      [videoId, userId]
    );

    const historyVideos = await pool.query(
      "SELECT * FROM history LEFT JOIN video ON history.video_id = video._id WHERE user_id = $1 ORDER BY timestamp ASC",
      [userId]
    );
    res.status(200).json({ history: historyVideos.rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = { historyRouter };
