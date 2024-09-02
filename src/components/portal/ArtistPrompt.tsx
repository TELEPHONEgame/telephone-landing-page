import React, { useEffect, useState } from "react";

import DynamicGrid from "./DynamicGrid";
import { Artist } from "./types";
import "../../styles/mainPortal.css";

const ArtistPrompt = ({ artist }) => {
  // const [gridFiles, setGridFiles] = useState([]);
  console.log("ArtistPrompt page--");
  console.log("artist--", artist);
  console.log("submissions--", artist.parent.submissions);

  // const getFileTypeFromHead = async (url: string): Promise<string> => {
  //   try {
  //     const response = await fetch(url, { method: "HEAD" });
  //     const contentType = response.headers.get("Content-Type");

  //     if (!contentType) return "unknown";

  //     if (contentType.startsWith("image/")) return "image";
  //     if (contentType.startsWith("video/")) return "video";
  //     if (contentType.startsWith("audio/")) return "audio";

  //     return "unknown";
  //   } catch (error) {
  //     console.error("Error fetching Content-Type:", error);
  //     return "unknown";
  //   }
  // };

  // const checkFileType = async (file) => {
  //   const fileType = await getFileTypeFromHead(file);
  //   console.log(fileType);
  // };
  // // checkFileType();

  // const getFileTypeFromHead = async (url: string): Promise<string> => {
  //   try {
  //       const response = await fetch(url, { method: 'HEAD' });
  //       const contentType = response.headers.get('Content-Type');

  //       if (!contentType) return 'unknown';

  //       if (contentType.startsWith('image/')) return 'image';
  //       if (contentType.startsWith('video/')) return 'video';
  //       if (contentType.startsWith('audio/')) return 'audio';

  //       return 'unknown';
  //   } catch (error) {
  //       console.error('Error fetching Content-Type:', error);
  //       return 'unknown';
  //   }
  // };

  // const checkFileType = async () => {
  //   const fileType = await getFileTypeFromHead(artist.parent.submissions[0].file);
  //   console.log(fileType);
  // }
  // checkFileType();

  return (
    <>
      <div style={{ fontSize: "32px" }}>View Your Prompt</div>
      <div className="inner_box">
        <p style={{ fontSize: "14px", paddingBottom: "10px" }}>
          Here is the secret message being whispered to you. Your job is to
          create an art work to be whispered to the next player.
        </p>
        <DynamicGrid gridElements={artist.parent.submissions} />
      </div>
    </>
  );
};

export default ArtistPrompt;
