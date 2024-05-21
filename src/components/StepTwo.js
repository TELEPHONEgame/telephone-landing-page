import React from "react";

const StepTwo = ({ setStep }) => {
  return (
    <div className="fields_box">
      <label htmlFor="country" className="input_label first_label">
        Country
      </label>
      <select
        className="form_input"
        id="country"
        placeholder="Country"
        // value={age}
        onChange={(event) => {
          console.log("event--", event.target);
          // setAge(event.target.value);
        }}
        required
      >
        {/* <option value="english">English (Default)</option> */}
      </select>

      <label htmlFor="city" className="input_label">
        City
      </label>
      <select
        className="form_input"
        id="city"
        placeholder="City"
        // value={age}
        onChange={(event) => {
          console.log("event--", event.target);
          // setAge(event.target.value);
        }}
        required
      >
        {/* <option value="english">English (Default)</option> */}
      </select>

      <label htmlFor="art form" className="input_label">
        What form does your art take? What art form is closest to what you do?
      </label>

      <div className="next_btn_box">
        <button className="main_btn next_btn" onClick={() => setStep(3)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default StepTwo;
