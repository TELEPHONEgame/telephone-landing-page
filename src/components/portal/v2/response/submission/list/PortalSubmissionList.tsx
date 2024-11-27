import React, { useState } from "react";

import styles from "./styles.module.scss";
import { useArtist } from "@components/portal/v2/Portal";
import * as api from "@components/portal/v2/api";
import { Artist } from "@components/portal/v2/types";
import PortalSubmissionPreview from "@components/portal/v2/response/submission/preview/PortalSubmissionPreview";
import LoadingOverlay from "@/components/portal/v2/LoadingOverlay";

const PortalSubmissionList = ({ artist }: { artist: Artist }) => {
  const { reloadArtist } = useArtist();
  const sortedSubmissions = [...artist.submissions].sort(
    (a, b) => (a.order ?? Infinity) - (b.order ?? Infinity)
  );

  const [isSaving, setIsSaving] = useState(false);

  const onSubmissionSorted = async (
    index: number,
    direction: "up" | "down"
  ) => {
    const submission = sortedSubmissions[index];
    const siblingIndex = direction === "up" ? index - 1 : index + 1;
    const sibling = sortedSubmissions[siblingIndex];

    setIsSaving(true);

    // The order property can technically be set to null. If any submissions have a null
    // order field, f it and update all of them to have an order field.
    if (sortedSubmissions.some((s) => typeof s.order !== "number")) {
      const newSortOrder = [...sortedSubmissions];
      newSortOrder[index] = sibling;
      newSortOrder[siblingIndex] = submission;
      await Promise.all(
        newSortOrder.map((s, i) =>
          api.updateSubmission(s.id, {
            order: i,
          })
        )
      );
      // Otherwise, just update the 2 submissions being swapped.
    } else {
      await Promise.all([
        api.updateSubmission(submission.id, {
          order: sibling.order,
        }),
        api.updateSubmission(sibling.id, {
          order: submission.order,
        }),
      ]);
    }

    // No fanciness here, just reload the whole artist from the back-end and re-render.
    await reloadArtist();
    setIsSaving(false);
  };

  return (
    <>
      <ol className={styles.root}>
        {sortedSubmissions.map((submission, index) => (
          <li className={styles.listItem} key={submission.id}>
            <PortalSubmissionPreview
              listIndex={index}
              listLength={artist.submissions.length}
              isEditable={artist.submissions.length > 1}
              submission={submission}
              onSort={(direction) => onSubmissionSorted(index, direction)}
            />
          </li>
        ))}
      </ol>

      <LoadingOverlay isLoading={isSaving} message="Saving..." />
    </>
  );
};

export default PortalSubmissionList;
