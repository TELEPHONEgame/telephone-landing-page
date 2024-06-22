import React from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
// import FinalCard from "./FinalCard";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { SignUpFormType } from "./types";

const SignUpForm = ({ step, setStep }) => {
  const formMethods = useForm<SignUpFormType>({
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
        { name: "Sample 1", file: null, mediaLink: "" },
        { name: "Sample 2", file: null, mediaLink: "" },
        { name: "Sample 3", file: null, mediaLink: "" },
      ],
    },
    mode: "onTouched",
  });
  const csrfcookie = function () {
    // for django csrf protection
    let cookieValue = "",
      name = "csrftoken";
    if (document.cookie && document.cookie !== "") {
      let cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) == name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  const submitForm: SubmitHandler<SignUpFormType> = (values) => {
    let csrf_token = csrfcookie();
    // console.log("token: " + csrf_token);

    // this needs to updated with the new form

    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("first_name", values.firstName);
    formData.append("last_name", values.lastName);
    formData.append("country", values.country);
    formData.append("city", values.city);
    formData.append("art_form", values.artForm.substring(0, 2).toUpperCase());
    formData.append("abstractness", values.abstract);
    // i want to check if we have a file then we append the
    const validatedSamples = values.samples.forEach((sample, i) => {
      sample.file
        ? formData.append(`file_${i + 1}`, sample.file)
        : formData.append(`link_${i + 1}`, sample.mediaLink);
    });

    // formData.append("link_1", values.samples[0].mediaLink);

    // formData.append("file_1", values.samples[0].file);
    // formData.append("link_2", values.samples[1].mediaLink);
    // formData.append("file_2", values.samples[1].file);
    // formData.append("link_3", values.samples[2].mediaLink);
    // formData.append("file_3", values.samples[2].file);

    console.log("FROM SUBMIT", { formData, validatedSamples });
    fetch("/", {
      method: "POST",
      headers: {
        "X-CSRFToken": csrf_token,
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("success... data--", data);
      })
      .catch((error) => {
        console.log(error);
        var alert_text = "Failed. Contact an administrator.";
        alert(alert_text);
      });

    setStep(5);
  };

  return (
    <FormProvider {...formMethods}>
      <form
        className="sign_up_form"
        onSubmit={formMethods.handleSubmit(submitForm)}
      >
        {step === 1 ? (
          <StepOne setStep={setStep} />
        ) : step === 2 ? (
          <StepTwo setStep={setStep} />
        ) : step === 3 ? (
          <StepThree setStep={setStep} />
        ) : step === 4 ? (
          <StepFour setStep={setStep} />
        ) 
        // : step === 5 ? (
        //   <FinalCard displayFaq={displayFaq} setDisplayFaq={setDisplayFaq} />
        // ) 
        : null}
      </form>
    </FormProvider>
  );
};

export default SignUpForm;
