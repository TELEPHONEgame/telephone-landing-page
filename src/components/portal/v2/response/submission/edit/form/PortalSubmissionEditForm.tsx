import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import styles from "./styles.module.scss";
import PortalConfirmationDialog from "@components/portal/v2/common/dialog/PortalConfirmationDialog";
import { Submission, MutableSubmissionFields } from "@components/portal/v2/types";
import AudioPreview from "./AudioPreviewField";
import ImagePreview from "./ImagePreviewField";
import VideoPreview from "./VideoPreviewField";
import ImageFocalPointSelector from "./ImageFocalPointSelector";
import TextFormField from "./TextFormField";


interface PortalSubmissionEditFormProps {
  readonly onSubmit?: (updatedData: MutableSubmissionFields) => void;
  readonly submission: Submission;
}

const PortalSubmissionEditForm = ({
  submission,
  onSubmit,
}: PortalSubmissionEditFormProps) => {
  const { register, handleSubmit, setValue, watch } =
    useForm<MutableSubmissionFields>({
      defaultValues: {
        dimensions: submission.dimensions,
        focal_x: submission.focal_x ?? 50,
        focal_y: submission.focal_y ?? 50,
        materials: submission.materials,
        order: submission.order,
        title: submission.title,
      },
    });
  const watchFocalPoint = watch(["focal_x", "focal_y"]);

  const [isDiscardConfirmationDialogOpen, setIsDiscardConfirmationDialogOpen] =
    useState(false);

  const openDiscardDialog = () => {
    setIsDiscardConfirmationDialogOpen(true);
  };

  const closeDiscardDialog = () => {
    setIsDiscardConfirmationDialogOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            <ImageFocalPointSelector
              submission={submission}
              onChange={(x, y) => {
                setValue("focal_x", x);
                setValue("focal_y", y);
              }}
              value={{ x: watchFocalPoint[0], y: watchFocalPoint[1] }}
            />
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
        ) : submission.type === "video" ? (
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
          type="button"
        >
          Discard
        </button>
        <button type="submit" className={styles.footerButtonFilled}>
          Save
        </button>
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
    </form>
  );
};

export default PortalSubmissionEditForm;
