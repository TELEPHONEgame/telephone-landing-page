import React, { useState } from "react";
import { FileUploadInput } from "./FileUploadInput.tsx";
import "../../styles/stepFour.css";

const StepFour = ({ setStep, inputFields, setInputFields }) => {
  const submitForm = () => {
    console.log("Submit form");
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
          {/* inputs for files or  */}
          <FileUploadInput />
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
