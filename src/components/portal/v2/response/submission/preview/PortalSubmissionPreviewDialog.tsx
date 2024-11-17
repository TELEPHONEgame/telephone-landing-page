import React, { useState } from "react";
import { Tooltip } from "react-tooltip";

import styles from "./dialog.module.scss";

import { Submission } from "@components/portal/v2/types";
import PortalDialog from "@components/portal/v2/common/dialog/PortalDialog";

interface PortalSubmissionPreviewDialogProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly submission: Submission;
}

const PortalSubmissionPreviewDialog = ({
  isOpen,
  onClose,
  submission,
}: PortalSubmissionPreviewDialogProps) => {
  const hasMetadata =
    submission.title || submission.dimensions || submission.materials;

  return (
    <PortalDialog disableDialogContentStyles={true} isOpen={isOpen}>
      <button
        aria-label="Close dialog"
        className={styles.closeButton}
        onClick={onClose}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect
            x="1"
            y="1"
            width="30"
            height="30"
            rx="15"
            stroke="white"
            strokeWidth="2"
          />
          <path
            d="M24.4009 7.61425C24.1518 7.36458 23.8136 7.22427 23.4609 7.22427C23.1082 7.22427 22.77 7.36458 22.5209 7.61425L16.0009 14.1209L9.48094 7.60092C9.23183 7.35125 8.89363 7.21094 8.54094 7.21094C8.18825 7.21094 7.85005 7.35125 7.60094 7.60092C7.08094 8.12092 7.08094 8.96092 7.60094 9.48092L14.1209 16.0009L7.60094 22.5209C7.08094 23.0409 7.08094 23.8809 7.60094 24.4009C8.12094 24.9209 8.96094 24.9209 9.48094 24.4009L16.0009 17.8809L22.5209 24.4009C23.0409 24.9209 23.8809 24.9209 24.4009 24.4009C24.9209 23.8809 24.9209 23.0409 24.4009 22.5209L17.8809 16.0009L24.4009 9.48092C24.9076 8.97425 24.9076 8.12092 24.4009 7.61425Z"
            fill="white"
          />
        </svg>
      </button>
      <div className={styles.contents}>
        <div className={styles.preview}>
          <FilePreview submission={submission} />
        </div>
        {hasMetadata ? (
          <dl className={styles.metadata}>
            {submission.title ? (
              <>
                <dt>Title</dt>
                <dd>{submission.title}</dd>
              </>
            ) : null}
            {submission.materials ? (
              <>
                <dt>Materials</dt>
                <dd>{submission.materials}</dd>
              </>
            ) : null}
            {submission.dimensions ? (
              <>
                <dt>Dimensions</dt>
                <dd>{submission.dimensions}</dd>
              </>
            ) : null}
          </dl>
        ) : null}
      </div>
    </PortalDialog>
  );
};

const FilePreview = ({ submission }: { submission: Submission }) => {
  switch (submission.type) {
    case "audio":
      return <audio src={submission.file} controls={true} />;
    case "image":
      return <ImagePreview submission={submission} />;
    case "video":
      return <video src={submission.file} controls={true} />;
    default:
      return submission.written_work ? (
        <WrittenWorkPreview submission={submission} />
      ) : (
        submission.file
      );
  }
};

const ImagePreview = ({ submission }: { submission: Submission }) => {
  return <img className={styles.imagePreview} src={submission.file} />;
};

const WrittenWorkPreview = ({ submission }: { submission: Submission }) => {
  return (
    <div className={styles.writtenWorkPreview}>
      <div className={styles.writtenWorkPreviewContent}>
        <h1 className={styles.writtenWorkPreviewTitle}>
          {submission.title ?? "Untitled"}
        </h1>
        <div
          className={styles.writtenWorkPreviewBody}
          dangerouslySetInnerHTML={{ __html: submission.written_work }}
          data-is-poem={submission.written_work_line_wrap_disabled}
        />
      </div>
    </div>
  );
};

export default PortalSubmissionPreviewDialog;
