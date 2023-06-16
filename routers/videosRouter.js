const express = require("express");
const { passiveAuth } = require("../middlewares/passiveAuth");
const pool = require("../db/db");

const videosRouter = express.Router();

videosRouter.get("/", passiveAuth, async (req, res) => {
  try {
    let allVideos = await pool.query("SELECT * FROM video");
    res.status(200).json({ videos: allVideos.rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

videosRouter.get("/:id", passiveAuth, async (req, res) => {
  try {
    const selectedVideo = await pool.query(
      "SELECT * FROM video WHERE _id = $1",
      [req.params.id]
    );
    if (selectedVideo.rowCount) {
      const relatedVideos = await pool.query(
        "SELECT * FROM video WHERE category_id = $1",
        [selectedVideo.rows[0].category_id]
      );
      res.status(200).json({
        selectedVideo: selectedVideo.rows[0],
        relatedVideos: relatedVideos.rows,
      });
    } else {
      res.status(404).json({ message: "Video not found" });
    }
  } catch (error) {
    res.status(404).json({ message: "Video not found" });
  }
});

module.exports = { videosRouter };
