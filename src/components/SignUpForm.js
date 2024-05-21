import React, { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";

const SignUpForm = ({ step, setStep }) => {
  const [inputFields, setInputFields] = useState({
    email: "",
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    artForm: "",
    abstract: "",
    sampleOne: "",
    sampleTwo: "",
    sampleThree: "",
  });
  console.log("SIgnupForm----");
  console.log("step----", step);

  return (
    <form className="sign_up_form">
      {step === 1 ? (
        <StepOne setStep={setStep} />
      ) : step === 2 ? (
        <StepTwo setStep={setStep} />
      ) : step === 3 ? (
        <StepThree setStep={setStep} />
      ) : step === 4 ? (
        <StepFour setStep={setStep} />
      ) : null}
    </form>
  );
};

export default SignUpForm;
