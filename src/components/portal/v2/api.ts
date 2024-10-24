import { Artist } from "./types";
import { Submission } from "@/components/portal/v2/types";

const SERVER_URL = "https://telephonegame.art/";

export async function getArtist(): Promise<Artist> {
  const response = await fetch(`${SERVER_URL}api/artists/me/`, {
    method: "GET",
    headers: getAuthHeaders(),
    credentials: "include", // This sends cookies with the request
  });

  if (!response.ok) {
    throw new Error("");
  }

  return (await response.json()) as Artist;
}

export async function deleteSubmission(submissionId: number) {
  const response = await fetch(`${SERVER_URL}api/submissions/${submissionId}/`, {
    method: "DELETE",
    headers: getAuthHeaders(),
    credentials: "include", // This sends cookies with the request
  });

  if (!response.ok) {
    throw new Error("");
  }

  return;
}

export async function updateSubmission(submissionId: number, submission: Submission) {
  const response = await fetch(`${SERVER_URL}api/submissions/${submissionId}/`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    credentials: "include", // This sends cookies with the request
    body: JSON.stringify(submission),
  });

  if (!response.ok) {
    throw new Error("");
  }

  return;
}

function getAuthHeaders(): Record<string, string> {
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get("token");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Token ${token}`;
  }

  return headers;
}
