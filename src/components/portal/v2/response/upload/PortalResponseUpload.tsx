import React, { useEffect, useRef, useState } from "react";

import styles from "./styles.module.scss";
import {
  displayMediaFilePicker,
  FilePickerResult,
  getSubmissionTypeFromFileMimeType,
  MAX_MEDIA_FILE_SIZE_MB,
} from "@components/portal/v2/common/file/filepicker";
import { useArtist } from "@components/portal/v2/Portal";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import LoadingOverlay from "@/components/portal/LoadingOverlay";
import PortalSectionHeader from "@components/portal/v2/common/page/header/PortalPageHeader";
import PortalAccordion from "@components/portal/v2/common/accordion/PortalAccordion";
import PortalSubmissionEditForm from "@components/portal/v2/response/submission/edit/form/PortalSubmissionEditForm";
import { Submission } from "@/components/portal/v2/types";

const PortalResponseUpload = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const { artist } = useArtist();
  const { submissionType } = useParams();
  const initFilePickerTimeout = useRef<
    ReturnType<typeof setTimeout> | undefined
  >();
  const [submission, setSubmission] = useState<Submission|undefined>();

  useEffect(() => {
    if (submissionType === "file") {
      initFilePickerFlow();
    }

    return () => {
      clearTimeout(initFilePickerTimeout.current);
    };
  }, []);

  const initFilePickerFlow = () => {
    // The setTimeout is a workaround for the double rendering that React.StrictMode
    // does in development. Without it, the filepicker will show twice.
    initFilePickerTimeout.current = setTimeout(async () => {
      const { file, error } = await displayMediaFilePicker();

      if (error) {
        // TODO: make a better error state.
        alert(getUserVisibleFileUploadError(error));
      }

      if (file && !error) {
        setSubmission({
          dimensions: "",
          id: -1,
          file: URL.createObjectURL(file),
          focal_x: .5,
          focal_y: .5,
          materials: "",
          title: "",
          type: getSubmissionTypeFromFileMimeType(file.type),
        });
      } else {
        navigate(`/portal/response${search}`, {
          replace: true,
          viewTransition: true,
        });
      }
    }, 50);
  };

  return (
    <>
      <LoadingOverlay isLoading={!submission} />

      {submission ? (
        <div className={styles.root}>
          <PortalSectionHeader
            backToPath="/portal/response"
            showBackButton={true}
            title="Upload Artwork"
          />

          <div className={styles.accordion}>
            <PortalAccordion title="How do you want your artwork presented?">
              Now that you've imported your artwork, you have the option to
              provide additional details. Please take a moment to review the{" "}
              <a href="/faq" target="_blank">
                Usage and Permissions guidelines
              </a>{" "}
              related to your artwork to ensure you understand how it may be
              used and shared.
            </PortalAccordion>
          </div>

          <PortalSubmissionEditForm submission={submission} />
        </div>
      ) : null}
    </>
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
