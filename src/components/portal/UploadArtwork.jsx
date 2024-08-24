import React, { useEffect, useState } from "react";

import "../../styles/mainPortal.css";

const UploadArtwork = () => {
  console.log("UploadArtwork page--");

  return (
    <>
      <div style={{ fontSize: "32px" }}>Upload your artwork</div>
      <div className="inner_box">
        <p style={{ fontSize: "14px" }}>
          Upload your artwork in 1-5 files or links. Feel free to include detail
          shots when uploading photographs.
        </p>
        <form>
        <label
            htmlFor="file_1"
            className="input_label"
            style={{ paddingTop: "14vh" }}
          >
            File 1
          </label>
          <input
            className="form_input"
            id="file_1"
            placeholder="Share a link or upload a file"
          />
        </form>
      </div>
    </>
  );
};

export default UploadArtwork;
