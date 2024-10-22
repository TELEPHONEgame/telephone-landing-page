import React from "react";
import styles from "./confimation.module.scss";
import PortalDialog from "./PortalDialog";

interface PortalConfirmationDialogProps {
  readonly body: string;
  readonly cancelText?: string;
  readonly confirmText?: string;
  readonly onCancel: () => void;
  readonly onConfirm: () => void;
  readonly title: string;
}

const PortalConfirmationDialog = ({
  body,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
  title,
}) => {
  return (
    <PortalDialog>
      <div className={styles.dialogContent}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.body}>{body}</p>

        <div className={styles.actions}>
          <button className={styles.cancelButton} onClick={onCancel}>
            {cancelText ?? "Cancel"}
          </button>
          <button className={styles.confirmButton} onClick={onConfirm}>
            {confirmText ?? "Confirm"}
          </button>
        </div>
      </div>
    </PortalDialog>
  );
};

export default PortalConfirmationDialog;
