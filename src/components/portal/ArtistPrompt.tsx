import React, { useEffect, useState } from "react";

import "../../styles/mainPortal.css";

const ArtistPrompt = () => {
  console.log("ArtistPrompt page--");

  return (
    <>
      <div style={{ fontSize: "32px" }}>View Your Prompt</div>
      <div className="inner_box">
        <p style={{ fontSize: "14px", paddingBottom: "10px" }}>
          Here is the secret message being whispered to you. Your job is to
          create an art work to be whispered to the next player.
        </p>
        <div className="prompt_grid">
          <div className="prompt_grid_item">
            <img className="grid_img" />
          </div>

          <div className="prompt_grid_item">
            <img className="grid_img" />
          </div>

          <div className="prompt_grid_item">
            <img className="grid_img" />
          </div>

          <div className="prompt_grid_item">
            <img className="grid_img" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtistPrompt;
