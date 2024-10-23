import React from "react";

import { useArtist } from "@components/portal/v2/Portal";
import PortalSectionHeader from "@components/portal/v2/common/page/header/PortalPageHeader";

const PortalPrompt = () => {
  const {artist} = useArtist();

  return (
    <div>
      <PortalSectionHeader showBackButton={true} title="Artwork Response" />
      PROMPT
    </div>
  );
};

export default PortalPrompt;
