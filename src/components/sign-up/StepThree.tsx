import { useFormContext } from "react-hook-form";
import "../../styles/stepThree.css";
import React from "react";
import { SignUpFormType } from "./types";
type Props = {
  setStep: (step: number) => void;
};

const StepThree = ({ setStep }: Props) => {
  const { register, watch } = useFormContext<SignUpFormType>();

  const abstractVal = parseInt(watch("abstract"));
  return (
    <>
      <div className="fields_box" style={{ justifyContent: "flex-start" }}>
        <section className="field_header">
          <label htmlFor="abstract" className="input_label question_label">
            <h1>How abstract is your art?</h1>
          </label>
          <p>Take your best guess, no need to stress it.</p>
        </section>

        <article style={{ paddingTop: "3rem" }}>
          <span className="abstract_amount">{abstractVal}</span>

          <input
            type="range"
            id="abstract"
            className="abstract_meter"
            min="0"
            max="10"
            // necessary inorder to style the track based on the amount
            style={{
              background: `linear-gradient(to right, #0A0C0E ${
                abstractVal * 10
              }%, #D9D9D9 ${abstractVal * 10}%)`,
            }}
            {...register("abstract", {
              required: "Abstract level is required",
              min: 0,
              max: 10,
            })}
          />
          <section className="abstract_level">
            <p>Not at all</p>
            <p>Really abstract</p>
          </section>
        </article>
      </div>
      <button className="main_btn" onClick={() => setStep(4)}>
        Next
      </button>
    </>
  );
};

export default StepThree;
