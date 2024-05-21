import React from "react";

const StepOne = ({ setStep }) => {
  return (
    <>
      <div className="fields_box">
        <label htmlFor="email" className="input_label first_label">
          Email
        </label>
        <input
          className="form_input"
          type="text"
          id="email"
          placeholder="Email"
          // value={searchTerm}
          onChange={(event) => {
            // setSearchTerm(event.target.value);
          }}
          required
        />

        <label htmlFor="first name" className="input_label">
          First name
        </label>
        <input
          className="form_input"
          type="text"
          id="first name"
          placeholder="First name"
          // value={searchTerm}
          onChange={(event) => {
            // setSearchTerm(event.target.value);
          }}
          required
        />

        <label htmlFor="last name" className="input_label">
          Last name
        </label>
        <input
          className="form_input"
          type="text"
          id="last name"
          placeholder="Last name"
          // value={searchTerm}
          onChange={(event) => {
            // setSearchTerm(event.target.value);
          }}
          required
        />
      </div>
      <div className="next_btn_box">
        <button className="main_btn next_btn" onClick={() => setStep(2)}>
          Next
        </button>
      </div>
    </>
  );
};

export default StepOne;
