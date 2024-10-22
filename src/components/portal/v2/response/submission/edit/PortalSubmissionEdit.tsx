import React, { useState } from "react";

import styles from "./styles.module.scss";
import { Artist } from "@components/portal/v2/types";
import PortalConfirmationDialog from "@components/portal/v2/common/dialog/PortalConfirmationDialog";
import { useParams } from "react-router-dom";
import PortalSectionHeader from "@components/portal/v2/common/page/header/PortalPageHeader";

interface PortalSubmissionEditProps {
  readonly artist: Artist;
}

const PortalSubmissionEdit = ({ artist }: PortalSubmissionEditProps) => {
  const { submissionId } = useParams();
  const [isDiscardConfirmationDialogOpen, setIsDiscardConfirmationDialogOpen] =
    useState(false);
  const submission = artist.submissions.find(
    (submission) => submission.id === Number(submissionId)
  );

  const openDiscardDialog = () => {
    setIsDiscardConfirmationDialogOpen(true);
  };

  const closeDiscardDialog = () => {
    setIsDiscardConfirmationDialogOpen(false);
  };

  if (!submission) {
    return <div>Not found</div>;
  }

  return (
    <div className={styles.root}>
      <PortalSectionHeader
        backToPath="/portal/response"
        showBackButton={true}
        title="Edit Artwork"
      />

      <div className={styles.editor}>{submission.file}</div>

      <div className={styles.footer}>
        <button
          className={styles.footerButtonOutlined}
          onClick={openDiscardDialog}
        >
          Discard
        </button>
        <button className={styles.footerButtonFilled}>Save</button>
      </div>

      <PortalConfirmationDialog
        title="Discard Artwork"
        body="Are you sure you want to Discard artwork? This action cannot be undone."
        cancelText="Cancel"
        confirmText="Discard Artwork"
        isOpen={isDiscardConfirmationDialogOpen}
        onCancel={closeDiscardDialog}
        onConfirm={closeDiscardDialog}
      />
    </div>
  );
};

export default PortalSubmissionEdit;
