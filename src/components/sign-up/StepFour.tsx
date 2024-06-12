import React from "react";
import { FileUploadInput } from "./FileUploadInput.tsx";
import "../../styles/stepFour.css";
import { SignUpFormType } from "./types.ts";
import { useFormContext } from "react-hook-form";

type Props = {
  setStep: (step: number) => void;
};
// need a validation for file type

const StepFour = ({ setStep }: Props) => {
  const {
    formState: { errors },
  } = useFormContext<SignUpFormType>();

  let csrfcookie = function () {
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

  const submitForm = () => {
    // post req
    let csrf_token = csrfcookie();
    // console.log("token: " + csrf_token);

    // this needs to updated with the new form
    const formData = new FormData();
    // formData.append("email", inputFields["email"]);
    // formData.append("first_name", inputFields["firstName"]);
    // formData.append("last_name", inputFields["lastName"]);
    // formData.append("country", inputFields["country"]);
    // formData.append("city", inputFields["city"]);
    // formData.append(
    //   "art_form",
    //   inputFields["artForm"].substring(0, 2).toUpperCase()
    // );
    // formData.append("abstractness", inputFields["abstract"]);
    // formData.append("link_1", inputFields["samples"][0]["mediaLink"]);
    // formData.append("file_1", inputFields["samples"][0]["file"]);
    // formData.append("link_2", inputFields["samples"][1]["mediaLink"]);
    // formData.append("file_2", inputFields["samples"][1]["file"]);
    // formData.append("link_3", inputFields["samples"][2]["mediaLink"]);
    // formData.append("file_3", inputFields["samples"][2]["file"]);

    fetch("/", {
      method: "POST",
      headers: {
        "X-CSRFToken": csrf_token,
      },
      body: formData,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        console.log("success... data--", data);
      })
      .catch(error => {
        console.log(error);
        var alert_text = "Failed. Contact an administrator.";
        alert(alert_text);
      });

    setStep(5);
  };

  return (
    <>
      <div className="fields_box">
        <label htmlFor="" className="input_label question_label">
          Can we see?
        </label>
        <section className="files_upload_group">
          {[0, 1, 2].map((sample, i) => {
            return (
              <FileUploadInput key={`sample_${sample}${i}`} sampleId={sample} />
            );
          })}
        </section>
      </div>

      <div className="next_btn_box">
        <button className="main_btn" onClick={submitForm}>
          Apply
        </button>
      </div>
    </>
  );
};

export default StepFour;
