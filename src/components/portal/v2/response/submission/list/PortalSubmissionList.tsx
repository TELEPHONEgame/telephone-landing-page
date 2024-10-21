import React from "react";

import styles from "./styles.module.scss";
import { Artist } from "@components/portal/v2/types";
import PortalSubmissionPreview from "@components/portal/v2/response/submission/preview/PortalSubmissionPreview";

const PortalSubmissionList = ({ artist }: { artist: Artist }) => {
  return (
    <ol className={styles.root}>
      {artist.submissions.map((submission, index) => (
        <li className={styles.listItem}>
          <PortalSubmissionPreview
            listIndex={index}
            showListInfo={artist.submissions.length > 1}
            submission={submission}
          />
        </li>
      ))}
    </ol>
  );
};

export default PortalSubmissionList;
