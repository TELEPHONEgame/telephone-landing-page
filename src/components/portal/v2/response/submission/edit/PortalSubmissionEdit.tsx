import React from "react";

import styles from "./styles.module.scss";
import { useArtist } from "@components/portal/v2/Portal";
import { useParams } from "react-router-dom";
import PortalSectionHeader from "@components/portal/v2/common/page/header/PortalPageHeader";
import PortalAccordion from "@components/portal/v2/common/accordion/PortalAccordion";
import PortalSubmissionEditForm from "@components/portal/v2/response/submission/edit/form/PortalSubmissionEditForm";


const PortalSubmissionEdit = () => {
  const {artist} = useArtist();
  const { submissionId } = useParams();
  const submission = artist.submissions.find(
    (submission) => submission.id === Number(submissionId)
  );

  if (!submission) {
    return <div>Not found</div>;
  }

  return (
    <div className={styles.root}>
      <PortalSectionHeader
        backToPath="/portal/response"
        showBackButton={true}
        title="Edit Artwork"
      />

      <div className={styles.accordion}>
        <PortalAccordion title="How do you want your artwork presented?">
          Now that you've imported your artwork, you have the option to provide
          additional details. Please take a moment to review the{" "}
          <a href="/faq" target="_blank">
            Usage and Permissions guidelines
          </a>{" "}
          related to your artwork to ensure you understand how it may be used
          and shared.
        </PortalAccordion>
      </div>

      <PortalSubmissionEditForm submission={submission} />
    </div>
  );
};

export default PortalSubmissionEdit;
