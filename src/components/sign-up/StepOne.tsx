import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { SignUpFormType } from "./types";
import { ErrorMessage } from "../ErrorMessage";

type Props = {
  setStep: (step: number) => void;
};

const StepOne = ({ setStep }: Props) => {
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext<SignUpFormType>();
  // where to add setDisableNextBtn(false); to handle Next button styles
  // const [disableNextBtn, setDisableNextBtn] = useState(true)

  const validateEmail = (email: string) => {
    const isValidEmail = email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    return !!isValidEmail || "Please use a valid email";
  };

  const handleNext = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const isValidInputs = await trigger(["email", "firstName", "lastName"]);
    if (isValidInputs) setStep(2);
  };

  return (
    <>
      <div className="fields_box overflow_hidden">
        <label htmlFor="email" className="input_label first_label">
          Email
        </label>
        <input
          className="form_input"
          id="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            validate: value => validateEmail(value),
          })}
        />
        {errors.email && <ErrorMessage message={errors.email.message} />}
        <label htmlFor="firstName" className="input_label">
          First name
        </label>
        <input
          className="form_input"
          type="text"
          id="firstName"
          placeholder="First name"
          {...register("firstName", {
            required: "First name is required",
            minLength: 2,
          })}
        />
        {errors.firstName && (
          <ErrorMessage message={errors.firstName.message} />
        )}
        <label htmlFor="lastName" className="input_label">
          Last name
        </label>
        <input
          className="form_input"
          type="text"
          id="lastName"
          placeholder="Last name"
          {...register("lastName", {
            required: "Last name is required",
            minLength: 2,
          })}
        />
        {errors.lastName && <ErrorMessage message={errors.lastName.message} />}
      </div>
      <div className="next_btn_box">
        <button
          type="button"
          // className={`main_btn next_btn ${disableNextBtn ? 'btn_disabled' : ''}`}
          className= "main_btn next_btn"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default StepOne;
