import React from "react";

import styles from "./styles.module.scss";
import { Artist } from "@components/portal/v2/types";
import PortalSubmissionPreview from "@components/portal/v2/response/submission/preview/PortalSubmissionPreview";

const PortalPromptList = ({ artist }: { artist: Artist }) => {
  const sortedSubmissions = [...artist.parent.submissions].sort(
    (a, b) => (a.order ?? Infinity) - (b.order ?? Infinity)
  );

  return (
    <>
      <ol className={styles.root}>
        {sortedSubmissions.map((submission, index) => (
          <li className={styles.listItem} key={submission.id}>
            <PortalSubmissionPreview
              listIndex={index}
              listLength={artist.submissions.length}
              isEditable={false}
              submission={submission}
            />
          </li>
        ))}
      </ol>
    </>
  );
};

export default PortalPromptList;
