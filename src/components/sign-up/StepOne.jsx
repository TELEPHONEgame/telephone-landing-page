import React from "react";

const StepOne = ({ setStep, inputFields, setInputFields }) => {
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const setNextStep = () => {
    // validation
    const isEmailValid = validateEmail(inputFields.email);
    const isFirstNameValid = inputFields.firstName;
    const isLastNameValid = inputFields.lastName;

    if (isEmailValid && isFirstNameValid && isLastNameValid) {
      setStep(2);
    }
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
          // value={inputFields.email}
          onChange={(e) => {
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
          // value={inputFields.firstName}
          onChange={(e) => {
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
          // value={inputFields.lastName}
          onChange={(e) => {
            setInputFields({ ...inputFields, [e.target.name]: e.target.value });
          }}
          required
        />
      </div>
      {/* this outer box might not be needed */}
      <div className="next_btn_box">
        <button
          className="main_btn next_btn"
          onClick={setNextStep}
          type="submit"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default StepOne;
