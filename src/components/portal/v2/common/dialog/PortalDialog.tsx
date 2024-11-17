import React, { useEffect, useState } from "react";
import FocusTrap from "focus-trap-react";
import { createPortal } from "react-dom";
import styles from "./base.module.scss";

interface PortalDialogProps extends React.PropsWithChildren {
  readonly disableDialogContentStyles?: boolean;
  readonly isOpen: boolean;
}

const PortalDialog = ({
  children,
  disableDialogContentStyles,
  isOpen,
}: PortalDialogProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [wasOpen, setWasOpen] = useState(isOpen);

  if (isOpen !== wasOpen && !isAnimating) {
    setIsAnimating(true);
  }

  useEffect(() => {
    const appRoot = document.getElementById("root");
    if (appRoot) {
      appRoot.style.transition = "filter 200ms";
      appRoot.style.filter = isOpen ? "blur(21px)" : null;
    }

    document.body.style.overflow = isOpen ? "hidden" : null;
    if (isOpen !== wasOpen) {
      setWasOpen(isOpen);
    }

    return () => {
      if (appRoot) {
        appRoot.style.transition = null;
        appRoot.style.filter = null;
      }
      document.body.style.overflow = null;
    };
  }, [isOpen]);

  const markAnimationComplete = () => {
    setIsAnimating(false);
  };

  return createPortal(
    <div
      className={isOpen ? styles.open : styles.closed}
      onTransitionEnd={markAnimationComplete}
    >
      {isOpen || isAnimating ? (
        <FocusTrap>
          <div>
            <div className={styles.backdrop} />
            <div className={styles.contents}>
              {disableDialogContentStyles ? (
                children
              ) : (
                <div className={styles.dialog}>{children}</div>
              )}
            </div>
          </div>
        </FocusTrap>
      ) : null}
    </div>,
    document.body
  );
};

export default PortalDialog;
