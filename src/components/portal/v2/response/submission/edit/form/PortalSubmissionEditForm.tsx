import React, { useState } from "react";
import { useForm } from "react-hook-form";

import * as api from "@components/portal/v2/api";
import { useNavigate, useLocation } from "react-router-dom";

import styles from "./styles.module.scss";
import LoadingOverlay from "@/components/portal/LoadingOverlay";
import PortalConfirmationDialog from "@components/portal/v2/common/dialog/PortalConfirmationDialog";
import { useArtist } from "@components/portal/v2/Portal";
import { Submission } from "@/components/portal/v2/types";
import AudioPreview from "./AudioPreviewField";
import ImagePreview from "./ImagePreviewField";
import VideoPreview from "./VideoPreviewField";
import ImageFocalPointSelector from "./ImageFocalPointSelector";
import TextFormField from "./TextFormField";

type FormData = Omit<Submission, "file" | "id" | "type">;

interface PortalSubmissionEditFormProps {
  readonly submission: Submission;
}

const PortalSubmissionEditForm = ({
  submission,
}: PortalSubmissionEditFormProps) => {
  const { search } = useLocation();
  const { reloadArtist } = useArtist();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      dimensions: submission.dimensions,
      focal_x: submission.focal_x,
      focal_y: submission.focal_y,
      materials: submission.materials,
      title: submission.title,
    },
  });

  const [isDiscardConfirmationDialogOpen, setIsDiscardConfirmationDialogOpen] =
    useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const openDiscardDialog = () => {
    setIsDiscardConfirmationDialogOpen(true);
  };

  const closeDiscardDialog = () => {
    setIsDiscardConfirmationDialogOpen(false);
  };

  const onSubmit = async (data) => {
    setIsSaving(true);
    try {
      await api.updateSubmission(submission.id, data);
      await reloadArtist();
      setIsSaving(false);
      navigate(`/portal/response${search}`, {
        viewTransition: true,
      });
    } catch (e) {
      alert("Saving failed. Please try again.");
      setIsSaving(false);
    }
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

      <LoadingOverlay isLoading={isSaving} message="Saving..." />
    </form>
  );
};

export default PortalSubmissionEditForm;
