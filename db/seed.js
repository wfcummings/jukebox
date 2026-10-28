import db from "#db/client";

import { createPlaylist } from "#db/queries/playlists";
import { createTrack } from "#db/queries/tracks";
import { createPlaylistTrack } from "#db/queries/playlists_tracks";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  for (let i = 1; i <= 20; i++) {
    await createPlaylist("Playlist " + i, "This is the playlist description");
    await createTrack("Track " + i, i * 10000);
  }
  for (let i = 1; i <= 15; i++) {
    const playlist_id = 1 + Math.floor(i / 2);
    await createPlaylistTrack(playlist_id, i);
  }
}
