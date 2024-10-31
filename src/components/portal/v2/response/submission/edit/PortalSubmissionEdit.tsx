import React, {useState} from "react";

import styles from "./styles.module.scss";
import * as api from "@components/portal/v2/api";
import { useArtist } from "@components/portal/v2/Portal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MutableSubmissionFields } from "@components/portal/v2/types";
import LoadingOverlay from "@components/portal/LoadingOverlay";
import PortalSectionHeader from "@components/portal/v2/common/page/header/PortalPageHeader";
import PortalAccordion from "@components/portal/v2/common/accordion/PortalAccordion";
import PortalSubmissionEditForm from "@components/portal/v2/response/submission/edit/form/PortalSubmissionEditForm";


const PortalSubmissionEdit = () => {
  const {artist} = useArtist();
  const { submissionId } = useParams();
  const { search } = useLocation();
  const { reloadArtist } = useArtist();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const submission = artist.submissions.find(
    (submission) => submission.id === Number(submissionId)
  );

  if (!submission) {
    return <div>Not found</div>;
  }

  const onSubmit = async (data: MutableSubmissionFields) => {
    setIsSaving(true);
    try {
      await api.updateSubmission(submission.id, data);
      await reloadArtist();
      setIsSaving(false);
      navigate(`/portal/response${search}`, {
        viewTransition: true,
      });
    } catch (e) {
      alert("Saving failed. Please try again.");
      setIsSaving(false);
    }
  };

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

      <PortalSubmissionEditForm submission={submission} onSubmit={onSubmit} />

      <LoadingOverlay isLoading={isSaving} message="Saving..." />
    </div>
  );
};

export default PortalSubmissionEdit;
