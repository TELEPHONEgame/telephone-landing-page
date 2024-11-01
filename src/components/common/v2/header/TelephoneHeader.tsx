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
      <div>
        {token ? <PortalLink to="/portal">Artist Portal</PortalLink> : null}
      </div>
    </div>
  );
}

export default TelephoneHeader;