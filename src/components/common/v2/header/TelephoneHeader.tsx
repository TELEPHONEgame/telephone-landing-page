import React from "react";

import { PortalLink } from "../../../portal/v2/common/PortalLink";
import styles from "./styles.module.scss"

const TelephoneHeader = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get("token");

  return (
    <div className={styles.root}>
      <PortalLink to="/" className={styles.logo}>
        TELEPHONE
      </PortalLink>
      <nav className={styles.navbar}>
        {token ? <PortalLink to="/portal">Artist Portal</PortalLink> : null}
        <a href="https://phonebook.gallery/" target="_blank">
          Our last game
        </a>
        <PortalLink to="/faq">FAQ</PortalLink>
        <a href="https://www.psychopompprojects.com/telephone" target="_blank">
          Introduction and Theory Group
        </a>
      </nav>
    </div>
  );
}

export default TelephoneHeader;