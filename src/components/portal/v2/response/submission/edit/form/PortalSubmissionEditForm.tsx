import React, { useState } from "react";
import { useForm } from "react-hook-form";

import styles from "./styles.module.scss";
import PortalConfirmationDialog from "@components/portal/v2/common/dialog/PortalConfirmationDialog";
import { Submission } from "@/components/portal/v2/types";
import AudioPreview from "./AudioPreviewField";
import ImagePreview from "./ImagePreviewField";
import VideoPreview from "./VideoPreviewField";
import ImageFocalPointSelector from "./ImageFocalPointSelector";
import TextFormField from "./TextFormField";

interface FormData {
  title: string;
  materials: string;
  dimensions: string;
}

interface PortalSubmissionEditFormProps {
  readonly submission: Submission;
}

const PortalSubmissionEditForm = ({
  submission,
}: PortalSubmissionEditFormProps) => {
  const { register, handleSubmit } = useForm<FormData>();

  const [isDiscardConfirmationDialogOpen, setIsDiscardConfirmationDialogOpen] =
    useState(false);

  const openDiscardDialog = () => {
    setIsDiscardConfirmationDialogOpen(true);
  };

  const closeDiscardDialog = () => {
    setIsDiscardConfirmationDialogOpen(false);
  };

  return (
    <>
      <div className={styles.editor}>
        {submission.type === "image" ? (
          <>
            <TextFormField
              label="Title (optional)"
              placeholder="Enter artwork title"
              inputProps={register("title")}
            />
            <TextFormField
              label="Materials (optional)"
              placeholder="Enter your materials"
              inputProps={register("materials")}
            />
            <TextFormField
              label="Dimensions (optional)"
              placeholder="Enter artwork dimensions"
              inputProps={register("dimensions")}
            />
            <hr className={styles.divider} />
            <ImageFocalPointSelector submission={submission} />
            <hr className={styles.divider} />
            <ImagePreview submission={submission} />
          </>
        ) : submission.type === "audio" ? (
          <>
            <TextFormField
              label="Title (optional)"
              placeholder="Enter artwork title"
              inputProps={register("title")}
            />
            <hr className={styles.divider} />
            <AudioPreview submission={submission} />
          </>
        ): submission.type === "video" ? (
          <>
            <TextFormField
              label="Title (optional)"
              placeholder="Enter artwork title"
              inputProps={register("title")}
            />
            <hr className={styles.divider} />
            <VideoPreview submission={submission} />
          </>
        ) : null}
      </div>

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
    </>
  );
};

export default PortalSubmissionEditForm;
