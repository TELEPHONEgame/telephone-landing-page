import React from "react";

import { Artist } from "../../types";
import styles from "./styles.module.scss"
import PortalSectionHeader from "../common/page/header/PortalPageHeader";

const PortalUpload = ({artist}: {artist: Artist}) => {
  return (
    <div className={styles.root}>
      <PortalSectionHeader showBackButton={true} title="Artwork Response" />
      UPLOAD
    </div>
  );
};

export default PortalUpload;
