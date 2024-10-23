import React, { useEffect, useState } from "react";

import { Artist } from "@components/portal/v2/types";
import LoadingOverlay from "@components/portal/v2/LoadingOverlay";
import { getArtist } from "@components/portal/v2/api";
import { Outlet, useOutletContext } from "react-router-dom";

interface PortalContext {
  readonly artist: Artist;
}

const Portal = () => {
  const [artist, setArtist] = useState<Artist | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getArtist().then((artist: Artist) => {
      setArtist(artist);
      setIsLoading(false);
    });
  }, []);

  if (isLoading || !artist) {
    return <LoadingOverlay isLoading={isLoading} />;
  }

  return <Outlet context={{artist} satisfies PortalContext} />;
};

export function useArtist() {
  return useOutletContext<PortalContext>();
}

export default Portal;
