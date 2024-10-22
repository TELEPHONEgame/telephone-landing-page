import React from "react";

import { Artist } from "@components/portal/v2/types";
import { PortalLink } from "@components/portal/v2/common/PortalLink";
import { SubmissionCountdown } from "@components/portal/v2/countdown/SubmissionCountdown";
import styles from "./styles.module.scss";
import PortalSectionHeader from "@components/portal/v2/common/page/header/PortalPageHeader";

const PortalLanding = ({artist}: {artist: Artist}) => {
  return (
    <div className={styles.root}>
      <PortalSectionHeader title="Artist Portal" />
      <SubmissionCountdown artistName={artist.first_name} />
      <h2>Tasks</h2>
      <div className={styles.tasksSubtitle}>
        There are 2 things that we need from you.
      </div>
      <TaskButton route="/portal/prompt" label="View your artistic prompt" />
      <TaskButton route="/portal/response" label="Upload your artwork response" />
      <button className={styles.submitButton}>Submit</button>
    </div>
  );
};

const TaskButton = ({label, route}: {label: string, route: string}) => {
  return (
    <PortalLink to={route} className={styles.taskButton}>
      {label}
      <svg width="18" height="16" viewBox="0 0 18 16">
        <path d="M2 8L16 8M16 8L10 2M16 8L10 14" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </PortalLink>
  );
};

export default PortalLanding;
