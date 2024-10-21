import React from "react";

import styles from "./styles.module.scss";
import { Submission } from "@components/portal/v2/types";

interface PortalSubmissionPreviewProps {
  readonly listIndex: number;
  readonly showListInfo: boolean;
  readonly submission: Submission;
}

const PortalSubmissionPreview = ({
  listIndex,
  showListInfo,
  submission,
}: PortalSubmissionPreviewProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <span className={styles.ordinal}>{listIndex + 1}</span>
        <span className={styles.title}>Untitled</span>
        {showListInfo ? (
          <div className={styles.sortButtons}>
            <button className={styles.sortButton}>Up</button>
            <button className={styles.sortButton}>Down</button>
          </div>
        ) : null}
      </div>
      <div>
        <FilePreview submission={submission} />
      </div>
      <div className={styles.footer}>
        <button className={styles.footerButton}>Main Thumbnail</button>
        <button className={styles.footerButton}>Edit</button>
        <button className={styles.footerButton}>Delete</button>
      </div>
    </div>
  );
};

const FilePreview = ({ submission }: { submission: Submission }) => {
  switch (submission.type) {
    case "audio":
      return <audio src={submission.file} />;
    case "image":
      return <ImagePreview submission={submission} />;
    case "video":
      return <video src={submission.file} />;
    default:
      return submission.file;
  }
};

const ImagePreview = ({ submission }: { submission: Submission }) => {
  return (
    <div>
      <img src={submission.file} />
    </div>
  );
};

export default PortalSubmissionPreview;
