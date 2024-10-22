import React, { useEffect, useState } from "react";
import FocusTrap from "focus-trap-react";
import { createPortal } from "react-dom";
import styles from "./base.module.scss";

interface PortalDialogProps extends React.PropsWithChildren {
  readonly isOpen: boolean;
}

const PortalDialog = ({ children, isOpen }: PortalDialogProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [wasOpen, setWasOpen] = useState(isOpen);

  if (isOpen !== wasOpen && !isAnimating) {
    setIsAnimating(true);
  }

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : null;
    if (isOpen !== wasOpen) {
      setWasOpen(isOpen);
    }

    return () => {
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
              <div className={styles.dialog}>{children}</div>
            </div>
          </div>
        </FocusTrap>
      ) : null}
    </div>,
    document.body
  );
};

export default PortalDialog;
