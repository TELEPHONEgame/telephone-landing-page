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
            <SortButton direction="up" />
            <SortButton direction="down" />
          </div>
        ) : null}
      </div>
      <div className={styles.content}>
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

const SortButton = ({ direction }: {direction: "up" | "down"}) => {
  return (
    <button className={styles.sortButton}>
      <svg
        className={direction === "down" ? styles.flipIcon : null}
        width="22"
        height="22"
        viewBox="0 0 22 22"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9.93674 0.607309C10.5225 0.0215221 11.4723 0.0215221 12.0581 0.607309L21.3914 9.94064C21.9772 10.5264 21.9772 11.4762 21.3914 12.062C20.8056 12.6477 19.8559 12.6477 19.2701 12.062L12.4974 5.28929V20.3346C12.4974 21.1631 11.8258 21.8346 10.9974 21.8346C10.169 21.8346 9.4974 21.1631 9.4974 20.3346V5.28929L2.72472 12.062C2.13894 12.6477 1.18919 12.6477 0.603402 12.062C0.0176159 11.4762 0.0176159 10.5264 0.603402 9.94064L9.93674 0.607309Z"
          fill="#2D4663"
        />
      </svg>
    </button>
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
