import { useFormContext } from "react-hook-form";
import "../../styles/stepThree.css";
import React from "react";
import ArtFormBtn from "./ArtFormBtn";

import { ArtForm, SignUpFormType } from "./types";
import { ErrorMessage } from "../ErrorMessage";

type Props = {
  setStep: (step: number) => void;
};

const StepThree = ({ setStep }: Props) => {
  const {
    register,
    watch,
    formState: { errors },
    trigger,
  } = useFormContext<SignUpFormType>();
  const artFormList = Object.values(ArtForm);
  // const { errors } = formState;

  const abstractVal = parseInt(watch("abstract"));
  return (
    <>
      <div
        className="fields_box"
        style={{ justifyContent: "flex-start", height: "100%", padding: "0" }}
      >
        <section className="field_header">
          <label htmlFor="abstract" className="input_label question_label">
            <h1>How abstract is your art?</h1>
          </label>
          <p>Take your best guess.</p>
          <article>
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
        </section>

        <article className="art_mediums">
          <label htmlFor="art form" className="input_label">
            What form does your art take? What art form is closest to what you
            do?
          </label>
          <input
            {...register("artForm", {
              required: "An art form is required",
            })}
            hidden
          />

          <div className="art_form_box">
            {artFormList.map((artForm) => (
              <ArtFormBtn key={artForm} name={artForm} />
            ))}
          </div>
          {errors.artForm && <ErrorMessage message={errors.artForm.message} />}
        </article>
      </div>

      <div className="next_btn_box">
        <button
          className="main_btn"
          type="button"
          onClick={async () => {
            const isValid = await trigger(["artForm"]);
            if (isValid) setStep(4);
          }}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default StepThree;
