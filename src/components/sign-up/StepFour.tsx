import React, { useState } from "react";
import { FileUploadInput } from "./FileUploadInput.tsx";
import "../../styles/stepFour.css";
import { FormType } from "./stepFourTypes.ts";

const StepFour = ({ setStep, inputFields, setInputFields }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updateFiles = inputFields.samples.map(sample => {
      if (sample.name === e.target.name) {
        return {
          name: e.target.name,
          file: null,
          mediaLink: e.target.value,
        };
      }
      return sample;
    });
    setInputFields((prev: FormType) => ({
      ...prev,
      samples: updateFiles,
    }));
  };

  const handleUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const uploadedFiles = (e.target as HTMLInputElement).files;
    if (uploadedFiles) {
      const updatedFiles = inputFields.samples.map(sample => {
        if (sample.name === e.target.name) {
          return {
            name: sample.name,
            file: uploadedFiles[0],
            mediaLink: uploadedFiles[0].name,
          };
        }
        return sample;
      });
      setInputFields((prev: FormType) => ({
        ...prev,
        samples: updatedFiles,
      }));
    }
  };

  const submitForm = () => {
    // post req
    setStep(5);
  };

  return (
    <>
      <div className="fields_box">
        <label htmlFor="" className="input_label question_label">
          Can we see?
        </label>
        <section className="files_upload_group">
          {inputFields.samples.map(upload => (
            <FileUploadInput
              handleUploadChange={handleUploadChange}
              handleInputChange={handleInputChange}
              key={`component_${upload.name}`}
              {...upload}
            />
          ))}
        </section>
      </div>

      <div className="next_btn_box">
        <button className="main_btn" onClick={submitForm}>
          Apply
        </button>
      </div>
    </>
  );
};

export default StepFour;
