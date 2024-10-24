import React from "react";
import styles from "./styles.module.scss";
import { Submission } from "@/components/portal/v2/types";

const AudioPreview = ({ submission }: { submission: Submission }) => {
  return (
    <div className={styles.formField}>
      <h2 className={styles.formFieldLabel}>Preview</h2>
      <div>
        <audio src={submission.file} controls />
      </div>
    </div>
  );
};

export default AudioPreview;
