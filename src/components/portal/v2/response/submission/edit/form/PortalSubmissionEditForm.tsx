import React, { useState } from "react";
import { useForm, UseFormRegisterReturn } from "react-hook-form";

import styles from "./styles.module.scss";
import PortalConfirmationDialog from "@components/portal/v2/common/dialog/PortalConfirmationDialog";
import { Submission } from "@/components/portal/v2/types";

interface FormData {
  title: string;
  materials: string;
  dimensions: string;
}

interface PortalSubmissionEditFormProps {
  readonly submission: Submission;
}

const PortalSubmissionEditForm = ({
  submission,
}: PortalSubmissionEditFormProps) => {
  const { register, handleSubmit } = useForm<FormData>();

  const [isDiscardConfirmationDialogOpen, setIsDiscardConfirmationDialogOpen] =
    useState(false);

  const openDiscardDialog = () => {
    setIsDiscardConfirmationDialogOpen(true);
  };

  const closeDiscardDialog = () => {
    setIsDiscardConfirmationDialogOpen(false);
  };

  return (
    <>
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
        File: {submission.file}<br />
        Type: {submission.type}
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
    </>
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

export default PortalSubmissionEditForm;
