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
