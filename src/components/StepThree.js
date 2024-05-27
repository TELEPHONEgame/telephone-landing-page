import "../styles/stepThree.css";
import React from "react";

const StepThree = ({ setStep, inputFields, setInputFields }) => {
  const handleInputEvent = e => {
    // this will give us access to a value 1-10
    setInputFields(prev => ({
      ...prev,
      abstract: e.target.value,
    }));
  };
  return (
    <div className="fields_box">
      <div className="fields_box">
        <label htmlFor="abstract" className="input_label question_label">
          How abstract is your art?
        </label>
        <span>Take your best guess, no need to stress it.</span>

        <input
          type="range"
          id="abstract"
          name="abstract"
          className="abstract_meter"
          min="0"
          max="10"
          style={{
            background: `linear-gradient(to right, #0A0C0E ${
              inputFields.abstract * 10
            }%, #D9D9D9 ${inputFields.abstract * 10}%)`,
          }}
          value={inputFields.abstract}
          onInput={handleInputEvent}
        />

        <button className="main_btn" onClick={() => setStep(4)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default StepThree;
