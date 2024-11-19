import React, { useEffect, useState } from "react";

import { updateArtist } from "@components/portal/v2/api";
import { useArtist } from "@components/portal/v2/Portal";
import { PortalLink } from "@components/portal/v2/common/PortalLink";
import { SubmissionCountdown } from "@components/portal/v2/countdown/SubmissionCountdown";
import styles from "./styles.module.scss";
import PortalSectionHeader from "@components/portal/v2/common/page/header/PortalPageHeader";
import PortalConfirmationDialog from "@components/portal/v2/common/dialog/PortalConfirmationDialog";

const PortalLanding = () => {
  const { artist, reloadArtist } = useArtist();
  const [isSubmissionConfirmationDialogOpen, setIsSubmissionConfirmationDialogOpen] = 
    useState(false); 

  const artistHasUploads = artist.submissions.length > 0;
  const dueDateMs = new Date(artist.due).getTime();

  const [timeLeftMs, setTimeLeftMs] = useState<number | null>(null);
  const timesUp = timeLeftMs <= 0;

  useEffect(() => {
    setTimeLeftMs(calculateTimeLeftMs(dueDateMs));
    // Every second, recalculate and set time left until due date.
    const interval = setInterval(() => {
      const timeLeftMs = calculateTimeLeftMs(dueDateMs);
      setTimeLeftMs(timeLeftMs);
      // Stop when time left reaches 0.
      if (timeLeftMs === 0) {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [dueDateMs]);

  const submit = () => {
    updateArtist(artist.id, { submitted: new Date().toISOString() }).then(() => {
      reloadArtist();
      closeSubmissionDialog();
    });
  };

  const openSubmissionDialog = () => {
    setIsSubmissionConfirmationDialogOpen(true);
  };

  const closeSubmissionDialog = () => {
    setIsSubmissionConfirmationDialogOpen(false);
  };

  const submitSuccessCallout = (
    <div className={styles.successCallout}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect
          x="0.75"
          y="0.75"
          width="22.5"
          height="22.5"
          rx="11.25"
          stroke="white"
          strokeWidth="1.5"
        />
        <path
          d="M8.55353 15.9464L5.49877 12.8916C5.33429 12.7268 5.111 12.6341 4.87813 12.6341C4.64527 12.6341 4.42197 12.7268 4.2575 12.8916C3.91417 13.235 3.91417 13.7896 4.2575 14.1329L7.93729 17.8127C8.28063 18.156 8.83524 18.156 9.17857 17.8127L18.4925 8.49876C18.8358 8.15543 18.8358 7.60082 18.4925 7.25749C18.328 7.09264 18.1047 7 17.8719 7C17.639 7 17.4157 7.09264 17.2512 7.25749L8.55353 15.9464Z"
          fill="white"
        />
      </svg>
      Success, you have submitted your artwork
    </div>
  );

  return (
    <div className={styles.root}>
      <PortalSectionHeader title="Artist Portal" />
      {artist.submitted ? (
        submitSuccessCallout
      ) : (
        <SubmissionCountdown
          firstName={artist.first_name}
          timeLeftMs={timeLeftMs}
        />
      )}
      <h2>Tasks</h2>
      <div className={styles.tasksSubtitle}>
        There are 2 things that we need from you.
      </div>
      <TaskButton
        isDisabled={timesUp}
        label="View your artistic prompt"
        route="/portal/prompt"
      />
      <TaskButton
        doneMessage="Artwork response uploaded"
        isDisabled={timesUp}
        isDone={artistHasUploads}
        route="/portal/response"
        label="Upload your artwork response"
      />
      <button
        className={styles.submitButton}
        disabled={timesUp || !!artist.submitted}
        onClick={openSubmissionDialog}
      >
        Submit
      </button>

      <PortalConfirmationDialog
        title="Submit artist application"
        body="Are you sure you want to submit the artist application? This action can't be undone."
        cancelText="Back"
        confirmText="Submit"
        isOpen={isSubmissionConfirmationDialogOpen}
        onCancel={closeSubmissionDialog}
        onConfirm={submit}
      />
    </div>
  );
};

function calculateTimeLeftMs(dueDateMs: number) {
  const timeLeftMs = dueDateMs - new Date().getTime();
  // Don't let the time left go negative.
  return Math.max(timeLeftMs, 0);
}

const TaskButton = ({
  doneMessage = "",
  isDisabled = false,
  isDone = false,
  label,
  route,
}: {
  doneMessage?: string;
  isDisabled?: boolean;
  isDone?: boolean;
  label: string;
  route: string;
}) => {
  const taskButtonLabel = (
    <>
      {label}
      <svg width="18" height="16" viewBox="0 0 18 16">
        <path
          d="M2 8L16 8M16 8L10 2M16 8L10 14"
          stroke="black"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );

  const taskDoneIndicator = (
    <div className={styles.taskDoneIndicator}>
      <div className={styles.doneIcon}>
        <svg
          width="12"
          height="10"
          viewBox="0 0 12 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.8624 7.58358L1.54906 5.27025C1.42451 5.14542 1.25541 5.07526 1.07906 5.07526C0.902717 5.07526 0.733617 5.14542 0.609062 5.27025C0.349063 5.53025 0.349063 5.95025 0.609062 6.21025L3.39573 8.99692C3.65573 9.25692 4.07573 9.25692 4.33573 8.99692L11.3891 1.94358C11.6491 1.68358 11.6491 1.26358 11.3891 1.00358C11.2645 0.878749 11.0954 0.808594 10.9191 0.808594C10.7427 0.808594 10.5736 0.878749 10.4491 1.00358L3.8624 7.58358Z"
            fill="black"
          />
        </svg>
      </div>
      {doneMessage}
    </div>
  );

  const task = isDisabled ? (
    <button disabled className={styles.taskButton}>
      {taskButtonLabel}
    </button>
  ) : (
    <>
      <PortalLink to={route} className={styles.taskButton}>
        {taskButtonLabel}
      </PortalLink>
      {isDone ? taskDoneIndicator : null}
    </>
  );

  return <div className={styles.taskContainer}>{task}</div>;
};

export default PortalLanding;
