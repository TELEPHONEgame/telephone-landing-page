import React, {useEffect} from "react";
import { createPortal } from "react-dom";
import styles from "./base.module.scss";

const PortalDialog = ({ children }: React.PropsWithChildren) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = null;
    }
  });

  return createPortal(
    <div>
      <div className={styles.backdrop} />
      <div className={styles.contents}>
        <div className={styles.dialog}>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default PortalDialog;
