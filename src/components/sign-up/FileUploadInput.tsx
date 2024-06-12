import React, { useCallback, useState } from "react";
import { FieldPath, useFormContext } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { SignUpFormType } from "./types";

type Props = {
  // handleUploadChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sampleId: number;
  key: string;
};

const MAX_BYTES = 20_000_000;
const validateSize = file => {
  console.log("VALIDATE SIZE", { file });
  return true;
};
export const FileUploadInput = ({ sampleId }: Props) => {
  const { register, watch, setValue, getValues } =
    useFormContext<SignUpFormType>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // access the sample at its media link updates it
    setValue(`samples.${sampleId}.mediaLink`, e.target.value);
    // resets the sample at file and sets it to empty
    setValue(`samples.${sampleId}.file`, "");
  };

  const handleUploadChange = (
    sampleId: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = (e.target as HTMLInputElement).files;
    console.log("uploading to sample", sampleId);
    if (files?.length) {
      const file = files[0];
      setValue(`samples.${sampleId}.file`, file.name);
      setValue(`samples.${sampleId}.mediaLink`, file.name);
    }
  };

  return (
    <div className="media_upload">
      <div className="media_text_input">
        <label htmlFor="link_text_input" className="input_label">
          Sample {sampleId + 1}
        </label>
        <input
          className="form_input"
          type="text"
          id="link_text_input"
          placeholder="Share a link or upload a file"
          {...register(`samples.${sampleId}.mediaLink`)}
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
          className="upload_button"
          accept=".jpg, .jpeg, .png"
          {...register(`samples.${sampleId}.file`, {
            validate: {
              validateSize: val => validateSize(val),
            },
          })}
          onChange={e => handleUploadChange(sampleId, e)}
        />
      </div>
    </div>
  );
};
