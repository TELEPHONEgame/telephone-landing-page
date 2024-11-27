import React, { useEffect, useState } from "react";

import { PortalLink } from "../../../portal/v2/common/PortalLink";
import styles from "./styles.module.scss";
import PortalDialog from "@/components/portal/v2/common/dialog/PortalDialog";

const TelephoneHeader = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get("token");

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const closeMobileNav = () => {
    setIsMobileNavOpen(false);
  };

  useEffect(() => {
    const closeMobileNavIfDesktopNavVisible = () => {
      if (isMobileNavOpen && window.innerWidth >= 768) {
        closeMobileNav();
      }
    };
    addEventListener("resize", closeMobileNavIfDesktopNavVisible);
    addEventListener("popstate", closeMobileNavIfDesktopNavVisible);

    return () => {
      removeEventListener("resize", closeMobileNavIfDesktopNavVisible);
      removeEventListener("popstate", closeMobileNavIfDesktopNavVisible);
    };
  });

  const nav = (
    <nav className={styles.navbar}>
      {token ? (
        <PortalLink
          to="/portal"
          className={styles.navbarActiveLink}
          onClick={closeMobileNav}
        >
          Artist Portal
        </PortalLink>
      ) : null}
      <a href="https://phonebook.gallery/" target="_blank">
        Our last game
      </a>
      <PortalLink to="/faq">FAQ</PortalLink>
      <a href="https://www.psychopompprojects.com/telephone" target="_blank">
        Introduction and Theory Group
      </a>
    </nav>
  );

  return (
    <div className={styles.root}>
      <PortalLink to="/" className={styles.logo}>
        TELEPHONE
      </PortalLink>
      <button
        aria-label="Open navigation"
        className={styles.mobileNavToggle}
        onClick={() => {
          setIsMobileNavOpen(true);
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M5 17H19M5 12H19M5 7H19"
            stroke="#101318"
            stroke-width="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className={styles.desktopNav}>{nav}</div>

      <PortalDialog isOpen={isMobileNavOpen} disableDialogContentStyles={true}>
        <div className={styles.mobileNav}>
          <div className={styles.mobileNavHeader}>
            <PortalLink to="/" className={styles.logo}>
              TELEPHONE
            </PortalLink>
            <button
              aria-label="Close menu"
              className={styles.mobileNavCloseButton}
              onClick={closeMobileNav}
            >
              <svg width="32" height="32" viewBox="0 0 32 32">
                <rect width="32" height="32" rx="16" fill="#F3F3F3" />
                <path
                  d="M24.4009 7.61425C24.1518 7.36458 23.8136 7.22427 23.4609 7.22427C23.1082 7.22427 22.77 7.36458 22.5209 7.61425L16.0009 14.1209L9.48094 7.60092C9.23183 7.35125 8.89363 7.21094 8.54094 7.21094C8.18825 7.21094 7.85005 7.35125 7.60094 7.60092C7.08094 8.12092 7.08094 8.96092 7.60094 9.48092L14.1209 16.0009L7.60094 22.5209C7.08094 23.0409 7.08094 23.8809 7.60094 24.4009C8.12094 24.9209 8.96094 24.9209 9.48094 24.4009L16.0009 17.8809L22.5209 24.4009C23.0409 24.9209 23.8809 24.9209 24.4009 24.4009C24.9209 23.8809 24.9209 23.0409 24.4009 22.5209L17.8809 16.0009L24.4009 9.48092C24.9076 8.97425 24.9076 8.12092 24.4009 7.61425Z"
                  fill="#2D4663"
                />
              </svg>
            </button>
          </div>
          {nav}
        </div>
      </PortalDialog>
    </div>
  );
};

export default TelephoneHeader;
