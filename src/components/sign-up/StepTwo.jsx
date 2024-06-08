import React from "react";

import ArtFormBtn from "./ArtFormBtn";
import { list } from "../../files/countries";
import "../../styles/stepTwo.css";

const StepTwo = ({ setStep, inputFields, setInputFields }) => {
  const parseCountryList = () => {
    const arrList = list.split("\n").map((elem) => elem.split(", "));
    const newArrList = arrList.map((elem) => {
      const newElem = elem[0].split(",");
      newElem.pop();
      return newElem;
    });
    return newArrList;
  };

  const countryList = parseCountryList();
  const artFormList = [
    "Drawing",
    "Film",
    "Music",
    "Literature",
    "Painting",
    "Dance",
  ];

  const setNextStep = () => {
    // add validation
    setStep(3);
  };

  return (
    <>
      <div className="fields_box">
        <label htmlFor="country" className="input_label first_label">
          Country
        </label>
        <select
          className="form_input"
          name="country"
          id="country"
          placeholder="Country"
          // value={inputFields.country}
          onChange={(e) => {
            setInputFields({ ...inputFields, [e.target.name]: e.target.value });
          }}
          required
        >
          <option value={null} disabled>
            Country
          </option>
          {countryList.map((elem) => (
            <option key={`${elem[0]}+${elem[1]}`} value={elem[1]}>
              {elem[1]}
            </option>
          ))}
        </select>

        <label htmlFor="city" className="input_label">
          City
        </label>
        <input
          className="form_input"
          type="text"
          id="city"
          name="city"
          placeholder="City"
          // value={inputFields.city}
          onChange={(e) => {
            setInputFields({ ...inputFields, [e.target.name]: e.target.value });
          }}
          // required
        ></input>

        <label htmlFor="hometown" className="input_label">
          Hometown
        </label>
        <input
          className="form_input"
          type="text"
          id="hometown"
          name="hometown"
          placeholder="Hometown (Optional)"
          // value={inputFields.hometown}
          onChange={(e) => {
            setInputFields({ ...inputFields, [e.target.name]: e.target.value });
          }}
        ></input>

        <label htmlFor="art form" className="input_label">
          What form does your art take? What art form is closest to what you do?
        </label>
        <div className="art_form_box">
          {artFormList.map((elem) => (
            <ArtFormBtn
              key={elem}
              name={elem}
              inputFields={inputFields}
              setInputFields={setInputFields}
            />
          ))}
          {/* <button
            className="art_form_btn"
            name={"drawing"}
            onClick={(e) => {
              console.log("artForm e---", e.target.name);
              // e.stopPropagation();
              setInputFields({
                ...inputFields,
                artForm: e.target.name,
              });
            }}
          >
            {"drawing"}
          </button>
          <button
            className="art_form_btn"
            name={"film"}
            onClick={(e) => {
              console.log("artForm e---", e.target.name);
              // e.stopPropagation();
              setInputFields({
                ...inputFields,
                artForm: e.target.name,
              });
            }}
          >
            {"film"}
          </button> */}
        </div>
      </div>

      <div className="next_btn_box">
        <button className="main_btn next_btn" onClick={setNextStep}>
          Next
        </button>
      </div>
    </>
  );
};

export default StepTwo;
