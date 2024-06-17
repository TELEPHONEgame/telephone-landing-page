import React from "react";
import { useFormContext } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { SignUpFormType } from "./types";
import { ErrorMessage } from "../ErrorMessage";

type Props = {
  sampleId: number;
  key: string;
};

const MAX_BYTES = 20_000_000;

export const FileUploadInput = ({ sampleId }: Props) => {
  const {
    register,
    formState: { errors },
    setValue,
    trigger,
    watch,
  } = useFormContext<SignUpFormType>();
  const currentMedia = watch(`samples.${sampleId}`);

  const isUrlValid = (input: string) => {
    if (currentMedia.file) return true;
    try {
      new URL(input);
      return true;
    } catch (err) {
      return "Please provide a valid url";
    }
  };
  const validateSize = () => {
    if (!currentMedia.file) return true;

    if (currentMedia.file.size <= MAX_BYTES) return true;
    return "Please provide a file smaller than 20MB";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(`samples.${sampleId}.mediaLink`, e.target.value);
    setValue(`samples.${sampleId}.file`, null);
    trigger(`samples.${sampleId}`);
  };

  const handleUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = (e.target as HTMLInputElement).files;
    if (files?.length) {
      const file = files[0];
      setValue(`samples.${sampleId}.file`, file);
      setValue(`samples.${sampleId}.mediaLink`, file.name);
    }
  };

  return (
    <>
      <section className="media_upload">
        <div className="media_text_input">
          <label htmlFor="link_text_input" className="input_label">
            Sample {sampleId + 1}
          </label>
          <input
            className="form_input"
            style={{ marginBottom: "0" }}
            type="text"
            id="link_text_input"
            placeholder="Share a link or upload a file"
            {...register(`samples.${sampleId}.mediaLink`, {
              validate: {
                validUrl: isUrlValid,
              },
            })}
            onChange={handleInputChange}
          />
        </div>

        <div className="media_upload_input">
          <label htmlFor={`upload_file_${sampleId}`}>
            <FaPlus />
          </label>
          <input
            type="file"
            id={`upload_file_${sampleId}`}
            accept=".jpg, .jpeg, .png"
            {...register(`samples.${sampleId}.file`, {
              validate: {
                validateSize,
              },
            })}
            onChange={handleUploadChange}
            hidden
          />
        </div>
      </section>
      {errors.samples?.[sampleId] && (
        <ErrorMessage
          message={
            errors?.samples[sampleId].mediaLink?.message ||
            errors?.samples[sampleId].file?.message
          }
        />
      )}
    </>
  );
};
