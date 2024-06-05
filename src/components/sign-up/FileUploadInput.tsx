import React from "react";
import { FaPlus } from "react-icons/fa";

export const FileUploadInput = () => {
  return (
    <>
      <label htmlFor="link_text_input" className="input_label">
        Sample 1
      </label>
      <input
        className="form_input"
        type="text"
        id="link_text_input"
        placeholder="Share a link or upload a file"
      />
      <label htmlFor="upload_file" className="art_form_btn">
        <FaPlus />
      </label>
      <input type="file" id="upload_file" style={{ display: "none" }} />
    </>
  );
};
