import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

type Props = {
  handleUploadChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  key: string;
  mediaLink: string;
};

export const FileUploadInput = ({
  handleUploadChange,
  handleInputChange,
  name,
  file,
  mediaLink,
}: Props) => {
  return (
    <div className="media_upload">
      <div className="media_text_input">
        <label htmlFor="link_text_input" className="input_label">
          {name}
        </label>
        <input
          className="form_input"
          type="text"
          id="link_text_input"
          name={name}
          placeholder="Share a link or upload a file"
          value={mediaLink}
          onChange={handleInputChange}
        />
      </div>
      <div className="media_upload_input">
        <label htmlFor="upload_file" className="upload_button">
          <FaPlus />
        </label>
        <input
          type="file"
          id="upload_file"
          name={name}
          style={{ display: "none" }}
          onChange={handleUploadChange}
        />
      </div>
    </div>
  );
};
