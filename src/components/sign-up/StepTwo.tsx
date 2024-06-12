import React from "react";

import ArtFormBtn from "./ArtFormBtn";
import { list } from "../../files/countries";
import "../../styles/stepTwo.css";
import { useFormContext } from "react-hook-form";
import { ArtForm, SignUpFormType } from "./types";
import { ErrorMessage } from "../ErrorMessage";

type Props = {
  setStep: (step: number) => void;
};

const StepTwo = ({ setStep }: Props) => {
  const { register, formState, trigger } = useFormContext<SignUpFormType>();
  const { errors } = formState;

  const parseCountryList = () => {
    const arrList = list.split("\n").map(elem => elem.split(", "));
    const newArrList = arrList.map(elem => {
      const newElem = elem[0].split(",");
      newElem.pop();
      return newElem;
    });
    return newArrList;
  };

  const countryList = parseCountryList();
  const artFormList = Object.values(ArtForm);
  const handleNextStep = async e => {
    const hasValidInputs = await trigger(["country", "city", "artForm"]);
    if (hasValidInputs) setStep(3);
  };
  return (
    <>
      <div className="fields_box">
        <section className="artist_location">
          <label htmlFor="country" className="input_label first_label">
            Country
          </label>
          <select
            className="form_input"
            id="country"
            {...register("country", {
              required: "Country is required",
            })}
          >
            <option value={""} disabled>
              Country
            </option>
            {countryList.map(elem => (
              <option key={`${elem[0]}+${elem[1]}`} value={elem[1]}>
                {elem[1]}
              </option>
            ))}
          </select>
          {errors.country && <ErrorMessage message={errors.country.message} />}
          <label htmlFor="city" className="input_label">
            City
          </label>
          <input
            className="form_input"
            type="text"
            id="city"
            placeholder="City"
            {...register("city", {
              required: "City is required",
            })}
          />
          {errors.city && <ErrorMessage message={errors.city.message} />}

          <label htmlFor="hometown" className="input_label">
            Hometown
          </label>
          <input
            className="form_input"
            type="text"
            id="hometown"
            placeholder="Hometown (Optional)"
            {...register("hometown")}
          />
        </section>
        <div className="art_mediums">
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
            {artFormList.map(artForm => (
              <ArtFormBtn key={artForm} name={artForm} />
            ))}
          </div>
          {errors.artForm && <ErrorMessage message={errors.artForm.message} />}
        </div>
      </div>

      <div className="next_btn_box">
        <button
          className="main_btn next_btn"
          type="button"
          onClick={handleNextStep}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default StepTwo;
