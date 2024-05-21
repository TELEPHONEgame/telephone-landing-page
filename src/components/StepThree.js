import React from "react";

const StepThree = ({ setStep }) => {
  return (
    <div className="fields_box">
      <div className="fields_box">
        <label htmlFor="abstract" className="input_label question_label">
          How abstract is your art?
        </label>
        <span>Take your best guess, no need to stress it.</span>
        <button className="main_btn" onClick={() => setStep(4)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default StepThree;
