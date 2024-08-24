import React, { useEffect, useState } from "react";

import "../../styles/mainPortal.css";

const ArtistPrompt = () => {
  console.log("ArtistPrompt page--");

  return (
    <>
      <div style={{ fontSize: "32px" }}>View Your Prompt</div>
      <div className="inner_box">
        <p style={{ fontSize: "14px" }}>
          Here is the secret message being whispered to you. Your job is to
          create an art work to be whispered to the next player.
        </p>
      </div>
    </>
  );
};

export default ArtistPrompt;
