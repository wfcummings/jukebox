import express from "express";
const router = express.Router();
export default router;

import { createPlaylist } from "#db/queries/playlists";
import { createPlaylistTrack } from "#db/queries/playlists_tracks";
import { getPlaylists, getPlaylistById } from "#db/queries/playlists";

router.get("/", async (req, res) => {
  const playlists = await getPlaylists();
  res.send(playlists);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const playlist = await getPlaylistById(+id);

  if (!playlist)
    return res.status(404).send(`Playlist with #${id} does not exist.`);

  res.send(playlist);
});

router.post("/", async (req, res) => {
  if (!req.body) return res.status(400).send("Request body is required.");

  const { name, description } = req.body;
  if (!name || !description)
    return res.status(400).send("Request body requires: name, description");

  const file = await createPlaylist(name, description);
  res.status(201).send(playlist);
});
