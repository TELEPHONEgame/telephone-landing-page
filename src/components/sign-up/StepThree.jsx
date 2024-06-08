import "../../styles/stepThree.css";
import React from "react";

const StepThree = ({ setStep, inputFields, setInputFields }) => {
  const handleInputEvent = e => {
    setInputFields(prev => ({
      ...prev,
      abstract: e.target.value,
    }));
  };
  return (
    <>
      <div className="fields_box">
        <section className="field_header">
          <label htmlFor="abstract" className="input_label question_label">
            <h1>How abstract is your art?</h1>
          </label>
          <p>Take your best guess, no need to stress it.</p>
        </section>

        <article>
          <span className="abstract_amount">{inputFields.abstract}</span>

          <input
            type="range"
            id="abstract"
            name="abstract"
            className="abstract_meter"
            min="0"
            max="10"
            // necessary inorder to style the track based on the amount
            style={{
              background: `linear-gradient(to right, #0A0C0E ${
                inputFields.abstract * 10
              }%, #D9D9D9 ${inputFields.abstract * 10}%)`,
            }}
            value={inputFields.abstract}
            onInput={handleInputEvent}
          />
          <section className="abstract_level">
            <p>Not at all</p>
            <p>Really abstract</p>
          </section>
        </article>
      </div>
      <button className="main_btn" onClick={() => setStep(4)}>
        Next
      </button>
    </>
  );
};

export default StepThree;
