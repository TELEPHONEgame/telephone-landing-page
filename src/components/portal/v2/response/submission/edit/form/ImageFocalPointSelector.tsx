import React from "react";
import styles from "./styles.module.scss";
import { Submission } from "@/components/portal/v2/types";

const ImageFocalPointSelector = ({
  onChange,
  submission,
  value,
}: {
  onChange: (x: number, y: number) => void;
  submission: Submission;
  value: {x: number, y: number},
}) => {
  const onImageClick = (e: React.PointerEvent<HTMLImageElement>) => {
    const image = e.target as HTMLImageElement;
    const imageWidth = image.clientWidth;
    const imageHeight = image.clientHeight;
    const imageRect = image.getBoundingClientRect();
    const posX = Math.round(((e.clientX - imageRect.x) / imageWidth) * 100);
    const posY = Math.round(((e.clientY - imageRect.y) / imageHeight) * 100);

    onChange(posX, posY);
  };

  return (
    <div className={styles.formField}>
      <h2 className={styles.formFieldLabel}>Thumbnail (optional)</h2>
      <div>
        <div className={styles.imageContainer}>
          <img src={submission.file} onPointerDown={onImageClick} />
          <div
            className={styles.marker}
            style={{
              left: `${value.x}%`,
              top: `${value.y}%`,
            }}
          />
        </div>
      </div>
      <p className={styles.formFieldHelpText}>
        Click to define your artwork’s focal point. This will be used when
        generating thumbnails in the exhibit
      </p>
    </div>
  );
};

export default ImageFocalPointSelector;
