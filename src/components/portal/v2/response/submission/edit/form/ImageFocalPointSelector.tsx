import React from "react";
import styles from "./styles.module.scss";
import { Submission } from "@/components/portal/v2/types";

const ImageFocalPointSelector = ({
  submission,
}: {
  submission: Submission;
}) => {
  return (
    <div className={styles.formField}>
      <h2 className={styles.formFieldLabel}>Thumbnail (optional)</h2>
      <div>
        <img src={submission.file} />
      </div>
      <p className={styles.formFieldHelpText}>
        Click to define your artwork’s focal point. This will be used when
        generating thumbnails in the exhibit
      </p>
    </div>
  );
};

export default ImageFocalPointSelector;
