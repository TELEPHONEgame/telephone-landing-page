import React from "react";
import { FileUploadInput } from "./FileUploadInput";
import "../../styles/stepFour.css";
import { SignUpFormType } from "./types";
import { useFormContext } from "react-hook-form";

type Props = {
  setStep: (step: number) => void;
};
// need a validation for file type

const StepFour = ({ setStep }: Props) => {
  const {
    formState: { errors },
  } = useFormContext<SignUpFormType>();

  return (
    <>
      <div className="fields_box">
        <label htmlFor="" className="input_label question_label">
          Can we see?
        </label>
        <section className="files_upload_group">
          {[0, 1, 2].map((sample, i) => (
            <FileUploadInput key={`sample_${sample}${i}`} sampleId={sample} />
          ))}
        </section>
      </div>

      <div className="next_btn_box">
        <button className="main_btn" type="submit">
          Apply
        </button>
      </div>
    </>
  );
};

export default StepFour;
