import React from "react";

const StepOne = ({ setStep, inputFields, setInputFields }) => {
  const setNextStep = () => {
    setStep(2);
  };

  return (
    <>
      <div className="fields_box">
        <label htmlFor="email" className="input_label first_label">
          Email
        </label>
        <input
          className="form_input"
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          // value={searchTerm}
          onChange={e => {
            console.log("email value--", e.target.value);
            setInputFields({ ...inputFields, [e.target.name]: e.target.value });
          }}
          required
        />

        <label htmlFor="firstName" className="input_label">
          First name
        </label>
        <input
          className="form_input"
          type="text"
          id="firstName"
          name="firstName"
          placeholder="First name"
          // value={searchTerm}
          onChange={e => {
            // console.log("firstName value--", e.target.value);
            setInputFields({ ...inputFields, [e.target.name]: e.target.value });
          }}
          required
        />

        <label htmlFor="lastName" className="input_label">
          Last name
        </label>
        <input
          className="form_input"
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Last name"
          // value={searchTerm}
          onChange={e => {
            // console.log("lastName value--", e.target.value);
            setInputFields({ ...inputFields, [e.target.name]: e.target.value });
          }}
          required
        />
      </div>
      {/* this outer box might not be needed */}
      <div className="next_btn_box">
        <button className="main_btn next_btn" onClick={setNextStep}>
          Next
        </button>
      </div>
    </>
  );
};

export default StepOne;
