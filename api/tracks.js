import express from "express";
const router = express.Router();
export default router;

import { getTracks, getTrackById } from "#db/queries/tracks";

router.get("/", async (req, res) => {
  const tracks = await getTracks();
  res.send(tracks);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const track = await getTrackById(+id);

  if (!track) return res.status(404).send(`Track with #${id} does not exist.`);

  res.send(track);
});
