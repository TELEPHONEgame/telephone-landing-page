import React, { useEffect, useState } from "react";

// import "../../../styles/mainPortal.css";
import { Artist } from "@components/portal/v2/types";
import LoadingOverlay from "@components/portal/v2/LoadingOverlay";
import { getArtist } from "@components/portal/v2/api";
import { Route, Routes } from "react-router-dom";
import PortalLanding from "@components/portal/v2/landing/PortalLanding";
import PortalPrompt from "@components/portal/v2/prompt/PortalPrompt";
import PortalUpload from "@components/portal/v2/upload/PortalUpload";

const Portal = () => {
  const [artist, setArtist] = useState<Artist | null>(null);
  const [task, setTask] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getArtist().then((artist: Artist) => {
      setArtist(artist);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <LoadingOverlay isLoading={isLoading} />;
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<PortalLanding artist={artist} />} />
        <Route path="/prompt" element={<PortalPrompt artist={artist} />} />
        <Route path="/upload" element={<PortalUpload artist={artist} />} />
      </Routes>
    </div>
  );
};

export default Portal;
