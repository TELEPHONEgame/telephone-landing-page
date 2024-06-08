import React, { useState } from "react";
import { FileUploadInput } from "./FileUploadInput.tsx";
import "../../styles/stepFour.css";

const StepFour = ({ setStep, inputFields, setInputFields }) => {
  const [files, setFiles] = useState([
    { name: "Sample 1", file: null, type: "", size: "" },
    { name: "Sample 2", file: null, type: "", size: "" },
    { name: "Sample 3", file: null, type: "", size: "" },
  ]);
  const handleChange = (event: Event) => {
    event.preventDefault();
    event.target;
    // event.target.files << gets you the file that were updated
    // these should be checked if they are larger than 20mb

    console.log("PLATYPUS", event.target.files);
  };

  const submitForm = () => {
    // post req
    setStep(5);
  };

  console.log("PLATYPUS, Submit form");

  return (
    <>
      <div className="fields_box">
        <label htmlFor="" className="input_label question_label">
          Can we see?
        </label>
        <section className="files_upload_group">
          {files.map(() => (
            <FileUploadInput handleChange={handleChange} />
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
