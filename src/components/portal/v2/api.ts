import { Artist } from "./types";
import {
  MutableSubmissionFields,
  Submission,
} from "@/components/portal/v2/types";
import pProgress, { PProgress } from "p-progress";

const SERVER_URL = "https://telephonegame.art/";
const FILE_NAME_MAX_LENGTH = 80;

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

export function createSubmission(
  artistId: number,
  file: File
): PProgress<Submission> {
  return pProgress(async (progress) => {
    let fileName = file.name;

    // The `save-file-reference` endpoint errors if the file name is too long, so this
    // trims it if it's over the max length.
    if (fileName.length > FILE_NAME_MAX_LENGTH) {
      const fileNameParts = fileName.split(".");
      const fileExt = fileNameParts.length > 1 ? `.${fileNameParts[fileNameParts.length - 1]}` : "";
      fileName = `${fileName.substring(0, 80 - fileExt.length)}${fileExt}`;
    }

    // Step 1: Get the signed URL for the file upload
    const signedUrlResponse = await generateSignedUrlForFileUpload(file, fileName);

    if (!signedUrlResponse.ok) {
      throw new Error("Failed to get signed URL");
    }

    const signedUrlData = await signedUrlResponse.json();
    const signedUrl = signedUrlData.signed_url;

    // Step 2: Upload the file using XMLHttpRequest to track progress
    const xhr = new XMLHttpRequest();

    xhr.open("PUT", signedUrl, true);
    xhr.setRequestHeader("Content-Type", file.type);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        progress(event.loaded / event.total);
      }
    };

    // Step 3: Save the file reference in the Django model
    return new Promise((resolve, reject) => {
      xhr.onload = async () => {
        if (xhr.status === 200) {
          const saveResponse = await fetch(
            `${SERVER_URL}api/save-file-reference/`,
            {
              method: "POST",
              headers: getAuthHeaders(),
              body: JSON.stringify({
                file_name: fileName,
                artist_id: artistId,
              }),
            }
          );

          if (!saveResponse.ok) {
            throw new Error("Failed to save file reference in Django model");
          }

          const savedSubmission = (await saveResponse.json()) as {submission: Submission};
          resolve(savedSubmission.submission);
        } else {
          throw new Error("Failed to upload file to Google Cloud Storage");
        }
      };

      xhr.onerror = () => {
        reject('An error occurred during file upload');
      };

      // Send the file
      xhr.send(file);
    });
  });
}

export async function deleteSubmission(submissionId: number) {
  const response = await fetch(
    `${SERVER_URL}api/submissions/${submissionId}/`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
      credentials: "include", // This sends cookies with the request
    }
  );

  if (!response.ok) {
    throw new Error("");
  }

  return;
}

export async function updateSubmission(
  submissionId: number,
  submission: Partial<MutableSubmissionFields>
) {
  const response = await fetch(
    `${SERVER_URL}api/submissions/${submissionId}/`,
    {
      method: "PATCH",
      headers: getAuthHeaders(),
      credentials: "include", // This sends cookies with the request
      body: JSON.stringify(submission),
    }
  );

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

async function generateSignedUrlForFileUpload(file: File, fileName: string) {
  return fetch(
    `${SERVER_URL}api/generate-signed-url/?file_name=${fileName}&content_type=${file.type}`,
    {
      method: "GET",
      headers: getAuthHeaders(),
      credentials: "include",
    }
  );
}
