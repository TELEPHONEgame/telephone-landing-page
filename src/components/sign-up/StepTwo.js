import React from "react";
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
          value={inputFields.country}
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
          value={inputFields.city}
          onChange={(e) => {
            setInputFields({ ...inputFields, [e.target.name]: e.target.value });
          }}
          required
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
          value={inputFields.hometown}
          onChange={(e) => {
            setInputFields({ ...inputFields, [e.target.name]: e.target.value });
          }}
        ></input>

        <label htmlFor="art form" className="input_label">
          What form does your art take? What art form is closest to what you do?
        </label>
        <div className="art_form_box">
          <button
            className="art_form_btn"
            name="Drawing"
            onClick={(e) =>
              setInputFields({
                ...inputFields,
                artForm: e.target.name,
              })
            }
          >
            Drawing
          </button>
          <button
            className="art_form_btn"
            name="Film"
            onClick={(e) =>
              setInputFields({
                ...inputFields,
                artForm: e.target.name,
              })
            }
          >
            Film
          </button>
          <button
            className="art_form_btn"
            name="Music"
            onClick={(e) =>
              setInputFields({
                ...inputFields,
                artForm: e.target.name,
              })
            }
          >
            Music
          </button>
          <button
            className="art_form_btn"
            name="Literature"
            onClick={(e) =>
              setInputFields({
                ...inputFields,
                artForm: e.target.name,
              })
            }
          >
            Literature
          </button>
          <button
            className="art_form_btn"
            name="Painting"
            onClick={(e) =>
              setInputFields({
                ...inputFields,
                artForm: e.target.name,
              })
            }
          >
            Painting
          </button>
          <button
            className="art_form_btn"
            name="Dance"
            onClick={(e) =>
              setInputFields({
                ...inputFields,
                artForm: e.target.name,
              })
            }
          >
            Dance
          </button>
          <button
            className="art_form_btn"
            name="Film"
            onClick={(e) =>
              setInputFields({
                ...inputFields,
                artForm: e.target.name,
              })
            }
          >
            Film
          </button>
        </div>
      </div>

      <div className="next_btn_box">
        <button className="main_btn next_btn" onClick={() => setStep(3)}>
          Next
        </button>
      </div>
    </>
  );
};

export default StepTwo;
