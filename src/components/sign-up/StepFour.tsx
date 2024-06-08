import React, { useState } from "react";
import { FileUploadInput } from "./FileUploadInput.tsx";
import "../../styles/stepFour.css";

const StepFour = ({ setStep, inputFields, setInputFields }) => {
  const [files, setFiles] = useState<
    { name: string; file: File | null; mediaLink: string }[]
  >([
    { name: "Sample 1", file: null, mediaLink: "" },
    { name: "Sample 2", file: null, mediaLink: "" },
    { name: "Sample 3", file: null, mediaLink: "" },
  ]);

  const [mediaLinkInput, setMediaLink] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if i upload it will take up the link
    // if i click onto the input i will empty out the file

    // if the link input matches the object in the array that has a file
    // i want to remove the file and just have the link
    setMediaLink(e.target.value);

    // const updateFiles = files.map(sample => {
    //   console.log({ sample }, e.target.name);
    //   if (sample.name === e.target.name) {
    //     return {
    //       name: e.target.name,
    //       file: null,
    //       mediaLink: mediaLinkInput,
    //     };
    //   }
    //   return sample;
    // });
    // setFiles(updateFiles);
  };

  const handleUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const uploadedFiles = (e.target as HTMLInputElement).files;
    if (uploadedFiles) {
      const updatedFiles = files.map(sample => {
        if (sample.name === e.target.name) {
          return {
            name: sample.name,
            file: uploadedFiles[0],
            mediaLink: uploadedFiles[0].name,
          };
        }
        console.log("THESE SHOULD BE DIFF", sample);
        return sample;
      });
      setFiles(updatedFiles);
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
          {files.map(upload => (
            <FileUploadInput
              handleUploadChange={handleUploadChange}
              handleInputChange={handleInputChange}
              key={`component_${upload.name}`}
              mediaLinkInput={mediaLinkInput}
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
