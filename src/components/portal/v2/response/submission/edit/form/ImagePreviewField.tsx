import React from "react";
import styles from "./styles.module.scss";
import { Submission } from "@/components/portal/v2/types";

const ImagePreview = ({
  submission,
  focalX,
  focalY,
}: {
  submission: Submission;
  focalX: number;
  focalY: number;
}) => {
  return (
    <div className={styles.formField}>
      <h2 className={styles.formFieldLabel}>Thumbnail Preview</h2>
      <div>
        <img
          src={submission.file}
          className={styles.thumbnailPreview}
          style={{
            objectFit: "cover",
            objectPosition: `${focalX}% ${focalY}%`,
          }}
        />
      </div>
    </div>
  );
};

export default ImagePreview;
