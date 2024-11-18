import React, { useState } from "react";

import styles from "./styles.module.scss";
import { useArtist } from "@components/portal/v2/Portal";
import * as api from "@components/portal/v2/api";
import PortalAccordion from "@components/portal/v2/common/accordion/PortalAccordion";
import PortalSectionHeader from "@components/portal/v2/common/page/header/PortalPageHeader";
import PortalPromptList from "@components/portal/v2/prompt/list/PortalPromptList";
import LoadingOverlay from "@components/portal/v2/LoadingOverlay";

const PortalPrompt = () => {
  const { artist } = useArtist();
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadAssignment = async () => {
    setIsDownloading(true);
    await api.downloadAssignment(artist.parent.submissions);
    setIsDownloading(false);
  };

  return (
    <>
      <PortalSectionHeader showBackButton={true} title="Artistic Prompt" />
      <div className={styles.content}>
        Here is the secret message being whispered to you. Your job is to create
        an art work to be whispered to the next player.
        <div className={styles.accordion}>
          <PortalAccordion title="Instructions">
            Lorem ipsum odor amet, consectetuer adipiscing elit. Maecenas
            curabitur ullamcorper habitasse nulla dapibus netus ultrices
            maximus. Metus suspendisse elit magnis; consectetur magna est
            egestas penatibus id. Amolestie nullam a fringilla ligula id eget
            placerat. Auctor conubia dictum posuere ac proin dictum mollis
            malesuada orci. Laoreet justo tristique diam dis odio sem
            consectetur ridiculus. Porta consequat suscipit placerat conubia
            proin at platea. Ex fringilla nibh ullamcorper volutpat amet nibh
            eros torquent.
          </PortalAccordion>
          <PortalAccordion title="Your assignment">
            Lorem ipsum odor amet, consectetuer adipiscing elit. Maecenas
            curabitur ullamcorper habitasse nulla dapibus netus ultrices
            maximus. Metus suspendisse elit magnis; consectetur magna est
            egestas penatibus id. Amolestie nullam a fringilla ligula id eget
            placerat. Auctor conubia dictum posuere ac proin dictum mollis
            malesuada orci. Laoreet justo tristique diam dis odio sem
            consectetur ridiculus. Porta consequat suscipit placerat conubia
            proin at platea. Ex fringilla nibh ullamcorper volutpat amet nibh
            eros torquent.
            <div className={styles.promptList}>
              <PortalPromptList artist={artist} />
            </div>
          </PortalAccordion>
        </div>
        <div className={styles.footer}>
          <button
            className={styles.downloadButton}
            onClick={downloadAssignment}
          >
            Download your assignment
          </button>
        </div>
      </div>

      <LoadingOverlay
        isLoading={isDownloading}
        message="Preparing download..."
      />
    </>
  );
};

export default PortalPrompt;
