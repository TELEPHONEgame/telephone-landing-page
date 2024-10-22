import React from "react";

import styles from "./styles.module.scss";
import { Artist } from "@components/portal/v2/types";
import { useParams } from "react-router-dom";
import PortalSectionHeader from "@components/portal/v2/common/page/header/PortalPageHeader";

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

  return (
    <div className={styles.root}>
      <PortalSectionHeader backToPath="/portal/response" showBackButton={true} title="Edit Artwork" />

      <div className={styles.editor}>{submission.file}</div>

      <div className={styles.footer}>
        <button className={styles.footerButtonOutlined}>Discard</button>
        <button className={styles.footerButtonFilled}>Save</button>
      </div>
    </div>
  );
};

export default PortalSubmissionEdit;
