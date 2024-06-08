import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

type Props = {
  handleUploadChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  key: string;
  file: File | null;
  mediaLinkInput: string;
  mediaLink: string;
};

export const FileUploadInput = ({
  handleUploadChange,
  handleInputChange,
  name,
  file,
  mediaLinkInput,
  mediaLink,
}: Props) => {
  console.log("ALL ARE ACCESSED?", name);
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
          // if there is a file i will use their name otherwise setup a link
          defaultValue={file ? mediaLink : mediaLinkInput}
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
