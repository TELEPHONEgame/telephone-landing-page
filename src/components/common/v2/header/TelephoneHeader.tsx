import React from "react";

import { PortalLink } from "../../../portal/v2/common/PortalLink";
import styles from "./styles.module.scss"

const TelephoneHeader = () => {
  return (
    <div className={styles.root}>
      <div className={styles.logo}>
        TELEPHONE
      </div>
      <div>
        <PortalLink to="/portal">Artist Portal</PortalLink>
      </div>
    </div>
  );
}

export default TelephoneHeader;