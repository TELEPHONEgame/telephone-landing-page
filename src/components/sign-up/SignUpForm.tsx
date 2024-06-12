import React, { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import FinalCard from "./FinalCard";
import { FormProvider, useForm } from "react-hook-form";

const SignUpForm = ({ step, setStep }) => {
  const formMethods = useForm({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      country: "",
      city: "",
      hometown: "",
      artForm: "",
      abstract: "0",
      samples: [
        { name: "Sample 1", file: "", mediaLink: "", error: "" },
        { name: "Sample 2", file: "", mediaLink: "", error: "" },
        { name: "Sample 3", file: "", mediaLink: "", error: "" },
      ],
    },
    mode: "onTouched",
  });
  // const [inputFields, setInputFields] = useState<SignUpFormType>({
  // email: "",
  //   firstName: "",
  //   lastName: "",
  //   country: "",
  //   city: "",
  //   hometown: "",
  //   artForm: "",
  //   abstract: "",
  //   samples: [
  //     { name: "Sample 1", file: "", mediaLink: "", error: "" },
  //     { name: "Sample 2", file: "", mediaLink: "", error: "" },
  //     { name: "Sample 3", file: "", mediaLink: "", error: "" },
  //   ],
  // });

  return (
    <FormProvider {...formMethods}>
      <form className="sign_up_form">
        {step === 1 ? (
          <StepOne setStep={setStep} />
        ) : step === 2 ? (
          <StepTwo setStep={setStep} />
        ) : step === 3 ? (
          <StepThree setStep={setStep} />
        ) : step === 4 ? (
          <StepFour setStep={setStep} />
        ) : step === 5 ? (
          <FinalCard />
        ) : null}
      </form>
    </FormProvider>
  );
};

export default SignUpForm;
