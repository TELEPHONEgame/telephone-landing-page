import { Artist, MutableArtistFields } from "./types";
import {
  MutableSubmissionFields,
  Submission,
} from "@/components/portal/v2/types";
import { sanitize } from "@components/portal/v2/common/sanitize-html";
import pProgress, { PProgress } from "p-progress";
import { downloadZip } from "client-zip";

const SERVER_URL = "https://telephonegame.art/";
const FILE_NAME_MAX_LENGTH = 80;

export async function downloadAssignment(submissions: Submission[]) {
  let untitledCount = 0;

  const files = await Promise.all(
    submissions.map((submission) => {
      if (submission.written_work) {
        if (!submission.title) {
          untitledCount++;
        }

        return {
          input: outputWrittenWorkHtml(submission),
          name: submission.title
            ? `${slugify(submission.title)}.html`
            : `untitled-${untitledCount}.html`,
        };
      }

      return fetch(submission.file);
    })
  );

  // get the ZIP stream in a Blob
  const blob = await downloadZip(files).blob();

  // make and click a temporary link to download the Blob
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "test.zip";
  link.click();
  link.remove();
}

function outputWrittenWorkHtml(submission: Submission): File {
  const contents = `
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Roboto+Serif:ital,opsz,wght@0,8..144,100..900;1,8..144,100..900&display=swap" rel="stylesheet">
  
      <style>
      .root {
        font-family: "Roboto Serif", serif;
        font-size: 18px;
        line-height: 1.5;
        margin: 120px auto;
        max-width: 95%;
        width: 680px;
      }
  
      * {
        font-family: inherit;
        font-size: inherit;
      }
  
      [data-is-poem="true"] {
        white-space: pre;
      }
  
      p:not(:first-child),
      ul:not(:first-child),
      ol:not(:first-child) {
        margin-block-start: 1em;
      }
  
      </style>
    </head>

    <div
      class="root"
      data-is-poem="${submission.written_work_line_wrap_disabled}"
    >${submission.written_work}</div>
  `;

  return new File([contents], "text.html");
}

export async function getArtist(): Promise<Artist> {
  const response = await fetch(`${SERVER_URL}api/artists/me/`, {
    method: "GET",
    headers: getAuthHeaders(),
    credentials: "include", // This sends cookies with the request
  });

  if (!response.ok) {
    throw new Error("");
  }

  const artist = (await response.json()) as Artist;

  return {
    ...artist,
    submissions: artist.submissions.map((submission) => ({
      ...submission,
      written_work: submission.written_work
        ? sanitize(submission.written_work)
        : null,
    })),
  };
}

export async function updateArtist(
  artistId: number,
  artist: Partial<MutableArtistFields>
) {
  const response = await fetch(`${SERVER_URL}api/artists/${artistId}/`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    credentials: "include", // This sends cookies with the request
    body: JSON.stringify(artist),
  });

  if (!response.ok) {
    throw new Error("");
  }

  return;
}

export async function createSubmission(
  submission: Partial<MutableSubmissionFields>
) {
  const response = await fetch(`${SERVER_URL}api/submissions/`, {
    method: "POST",
    headers: getAuthHeaders(),
    credentials: "include", // This sends cookies with the request
    body: JSON.stringify({
      ...submission,
      written_work: submission.written_work
        ? sanitize(submission.written_work)
        : null,
    }),
  });

  return (await response.json()) as Submission;
}

export function createSubmissionFromFile(
  artistId: number,
  file: File
): PProgress<Submission> {
  return pProgress(async (progress) => {
    let fileName = file.name;

    // The `save-file-reference` endpoint errors if the file name is too long, so this
    // trims it if it's over the max length.
    if (fileName.length > FILE_NAME_MAX_LENGTH) {
      const fileNameParts = fileName.split(".");
      const fileExt =
        fileNameParts.length > 1
          ? `.${fileNameParts[fileNameParts.length - 1]}`
          : "";
      fileName = `${fileName.substring(0, 80 - fileExt.length)}${fileExt}`;
    }

    // Step 1: Get the signed URL for the file upload
    const signedUrlResponse = await generateSignedUrlForFileUpload(
      file,
      fileName
    );

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

          const savedSubmission = (await saveResponse.json()) as {
            submission: Submission;
          };
          resolve(savedSubmission.submission);
        } else {
          throw new Error("Failed to upload file to Google Cloud Storage");
        }
      };

      xhr.onerror = () => {
        reject("An error occurred during file upload");
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
      body: JSON.stringify({
        ...submission,
        written_work: submission.written_work
          ? sanitize(submission.written_work)
          : null,
      }),
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

/**
 * Convert a string to a url-friendly format
 *
 * @param string The string to format
 */
function slugify(string) {
  string = string.trim();
  string = string.toLowerCase();

  // remove accents, swap ñ for n, etc
  const from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
  const to = "aaaaaaeeeeiiiioooouuuunc------";

  for (let i = 0, l = from.length; i < l; i++) {
    string = string.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  return string
    .replace(/[^a-z0-9 -]/g, "") // Remove invalid chars.
    .replace(/\s+/g, "-") // Collapse whitespace and replace with "-".
    .replace(/-+/g, "-") // Collapse dashes.
    .replace(/^-+/, "") // Trim "-" from start of text.
    .replace(/-+$/, ""); // Trim "-" from end of text.
}
