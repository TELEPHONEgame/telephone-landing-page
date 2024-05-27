import React, { useState } from "react";

const StepFour = ({ setStep, inputFields, setInputFields }) => {
  const submitForm = () => {
    console.log("Submit form");
    setStep(5);
  };

  return (
    <div className="fields_box">
      <div className="fields_box">
        <label htmlFor="abstract" className="input_label question_label">
          Can we see?
        </label>
        <button className="main_btn" onClick={submitForm}>
          Apply
        </button>
      </div>
    </div>
  );
};

export default StepFour;
