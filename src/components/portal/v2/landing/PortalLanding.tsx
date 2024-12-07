import React, { useEffect, useState } from "react";

import { updateArtist } from "@components/portal/v2/api";
import { useArtist } from "@components/portal/v2/Portal";
import { PortalLink } from "@components/portal/v2/common/PortalLink";
import { SubmissionCountdown } from "@components/portal/v2/countdown/SubmissionCountdown";
import styles from "./styles.module.scss";
import PortalSectionHeader from "@components/portal/v2/common/page/header/PortalPageHeader";
import PortalConfirmationDialog from "@components/portal/v2/common/dialog/PortalConfirmationDialog";
import {
  submittedCallout,
  assignedCallout,
} from "@components/portal/v2/common/success/callout/SuccessCallout";

const PortalLanding = () => {
  const { artist, reloadArtist } = useArtist();
  const [
    isSubmissionConfirmationDialogOpen,
    setIsSubmissionConfirmationDialogOpen,
  ] = useState(false);

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
    updateArtist(artist.id, { submitted: new Date().toISOString() }).then(
      () => {
        reloadArtist();
        closeSubmissionDialog();
      }
    );
  };

  const openSubmissionDialog = () => {
    setIsSubmissionConfirmationDialogOpen(true);
  };

  const closeSubmissionDialog = () => {
    setIsSubmissionConfirmationDialogOpen(false);
  };

  return (
    <div className={styles.root}>
      <PortalSectionHeader title="Artist Portal" />
      {artist.submitted ? (
        submittedCallout
      ) : artist.completed ? (
        assignedCallout
      ) : (
        <SubmissionCountdown
          firstName={artist.first_name}
          timeLeftMs={timeLeftMs}
        />
      )}
      <h2 className={styles.tasksTitle}>Tasks</h2>
      <TaskButton
        isDisabled={timesUp}
        label="1. View your artistic prompt"
        route="/portal/prompt"
      />
      <TaskButton
        doneMessage="Artwork response uploaded"
        isDisabled={timesUp || !!artist.completed}
        isDone={artistHasUploads}
        route="/portal/response"
        label="2. Upload your artwork response"
      />
      {artist.submitted || artist.submissions.length < 1 ? null : (
        <div>
          <p className={styles.submitDescription}>
            Finished uploading? Submit your work so it can be sent to the next
            artist.
          </p>

          <button
            className={styles.submitButton}
            onClick={openSubmissionDialog}
          >
            Submit
          </button>
        </div>
      )}

      <PortalConfirmationDialog
        title="Submit artist application"
        body="Are you ready to submit your artwork? Once submitted, we will review it, then pass it on to the next artist. Until then, you can edit your submission."
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
