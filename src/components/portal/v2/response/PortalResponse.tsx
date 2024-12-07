import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "./styles.module.scss";

import { updateArtist } from "@components/portal/v2/api";
import LoadingOverlay from "@components/portal/v2/LoadingOverlay";
import { useArtist } from "@components/portal/v2/Portal";
import PortalAccordion from "@components/portal/v2/common/accordion/PortalAccordion";
import PortalSectionHeader from "@components/portal/v2/common/page/header/PortalPageHeader";
import PortalSubmissionList from "@components/portal/v2/response/submission/list/PortalSubmissionList";
import { PortalLink } from "@components/portal/v2/common/PortalLink";
import { submittedCallout } from "@components/portal/v2/common/success/callout/SuccessCallout";
import PortalConfirmationDialog from "@components/portal/v2/common/dialog/PortalConfirmationDialog";

const PortalResponse = () => {
  const { artist, reloadArtist } = useArtist();
  const navigate = useNavigate();
  const { search } = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [
    isSubmissionConfirmationDialogOpen,
    setIsSubmissionConfirmationDialogOpen,
  ] = useState(false);

  const submit = async () => {
    setIsSubmitting(true);
    await updateArtist(artist.id, { submitted: new Date().toISOString() });
    await reloadArtist();
    setIsSubmitting(false);

    navigate(`/portal${search}`, {
      viewTransition: true,
    });
  };

  const openSubmissionDialog = () => {
    setIsSubmissionConfirmationDialogOpen(true);
  };

  const closeSubmissionDialog = () => {
    setIsSubmissionConfirmationDialogOpen(false);
  };

  // In "completed" state, the artist should no longer be allowed to make changes,
  // so redirect to the landing
  useEffect(() => {
    if (artist.completed) {
      navigate(`/portal${search}`, {
        replace: true,
        viewTransition: true,
      });
    }
  });

  return (
    <>
      <PortalSectionHeader showBackButton={true} title="Artwork Response" />

      <div className={styles.content}>
        <div className={styles.successCalloutContainer}>
          {artist.submitted ? submittedCallout : null}
        </div>

        <div className={styles.accordion}>
          <PortalAccordion title="Upload your artwork">
            Upload your artwork, you can upload up to 10 files. Feel free to
            include detail shots when uploading photographs.
          </PortalAccordion>
          <PortalAccordion title="Usage and Permissions">
            By submitting this work, you allow TELEPHONE digital rights to
            present your work digitally in our online exhibition of TELEPHONE.
            All other usage would require your further permission. You retain
            all other digital and physical rights to your own work. To read more
            details please{" "}
            <a href="/faq" target="_blank">
              click here
            </a>
            .
          </PortalAccordion>
          <PortalAccordion title="Artwork Order and Main Thumbnail">
            After uploading your artwork, it's important to review the order,
            which reflects how it will be displayed on the exhibit. You can use
            the up and down arrows to change the order of your artwork.
          </PortalAccordion>
        </div>

        <PortalSubmissionList artist={artist} />

        <div className={styles.footer}>
          {artist.submissions.length < 10 ? (
            <>
              <AddButton
                label={
                  artist.submissions?.length
                    ? "Upload another file"
                    : "Upload a file"
                }
                submissionType="file"
              />
              <AddButton label="Written work" submissionType="text" />
            </>
          ) : null}

          <div
            className={
              artist.submissions.length < 10
                ? styles.fileLimitWarning
                : styles.fileLimitWarningMax
            }
          >
            <svg
              className={styles.fileLimitWarningIcon}
              height="20"
              viewBox="0 0 20 20"
              width="20"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 15C9.45 15 9 14.55 9 14V10C9 9.45 9.45 9 10 9C10.55 9 11 9.45 11 10V14C11 14.55 10.55 15 10 15ZM9 7H11V5H9V7Z"
              />
            </svg>
            <span className={styles.fileLimitWarningText}>
              {artist.submissions.length < 10
                ? "10 file limit"
                : "Max files uploaded"}
            </span>
          </div>

          {artist.submitted || artist.submissions.length < 1 ? null : (
            <div>
              <p className={styles.submitDescription}>
                Finished uploading? Submit your work so it can be sent to the
                next artist.
              </p>

              <button
                className={styles.submitButton}
                onClick={openSubmissionDialog}
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </div>

      <PortalConfirmationDialog
        title="Submit artist application"
        body="Are you ready to submit your artwork? Once submitted, we will review it, then pass it on to the next artist. Until then, you can edit your submission."
        cancelText="Back"
        confirmText="Submit"
        isOpen={isSubmissionConfirmationDialogOpen}
        onCancel={closeSubmissionDialog}
        onConfirm={submit}
      />

      <LoadingOverlay isLoading={isSubmitting} message="Submitting..." />
    </>
  );
};

interface AddButtonProps {
  readonly label: string;
  readonly submissionType: "file" | "text";
}

const AddButton = ({ label, submissionType }: AddButtonProps) => {
  return (
    <PortalLink
      className={styles.addButton}
      to={`/portal/response/upload/${submissionType}`}
    >
      {label}
      <svg
        className={styles.addButtonIcon}
        height="20"
        viewBox="0 0 20 20"
        width="20"
      >
        <path d="M8.66406 11.3346H0.664062V8.66797H8.66406V0.667969H11.3307V8.66797H19.3307V11.3346H11.3307V19.3346H8.66406V11.3346Z" />
      </svg>
    </PortalLink>
  );
};

export default PortalResponse;
