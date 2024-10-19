import React from "react";

import { Artist } from "../../types";
import { PortalLink } from "../common/PortalLink";

const PortalLanding = ({artist}: {artist: Artist}) => {
  return (
    <div>
      LANDING

      <div><PortalLink to="/portal/prompt">Prompt</PortalLink></div>
      <div><PortalLink to="/portal/upload">Upload</PortalLink></div>
    </div>
  );
};

export default PortalLanding;
