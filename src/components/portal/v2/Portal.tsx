import React, { useEffect, useState } from "react";

import Header from "../../common/Header";
import "../../../styles/mainPortal.css";
import { Artist } from "./types";
import LoadingOverlay from "./LoadingOverlay";
import { getArtist } from "./api";
import { Route, Routes } from "react-router-dom";
import PortalLanding from "./landing/PortalLanding";
import PortalPrompt from "./prompt/PortalPrompt";
import PortalUpload from "./upload/PortalUpload";

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
      <Header title="TELEPHONE: Artist Portal" />
      <Routes>
        <Route path="/" element={<PortalLanding artist={artist} />} />
        <Route path="/prompt" element={<PortalPrompt artist={artist} />} />
        <Route path="/upload" element={<PortalUpload artist={artist} />} />
      </Routes>
    </div>
  );
};

export default Portal;
