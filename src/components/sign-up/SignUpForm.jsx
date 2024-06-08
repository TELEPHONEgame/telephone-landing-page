import React, { useState } from "react";
import StepOne from "./StepOne"
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import FinalCard from "./FinalCard";

const SignUpForm = ({ step, setStep }) => {
  const [inputFields, setInputFields] = useState({
    email: "",
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    hometown: "",
    artForm: "",
    abstract: 0,
    samples: [
      { name: "Sample 1", file: null, mediaLink: "" },
      { name: "Sample 2", file: null, mediaLink: "" },
      { name: "Sample 3", file: null, mediaLink: "" },
    ] 
  });
  console.log("SignupForm inputFields----", inputFields);

  return (
    <form className="sign_up_form">
      {step === 1 ? (
        <StepOne
          setStep={setStep}
          inputFields={inputFields}
          setInputFields={setInputFields}
        />
      ) : step === 2 ? (
        <StepTwo
          setStep={setStep}
          inputFields={inputFields}
          setInputFields={setInputFields}
        />
      ) : step === 3 ? (
        <StepThree
          setStep={setStep}
          inputFields={inputFields}
          setInputFields={setInputFields}
        />
      ) : step === 4 ? (
        <StepFour
          setStep={setStep}
          inputFields={inputFields}
          setInputFields={setInputFields}
        />
      ) : step === 5 ? (
        <FinalCard />
      ) : null}
    </form>
  );
};

export default SignUpForm;
