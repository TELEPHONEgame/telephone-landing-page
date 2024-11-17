import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useBlocker } from "react-router-dom";

import styles from "./styles.module.scss";
import PortalConfirmationDialog from "@components/portal/v2/common/dialog/PortalConfirmationDialog";
import {
  Submission,
  MutableSubmissionFields,
} from "@components/portal/v2/types";
import AudioPreview from "./AudioPreviewField";
import ImagePreview from "./ImagePreviewField";
import VideoPreview from "./VideoPreviewField";
import ImageFocalPointSelector from "./ImageFocalPointSelector";
import TextFormField from "./TextFormField";
import RichTextField from "./RichTextField";

interface PortalSubmissionEditFormProps {
  readonly onDelete?: () => void;
  readonly onSubmit?: (updatedData: MutableSubmissionFields) => void;
  readonly submission: Submission;
}

const PortalSubmissionEditForm = ({
  submission,
  onDelete,
  onSubmit,
}: PortalSubmissionEditFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isDirty },
    getValues,
    reset,
  } = useForm<MutableSubmissionFields>({
    defaultValues: {
      dimensions: submission.dimensions,
      focal_x: submission.focal_x ?? 50,
      focal_y: submission.focal_y ?? 50,
      materials: submission.materials,
      order: submission.order,
      title: submission.title,
      written_work: submission.written_work ?? "",
      written_work_line_wrap_disabled:
        submission.written_work_line_wrap_disabled ?? false,
    },
  });
  const watchFocalPoint = watch(["focal_x", "focal_y"]);
  const watchLineWrapDisabled = watch("written_work_line_wrap_disabled");

  const [isDiscardConfirmationDialogOpen, setIsDiscardConfirmationDialogOpen] =
    useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openDiscardDialog = () => {
    setIsDiscardConfirmationDialogOpen(true);
  };

  const closeDiscardDialog = () => {
    setIsDiscardConfirmationDialogOpen(false);
  };

  const blocker = useBlocker(() => isDirty && !isSubmitting);

  return (
    <form
      onSubmit={(e) => {
        setIsSubmitting(true);
        return handleSubmit(onSubmit)(e);
      }}
    >
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
                setValue("focal_x", x, { shouldDirty: true });
                setValue("focal_y", y, { shouldDirty: true });
              }}
              value={{ x: watchFocalPoint[0], y: watchFocalPoint[1] }}
            />
            <hr className={styles.divider} />
            <ImagePreview
              submission={submission}
              focalX={watchFocalPoint[0]}
              focalY={watchFocalPoint[1]}
            />
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
        ) : typeof submission.written_work === "string" ? (
          <>
            <TextFormField
              label="Title (optional)"
              placeholder="Enter artwork title"
              inputProps={register("title")}
            />
            <RichTextField
              submission={submission}
              usePoemFormatting={watchLineWrapDisabled}
              onFormatChange={(usePoemFormatting) => {
                setValue("written_work_line_wrap_disabled", usePoemFormatting, {
                  shouldDirty: true,
                });
              }}
              onTextChange={(value) => {
                setValue("written_work", value, { shouldDirty: true });
              }}
            />
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
        confirmText="Discard artwork"
        isOpen={isDiscardConfirmationDialogOpen}
        onCancel={closeDiscardDialog}
        onConfirm={onDelete}
      />

      <PortalConfirmationDialog
        title="Unsaved changes"
        body="Would you like to save your changes?"
        cancelText="Discard"
        confirmText="Save changes"
        isOpen={blocker.state === "blocked"}
        onCancel={() => void blocker.proceed()}
        onConfirm={() => {
          setIsSubmitting(true);
          onSubmit(getValues());
        }}
      />
    </form>
  );
};

export default PortalSubmissionEditForm;
