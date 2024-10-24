import { Submission } from "@/components/portal/v2/types";

export interface FilePickerResult {
  readonly error?: "tooLarge" | "invalidType" | "unknownError";
  readonly file?: File;
}

export const MAX_MEDIA_FILE_SIZE_MB = 1024;

export function displayFilePicker(
  accept: string[],
  maxFileSizeInMegabytes?: number
): Promise<FilePickerResult> {
  return new Promise((resolve) => {
    const filePicker = document.createElement("input");
    filePicker.type = "file";
    filePicker.accept = accept.join(",");
    filePicker.addEventListener("change", () => {
      const file = filePicker.files?.item(0);
      if (!file) {
        resolve({});
      }

      if (!accept.includes(file.type)) {
        resolve({ error: "invalidType" });
      }

      if (
        maxFileSizeInMegabytes &&
        file.size > maxFileSizeInMegabytes * 1024 * 1024
      ) {
        resolve({ error: "tooLarge" });
      }

      resolve({ file });
    });

    filePicker.addEventListener("cancel", () => {
      resolve({});
    });

    filePicker.click();
  });
}

export function displayMediaFilePicker() {
  return displayFilePicker(
    [...AUDIO_MIME_TYPES, ...IMAGE_MIME_TYPES, ...VIDEO_MIME_TYPES],
    MAX_MEDIA_FILE_SIZE_MB
  );
}

export function getSubmissionTypeFromFileMimeType(mimeType: string): Submission["type"] {
  switch (true) {
    case AUDIO_MIME_TYPES.includes(mimeType):
      return "audio";
    case IMAGE_MIME_TYPES.includes(mimeType):
      return "image";
    case VIDEO_MIME_TYPES.includes(mimeType):
      return "video";
    default:
      return "file";
  }
}

const AUDIO_MIME_TYPES = [
  "audio/mp4",
  "audio/mpeg",
  "audio/ogg",
  "audio/wav",
  "audio/webm",
];

const IMAGE_MIME_TYPES = ["image/gif", "image/jpeg", "image/png", "image/webp"];

const VIDEO_MIME_TYPES = ["video/mp4", "video/mpeg", "video/ogg", "video/webm"];
