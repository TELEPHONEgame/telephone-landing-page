import React from "react";
import { FaPlus } from "react-icons/fa";

export const FileUploadInput = () => {
  return (
    <div className="media_upload">
      <div className="media_text_input">
        <label htmlFor="link_text_input" className="input_label">
          Sample
        </label>
        <input
          className="form_input"
          type="text"
          id="link_text_input"
          placeholder="Share a link or upload a file"
        />
      </div>
      <div className="media_upload_input">
        <label htmlFor="upload_file" className="upload_button">
          <FaPlus />
        </label>
        <input type="file" id="upload_file" style={{ display: "none" }} />
      </div>
    </div>
  );
};
