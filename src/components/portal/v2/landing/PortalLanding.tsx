import React from "react";

import { Artist } from "../../types";
import { Link } from "react-router-dom";

const PortalLanding = ({artist}: {artist: Artist}) => {
  return (
    <div>
      LANDING

      <div><Link to="/portal/prompt">Prompt</Link></div>
      <div><Link to="/portal/upload">Upload</Link></div>
    </div>
  );
};

export default PortalLanding;
