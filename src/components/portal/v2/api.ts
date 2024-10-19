import { Artist } from "./types";

export async function getArtist(): Promise<Artist> {
  const server_url = "https://telephonegame.art/";
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get("token");
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Token ${token}`;
  }

  const response = await fetch(`${server_url}api/artists/me/`, {
    method: "GET",
    headers: headers,
    credentials: "include", // This sends cookies with the request
  });

  if (!response.ok) {
    throw new Error("");
  }

  return await response.json() as Artist;
}
