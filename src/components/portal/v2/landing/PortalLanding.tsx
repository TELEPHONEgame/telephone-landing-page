import React from "react";

import { Artist } from "../../types";
import { PortalLink } from "../common/PortalLink";
import { SubmissionCountdown } from "../countdown/SubmissionCountdown";
import styles from "./styles.module.scss";
import PortalSectionHeader from "../common/page/header/PortalPageHeader";

const PortalLanding = ({artist}: {artist: Artist}) => {
  return (
    <div className={styles.root}>
      <PortalSectionHeader title="Artist Portal" />
      <SubmissionCountdown />
      <h2>Tasks</h2>
      <div><PortalLink to="/portal/prompt">View your artistic prompt</PortalLink></div>
      <div><PortalLink to="/portal/upload">Upload your artwork response</PortalLink></div>
      <button>Submit</button>
    </div>
  );
};

export default PortalLanding;
