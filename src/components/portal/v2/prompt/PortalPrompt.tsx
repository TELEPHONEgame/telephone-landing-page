import React from "react";

import { Artist } from "@components/portal/v2/types";
import PortalSectionHeader from "@components/portal/v2/common/page/header/PortalPageHeader";

const PortalPrompt = ({artist}: {artist: Artist}) => {
  return (
    <div>
      <PortalSectionHeader showBackButton={true} title="Artwork Response" />
      PROMPT
    </div>
  );
};

export default PortalPrompt;
