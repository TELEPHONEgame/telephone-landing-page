import React, { useState } from "react";

import styles from "./styles.module.scss";

import * as api from "@components/portal/v2/api";
import { useArtist } from "@components/portal/v2/Portal";
import { Submission } from "@components/portal/v2/types";
import { PortalLink } from "@components/portal/v2/common/PortalLink";
import PortalConfirmationDialog from "@components/portal/v2/common/dialog/PortalConfirmationDialog";
import LoadingOverlay from "@/components/portal/LoadingOverlay";

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
  const { reloadArtist } = useArtist();
  const [isDiscardConfirmationDialogOpen, setIsDiscardConfirmationDialogOpen] =
    useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const openDiscardDialog = () => {
    setIsDiscardConfirmationDialogOpen(true);
  };

  const closeDiscardDialog = () => {
    setIsDiscardConfirmationDialogOpen(false);
  };

  const deleteSubmission = async () => {
    setIsDeleting(true);

    try {
      await api.deleteSubmission(submission.id);
      await reloadArtist();
    } catch (e) {
      // TODO: better alerts
      alert("Delete failed. Please try again.");
    }

    setIsDeleting(false);
  }
  
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <span className={styles.ordinal}>{listIndex + 1}</span>
        <span className={styles.title}>{submission.title ? submission.title : "Untitled"}</span>
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
        <button className={styles.footerButton}>
          <svg
            className={styles.footerButtonIcon}
            height="12"
            viewBox="0 0 14 12"
            width="14"
          >
            <path d="M7.89717 11.5376C7.39051 11.9976 6.61051 11.9976 6.10384 11.531L6.03051 11.4643C2.53051 8.29762 0.243839 6.22429 0.330506 3.63762C0.370506 2.50429 0.950506 1.41762 1.89051 0.777624C3.65051 -0.422376 5.82384 0.137624 6.99717 1.51096C8.17051 0.137624 10.3438 -0.429043 12.1038 0.777624C13.0438 1.41762 13.6238 2.50429 13.6638 3.63762C13.7572 6.22429 11.4638 8.29762 7.96384 11.4776L7.89717 11.5376Z" />
          </svg>
          Main Thumbnail
        </button>
        <PortalLink
          to={`/portal/response/${submission.id}/edit`}
          className={styles.footerButton}
        >
          <svg
            className={styles.footerButtonIcon}
            height="12"
            viewBox="0 0 12 12"
            width="12"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.8067 1.75499C12.0667 2.01499 12.0667 2.43499 11.8067 2.69499L10.5867 3.91499L8.08667 1.41499L9.30667 0.19499C9.43122 0.0701553 9.60032 0 9.77667 0C9.95301 0 10.1221 0.0701553 10.2467 0.19499L11.8067 1.75499ZM0 11.6683V9.64166C0 9.54832 0.0333334 9.46832 0.1 9.40166L7.37333 2.12832L9.87333 4.62832L2.59333 11.9017C2.53333 11.9683 2.44667 12.0017 2.36 12.0017H0.333333C0.146667 12.0017 0 11.855 0 11.6683Z"
            />
          </svg>
          Edit
        </PortalLink>
        <button className={styles.footerButton} onClick={openDiscardDialog}>
          <svg
            className={styles.footerButtonIcon}
            height="12"
            viewBox="0 0 10 12"
            width="10"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.33594 0.666667H9.0026C9.36927 0.666667 9.66927 0.966667 9.66927 1.33333C9.66927 1.7 9.36927 2 9.0026 2H1.0026C0.635937 2 0.335938 1.7 0.335938 1.33333C0.335938 0.966667 0.635937 0.666667 1.0026 0.666667H2.66927L3.1426 0.193333C3.2626 0.0733333 3.43594 0 3.60927 0H6.39594C6.56927 0 6.7426 0.0733333 6.8626 0.193333L7.33594 0.666667ZM2.33594 12C1.6026 12 1.0026 11.4 1.0026 10.6667V4C1.0026 3.26667 1.6026 2.66667 2.33594 2.66667H7.66927C8.4026 2.66667 9.0026 3.26667 9.0026 4V10.6667C9.0026 11.4 8.4026 12 7.66927 12H2.33594Z"
            />
          </svg>
          Delete
        </button>
      </div>

      <PortalConfirmationDialog
        title="Discard Artwork"
        body="Are you sure you want to Discard artwork? This action cannot be undone."
        cancelText="Cancel"
        confirmText="Discard Artwork"
        isOpen={isDiscardConfirmationDialogOpen}
        onCancel={closeDiscardDialog}
        onConfirm={deleteSubmission}
      />

      <LoadingOverlay isLoading={isDeleting} message="Deleting..." />
    </div>
  );
};

const SortButton = ({ direction }: { direction: "up" | "down" }) => {
  return (
    <button className={styles.sortButton}>
      <svg
        className={direction === "down" ? styles.flipIcon : null}
        width="22"
        height="22"
        viewBox="0 0 22 22"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
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
      return <audio src={submission.file} controls={true} />;
    case "image":
      return <ImagePreview submission={submission} />;
    case "video":
      return <video src={submission.file} controls={true} />;
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
