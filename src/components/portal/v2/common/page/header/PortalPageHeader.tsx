import React from "react";

import styles from "./styles.module.scss";
import { PortalLink } from "@components/portal/v2/common/PortalLink";

interface Props {
  readonly backToPath?: string;
  readonly showBackButton?: boolean;
  readonly title: string;
}

const PortalPageHeader = ({ backToPath, showBackButton, title }: Props) => {
  return (
    <div className={styles.root}>
      {showBackButton ? (
        <PortalLink
          aria-label="Go back"
          className={styles.backButton}
          to={getBackToPath()}
        >
          <svg width="28" height="18" viewBox="0 0 28 18">
            <path
              d="M25.6863 7.49287H5.93125L10.2513 3.17287C10.8363 2.58787 10.8363 1.64287 10.2513 1.05787C9.971 0.77699 9.59053 0.619141 9.19375 0.619141C8.79697 0.619141 8.4165 0.77699 8.13625 1.05787L1.25125 7.94287C0.66625 8.52787 0.66625 9.47287 1.25125 10.0579L8.13625 16.9429C8.72125 17.5279 9.66625 17.5279 10.2513 16.9429C10.8363 16.3579 10.8363 15.4129 10.2513 14.8279L5.93125 10.4929H25.6863C26.5113 10.4929 27.1863 9.81787 27.1863 8.99287C27.1863 8.16787 26.5113 7.49287 25.6863 7.49287Z"
              fill="black"
            />
          </svg>
        </PortalLink>
      ) : <span />}
      <h1 className={styles.title}>{title}</h1>
    </div>
  );

  function getBackToPath() {
    return backToPath ?? "/portal";
  }
};

export default PortalPageHeader;
