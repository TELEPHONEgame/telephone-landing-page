import React from "react";

import { useArtist } from "@components/portal/v2/Portal";
import { PortalLink } from "@components/portal/v2/common/PortalLink";
import { SubmissionCountdown } from "@components/portal/v2/countdown/SubmissionCountdown";
import styles from "./styles.module.scss";
import PortalSectionHeader from "@components/portal/v2/common/page/header/PortalPageHeader";

const PortalLanding = () => {
  const {artist} = useArtist();
  const artistHasUploads = artist.submissions.length > 0;

  return (
    <div className={styles.root}>
      <PortalSectionHeader title="Artist Portal" />
      <SubmissionCountdown artist={artist} />
      <h2>Tasks</h2>
      <div className={styles.tasksSubtitle}>
        There are 2 things that we need from you.
      </div>
      <TaskButton route="/portal/prompt" label="View your artistic prompt" />
      <TaskButton
        route="/portal/response"
        label="Upload your artwork response"
        isDone={artistHasUploads}
        doneMessage="Artwork response uploaded"
      />
      <button className={styles.submitButton}>Submit</button>
    </div>
  );
};

const TaskButton = ({
  route,
  label,
  isDone = false,
  doneMessage = '',
}: {
  route: string,
  label: string,
  isDone?: boolean,
  doneMessage?: string,
}) => {
  const taskDoneIndicator = 
    <div className={styles.taskDoneIndicator}>
      <div className={styles.doneIcon}>
        <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.8624 7.58358L1.54906 5.27025C1.42451 5.14542 1.25541 5.07526 1.07906 5.07526C0.902717 5.07526 0.733617 5.14542 0.609062 5.27025C0.349063 5.53025 0.349063 5.95025 0.609062 6.21025L3.39573 8.99692C3.65573 9.25692 4.07573 9.25692 4.33573 8.99692L11.3891 1.94358C11.6491 1.68358 11.6491 1.26358 11.3891 1.00358C11.2645 0.878749 11.0954 0.808594 10.9191 0.808594C10.7427 0.808594 10.5736 0.878749 10.4491 1.00358L3.8624 7.58358Z" fill="black"/>
        </svg>
      </div>
      {doneMessage}
    </div>

  return (
    <div className={styles.taskContainer}>
      <PortalLink to={route} className={styles.taskButton}>
        {label}
        <svg width="18" height="16" viewBox="0 0 18 16">
          <path d="M2 8L16 8M16 8L10 2M16 8L10 14" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </PortalLink>
      {isDone ? taskDoneIndicator : null}
    </div>
  );
};

export default PortalLanding;
