import React from "react";

import styles from "./styles.module.scss";
import { Artist } from "@components/portal/v2/types";
import { useParams } from "react-router-dom";

interface PortalSubmissionEditProps {
  readonly artist: Artist;
}

const PortalSubmissionEdit = ({ artist }: PortalSubmissionEditProps) => {
  const { submissionId } = useParams();
  const submission = artist.submissions.find(
    (submission) => submission.id === Number(submissionId)
  );

  if (!submission) {
    return <div>Not found</div>;
  }

  return <div className={styles.root}>{submission.file}</div>;
};

export default PortalSubmissionEdit;
