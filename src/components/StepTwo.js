import React from "react";
// import Papa from "papaparse";
// import Countries from "../files/Countries.csv";
import { list } from "../files/countries";

const StepTwo = ({ setStep, inputFields, setInputFields }) => {
  // Papa.parse(file, config);
  // const csv = Papa.unparse(data[config]);
  // Parse local CSV file
  // Papa.parse(Countries, {
  //   complete: function (results) {
  //     console.log("Finished:", results.data);
  //   },
  // });
  // get headers
  // const headers = Countries[0].split(",");
  // let result = Papa.parse(Countries, {
  //   delimiter: ",",
  //   // header: headers,
  //   // dynamicTyping: true,
  //   header: true,
  //   // complete: onFileParsed
  // });
  // console.log("Result:", result);

  const parseCountryList = () => {
    console.log("list-", list);
    return list
      .split("\n")
      .map((elem) => elem.split(", "))
      .map((elem) => elem.split(","));
  };

  const countryList = parseCountryList();
  console.log("countryList---", countryList);

  return (
    <div className="fields_box">
      <label htmlFor="country" className="input_label first_label">
        Country
      </label>
      <select
        className="form_input"
        id="country"
        placeholder="Country"
        // value={age}
        onChange={(event) => {
          console.log("event--", event.target);
          // setAge(event.target.value);
        }}
        required
      >
        {/* <option value="english">English (Default)</option> */}
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
        // value={age}
        onChange={(e) => {
          console.log("e--", e.target);
          setInputFields({ ...inputFields, [e.target.name]: e.target.value });
        }}
        required
      >
        {/* <option value="english">English (Default)</option> */}
      </input>

      <label htmlFor="art form" className="input_label">
        What form does your art take? What art form is closest to what you do?
      </label>

      <div className="next_btn_box">
        <button className="main_btn next_btn" onClick={() => setStep(3)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default StepTwo;
