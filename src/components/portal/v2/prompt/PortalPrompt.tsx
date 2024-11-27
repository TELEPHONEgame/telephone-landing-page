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
            <p>
              You have been sent a work of art by an artist you do not know from
              a far away place on the planet. Their work was based on a prior
              art work, which was based on other works that came before. Each of
              these works tries to pass along the message and meaning of the
              works that came before.
            </p>

            <p>
              Your due date can be seen on the prior page. Once that time runs
              out, this artwork will be assigned to another artist. If that
              doesn’t feel like enough time, or if you have trouble accessing
              your assignment, please let us know at
              telephone.outreach@gmail.com.
            </p>

            <p>
              When you finish your response to this artwork, we will need you to
              upload a high-definition image, sound, video, or text file of your
              art. This will be displayed in the exhibition of TELEPHONE in
              2025. You will own all digital and physical rights to your own
              work but will grant us permission to publish your art within the
              confines of this game the online exhibition of TELEPHONE.
            </p>

            <p>
              Later on, we will need you to provide some further information
              here in the Artist Portal, which is still being built. This
              includes an artist bio, a photograph of yourself, and a photograph
              of where you made the work (or the area in the world where you
              made it). We will also ask you for a description of your work and
              a description of what it was like to translate / transcribe /
              interpret / transmit the message you were assigned.
            </p>
          </PortalAccordion>
          <PortalAccordion title="Your assignment">
            <p>
              This assigned artwork, from an artist you don't know on the other
              side of the Earth, contains and transmits a very specific message.
              The preceding artworks did the same. Try to see and hear and feel
              into what has been whispered to you. As best as you can, interpret
              the message in this work and pass it along faithfully through your
              own art. Trust that if you invest yourself in the process of
              translation, no matter how abstract the art, the message will find
              a way through.
            </p>

            <p>
              Please keep your own work and the work that was assigned to you a
              secret! We don't want to spoil the fun of the game! When your
              interpretation has been returned to us, we will assign it to other
              artists in far-away locations on Earth.
            </p>

            <p>
              Good luck and we’re so very excited to see the splendid work you
              do.{" "}
            </p>

            <p>Love, gratitude, illumination, TELEPHONE</p>

            <p>
              And if you know any other brilliant artists that would enjoy
              playing with us, please send them to{" "}
              <a href="https://artists.telephonegame.art/" target="_blank">
                https://artists.telephonegame.art/
              </a>
            </p>

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
