import React, { useEffect, useState } from "react";

import { Artist } from "@components/portal/v2/types";
import LoadingOverlay from "@components/portal/v2/LoadingOverlay";
import { getArtist } from "@components/portal/v2/api";
import { Outlet, useOutletContext } from "react-router-dom";

interface PortalContext {
  readonly artist: Artist;
  readonly reloadArtist: () => Promise<Artist>;
}

const Portal = () => {
  const [artist, setArtist] = useState<Artist | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadArtist();
  }, []);

  return (
    <>
      <LoadingOverlay isLoading={isLoading} />
      {artist ? (
        <Outlet
          context={{ artist, reloadArtist: loadArtist } satisfies PortalContext}
        />
      ) : null}
    </>
  );

  function loadArtist(): Promise<Artist> {
    setIsLoading(true);

    return new Promise((resolve) => {
      getArtist().then((artist: Artist) => {
        setArtist(artist);
        setIsLoading(false);
        resolve(artist);
      });
    });
  }
};

export function useArtist() {
  return useOutletContext<PortalContext>();
}

export default Portal;
