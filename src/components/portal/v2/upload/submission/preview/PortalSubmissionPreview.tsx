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
      {showListInfo ? <span>{listIndex + 1}</span> : null}
      {submission.file}
    </div>
  );
};

export default PortalSubmissionPreview;
