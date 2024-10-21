import React from "react";

import styles from "./styles.module.scss"
import { Artist } from "@components/portal/v2/types";
import PortalSectionHeader from "@components/portal/v2/common/page/header/PortalPageHeader";
import PortalSubmissionList from "@components/portal/v2/upload/submission/list/PortalSubmissionList";

const PortalUpload = ({artist}: {artist: Artist}) => {
  return (
    <>
      <PortalSectionHeader showBackButton={true} title="Artwork Response" />

      <div className={styles.content}>
        <PortalSubmissionList artist={artist} />
        <button>Upload a file</button>
      </div>
    </>
  );
};

export default PortalUpload;
