import React, { useState } from "react";
import { useForm, UseFormRegisterReturn } from "react-hook-form";

import styles from "./styles.module.scss";
import { Artist } from "@components/portal/v2/types";
import PortalConfirmationDialog from "@components/portal/v2/common/dialog/PortalConfirmationDialog";
import { useParams } from "react-router-dom";
import PortalSectionHeader from "@components/portal/v2/common/page/header/PortalPageHeader";
import PortalAccordion from "@components/portal/v2/common/accordion/PortalAccordion";

interface PortalSubmissionEditProps {
  readonly artist: Artist;
}

interface FormData {
  title: string;
  materials: string;
  dimensions: string;
}

const PortalSubmissionEdit = ({ artist }: PortalSubmissionEditProps) => {
  const { submissionId } = useParams();
  const { register, handleSubmit } = useForm<FormData>();

  const [isDiscardConfirmationDialogOpen, setIsDiscardConfirmationDialogOpen] =
    useState(false);
  const submission = artist.submissions.find(
    (submission) => submission.id === Number(submissionId)
  );

  const openDiscardDialog = () => {
    setIsDiscardConfirmationDialogOpen(true);
  };

  const closeDiscardDialog = () => {
    setIsDiscardConfirmationDialogOpen(false);
  };

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

      <div className={styles.editor}>
        <TextFormField
          label="Title (optional)"
          placeholder="Enter artwork title"
          inputProps={register("title")}
        />
        <TextFormField
          label="Materials (optional)"
          placeholder="Enter your materials"
          inputProps={register("materials")}
        />
        <TextFormField
          label="Dimensions (optional)"
          placeholder="Enter artwork dimensions"
          inputProps={register("dimensions")}
        />
        <hr className={styles.divider} />
        {submission.file}
      </div>

      <div className={styles.footer}>
        <button
          className={styles.footerButtonOutlined}
          onClick={openDiscardDialog}
        >
          Discard
        </button>
        <button className={styles.footerButtonFilled}>Save</button>
      </div>

      <PortalConfirmationDialog
        title="Discard Artwork"
        body="Are you sure you want to Discard artwork? This action cannot be undone."
        cancelText="Cancel"
        confirmText="Discard Artwork"
        isOpen={isDiscardConfirmationDialogOpen}
        onCancel={closeDiscardDialog}
        onConfirm={closeDiscardDialog}
      />
    </div>
  );
};

interface TextFormFieldProps {
  readonly inputProps: UseFormRegisterReturn;
  readonly label: string;
  readonly placeholder: string;
}

const TextFormField = ({
  inputProps,
  label,
  placeholder,
}: TextFormFieldProps) => {
  const fieldId = `field_${inputProps.name}`;

  return (
    <div className={styles.formField}>
      <label className={styles.formFieldLabel} htmlFor={fieldId}>
        {label}
      </label>
      <input
        className={styles.formFieldInput}
        id={fieldId}
        type="text"
        placeholder={placeholder}
        {...inputProps}
      />
    </div>
  );
};

export default PortalSubmissionEdit;
