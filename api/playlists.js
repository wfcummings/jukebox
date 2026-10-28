import express from "express";
const router = express.Router();
export default router;

import { createPlaylist } from "#db/queries/playlists";
import { createPlaylistTrack } from "#db/queries/playlists_tracks";
import { getPlaylists, getPlaylistById } from "#db/queries/playlists";
import { getTracksByPlaylistId } from "#db/queries/tracks";

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

  const playlist = await createPlaylist(name, description);
  res.status(201).send(playlist);
});

router.get("/:id/tracks", async (req, res) => {
  const { id } = req.params;
  const playlist = await getPlaylistById(id);
  if (!playlist) return res.status(404).send("Playlist not found.");

  const tracks = await getTracksByPlaylistId(id);

  if (!tracks)
    return res.status(404).send(`Tracks with Playlist #${id} does not exist.`);
  res.send(tracks);
});

router.post("/:id/tracks", async (req, res) => {
  const { id } = req.params;
  const playlist = await getPlaylistById(id);
  if (!playlist) return res.status(404).send("Playlist not found.");

  if (!req.body) return res.status(400).send("Request body is required.");

  const { trackId } = req.body;
  if (!trackId) return res.status(400).send("Request body requires: trackId");

  const playlistTrack = await createPlaylistTrack(id, trackId);
  res.status(201).send(playlistTrack);
});
