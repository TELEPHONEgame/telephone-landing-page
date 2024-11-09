import React, { useEffect, useRef, useState } from "react";

import * as api from "@components/portal/v2/api";
import {
  displayMediaFilePicker,
  FilePickerResult,
  MAX_MEDIA_FILE_SIZE_MB,
} from "@components/portal/v2/common/file/filepicker";
import { useArtist } from "@components/portal/v2/Portal";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import LoadingOverlay from "@/components/portal/LoadingOverlay";

const PortalResponseUpload = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const { artist, reloadArtist } = useArtist();
  const { submissionType } = useParams();
  const initFilePickerTimeout = useRef<
    ReturnType<typeof setTimeout> | undefined
  >();
  const [savePercentage, setSavePercentage] = useState(0);

  useEffect(() => {
    // The setTimeout is a workaround for the double rendering that React.StrictMode
    // does in development. Without it, the filepicker will show twice.
    initFilePickerTimeout.current = setTimeout(() => {
      if (submissionType === "file") {
        initFilePickerFlow();
      } else if (submissionType === "text") {
        initWrittenWorkFlow();
      } else {
        redirectToSubmissionsList();
      }
    }, 50);

    return () => {
      clearTimeout(initFilePickerTimeout.current);
    };
  }, []);

  const initWrittenWorkFlow = async () => {
    const submission = await api.createSubmission({
      order: artist.submissions.length + 1,
      written_work: "New work"
    });

    await reloadArtist();

    navigate(`/portal/response/${submission.id}/edit${search}`, {
      replace: true,
      viewTransition: true,
    });
  };

  const initFilePickerFlow = async () => {
    const { file, error } = await displayMediaFilePicker();

    if (error) {
      // TODO: make a better error state.
      alert(getUserVisibleFileUploadError(error));
    }

    if (!file) {
      redirectToSubmissionsList();
      return;
    }

    uploadFileAndRedirectToSubmission(file);
  };

  const uploadFileAndRedirectToSubmission = async (file: File) => {
    const uploadPromise = api.createSubmissionFromFile(artist.id, file);

    uploadPromise.onProgress((progress) => {
      setSavePercentage(progress);
    });

    const submission = await uploadPromise;
    await reloadArtist();

    navigate(`/portal/response/${submission.id}/edit${search}`, {
      replace: true,
      viewTransition: true,
    });
  };

  const redirectToSubmissionsList = () => {
    navigate(`/portal/response${search}`, {
      replace: true,
      viewTransition: true,
    });
  };

  return (
    <LoadingOverlay
      isLoading={true}
      message={`Uploading (${Math.round(savePercentage * 100)}%)...`}
    />
  );
};

export default PortalResponseUpload;

function getUserVisibleFileUploadError(error: FilePickerResult["error"]) {
  switch (error) {
    case "invalidType":
      return "Unsupported file type selected.";
    case "tooLarge":
      return `Selected file is larger than than the max of ${MAX_MEDIA_FILE_SIZE_MB} megabytes.`;
    case "unknownError":
      return "Something went wrong. Please try again.";
  }
}
