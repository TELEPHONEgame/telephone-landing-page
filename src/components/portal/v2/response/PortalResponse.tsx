import React from "react";
import { Link } from "react-router-dom";

import styles from "./styles.module.scss";
import { Artist } from "@components/portal/v2/types";
import PortalAccordion from "@components/portal/v2/common/accordion/PortalAccordion";
import PortalSectionHeader from "@components/portal/v2/common/page/header/PortalPageHeader";
import PortalSubmissionList from "@components/portal/v2/response/submission/list/PortalSubmissionList";

const PortalResponse = ({ artist }: { artist: Artist }) => {
  return (
    <>
      <PortalSectionHeader showBackButton={true} title="Artwork Response" />

      <div className={styles.content}>
        <div className={styles.accordion}>
          <PortalAccordion title="Upload your artwork">
            Upload your artwork, you can upload up to 10 files. Feel free to
            include detail shots when uploading photographs.
          </PortalAccordion>
          <PortalAccordion title="Usage and Permissions">
            By submitting this work, you allow TELEPHONE digital rights to
            present your work digitally in our online exhibition of TELEPHONE.
            All other usage would require your further permission. You retain
            all other digital and physical rights to your own work. To read more
            details please <Link to="/faq">click here</Link>.
          </PortalAccordion>
          <PortalAccordion title="Artwork Order and Main Thumbnail">
            After uploading your artwork, it's important to review the order and
            select your main thumbnail favorite. You can use the up and down
            arrows to change the order of your artwork.
          </PortalAccordion>
        </div>

        <PortalSubmissionList artist={artist} />

        <div className={styles.footer}>
          <button className={styles.addButton}>
            Upload a file
            <svg
              className={styles.addButtonIcon}
              height="20"
              viewBox="0 0 20 20"
              width="20"
            >
              <path d="M8.66406 11.3346H0.664062V8.66797H8.66406V0.667969H11.3307V8.66797H19.3307V11.3346H11.3307V19.3346H8.66406V11.3346Z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default PortalResponse;
