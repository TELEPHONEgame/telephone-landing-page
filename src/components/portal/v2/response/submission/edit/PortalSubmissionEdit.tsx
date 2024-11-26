import React, { useState } from "react";

import styles from "./styles.module.scss";
import * as api from "@components/portal/v2/api";
import { useArtist } from "@components/portal/v2/Portal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MutableSubmissionFields } from "@components/portal/v2/types";
import LoadingOverlay from "@components/portal/v2/LoadingOverlay";
import PortalSectionHeader from "@components/portal/v2/common/page/header/PortalPageHeader";
import PortalAccordion from "@components/portal/v2/common/accordion/PortalAccordion";
import PortalSubmissionEditForm from "@components/portal/v2/response/submission/edit/form/PortalSubmissionEditForm";

const PortalSubmissionEdit = () => {
  const { artist } = useArtist();
  const { submissionId } = useParams();
  const { search } = useLocation();
  const { reloadArtist } = useArtist();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const submission = artist.submissions.find(
    (submission) => submission.id === Number(submissionId)
  );

  if (!submission) {
    return <div>Not found</div>;
  }

  const onDelete = async () => {
    setIsDeleting(true);

    try {
      await api.deleteSubmission(submission.id);
      await reloadArtist();
    } catch (e) {
      // TODO: better alerts
      alert("Delete failed. Please try again.");
    }

    navigate(`/portal/response${search}`, {
      viewTransition: true,
    });
  };

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
          <p>
            Now that you've imported your artwork, you have the option to
            provide additional details. Please take a moment to review the{" "}
            <a href="/faq" target="_blank">
              Usage and Permissions guidelines
            </a>{" "}
            related to your artwork to ensure you understand how it may be used
            and shared.
          </p>

          <p>
            <strong>A note on written works:</strong>
          </p>
          <p>
            We want your text art to be displayed the way you want it. If you
            hit Enter, it will make a new paragraph. If you hit Shift + Enter,
            it will create a line break. If you click the "Use poem formatting"
            checkbox, we will preserve your line breaks, even if your lines are
            very long like a Walt Whitman poem (at which point, readers will
            scroll horizontally to see all of your words).
          </p>
          <p>
            If you have any questions or concerns, please contact us as
            telephone.outreach@gmail.com and we will try to display your work
            the way that you intended.
          </p>
        </PortalAccordion>
      </div>

      <PortalSubmissionEditForm
        submission={submission}
        onSubmit={onSubmit}
        onDelete={onDelete}
      />

      <LoadingOverlay isLoading={isSaving} message="Saving..." />
      <LoadingOverlay isLoading={isDeleting} message="Deleting..." />
    </div>
  );
};

export default PortalSubmissionEdit;
