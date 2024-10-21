import React from "react";

import { Artist } from "../../types";
import PortalSectionHeader from "../common/page/header/PortalPageHeader";

const PortalPrompt = ({artist}: {artist: Artist}) => {
  return (
    <div>
      <PortalSectionHeader showBackButton={true} title="Artwork Response" />
      PROMPT
    </div>
  );
};

export default PortalPrompt;
