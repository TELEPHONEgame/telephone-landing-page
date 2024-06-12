import React, { useEffect, useRef } from "react";

import ArtFormBtn from "./ArtFormBtn";
import { list } from "../../files/countries";
import "../../styles/stepTwo.css";

const StepTwo = ({ setStep, inputFields, setInputFields }) => {
  const countryRef = useRef();
  const mapRef = useRef();
  const addressResponseRef = useRef();
  const cityRef = useRef();
  const parseCountryList = () => {
    const arrList = list.split("\n").map((elem) => elem.split(", "));
    const newArrList = arrList.map((elem) => {
      const newElem = elem[0].split(",");
      newElem.pop();
      return newElem;
    });
    newArrList.sort((a,b) => a[1].toUpperCase().localeCompare(b[1].toUpperCase()));
    return newArrList;
  };
  let map = null;
  let geocoder = null;
  let marker;
  let responseDiv;
  let response;

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

  useEffect(() => {
    map = new google.maps.Map(mapRef.current, {//document.getElementById("map"), {
      zoom: 8,
      //center: { lat: -34.397, lng: 150.644 },
      mapTypeControl: false,
    });
    geocoder = new google.maps.Geocoder();
    responseDiv = addressResponseRef.current;
  }, []);

  function clear() {
    //marker.setMap(null);
    //responseDiv.style.display = "none";
  }

  function geocode(request) {
    clear();
    if (map == null)
    {
      map = new google.maps.Map(mapRef.current, {//document.getElementById("map"), {
        zoom: 8,
        mapTypeControl: false,
      });
    }
    if (geocoder == null) {
      geocoder = new google.maps.Geocoder();
    }
    if (marker == null) {
      marker = new google.maps.Marker({
        map,
      });
    }
    geocoder
      .geocode(request)
      .then((result) => {
        const { results } = result;

        map.setCenter(results[0].geometry.location);
        marker.setPosition(results[0].geometry.location);
        marker.setMap(map);
        addressResponseRef.current.style.display = "block";
        addressResponseRef.current.innerText = results[0].formatted_address;

        if (results[0].formatted_address != request.address) {
          if (confirm("Is this correct? " + results[0].formatted_address)) {
            cityRef.current.value = results[0].formatted_address;
            setInputFields({ ...inputFields, ["city"]: results[0].formatted_address });
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function lookupCity(city) {
    if (city) {
      const country = inputFields["country"];
      let address = city + ", " + country;
      let results = geocode({ address: address });
    }
  }

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
          ref={countryRef}
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
          ref={cityRef}
          // value={inputFields.city}
          onChange={(e) => {
            setInputFields({ ...inputFields, [e.target.name]: e.target.value });
          }}
          onBlur={(e) => {
            lookupCity(e.target.value);
          }}
          // required
        ></input>

        <div id="addressResponse" ref={addressResponseRef}></div>
        <div id="map" ref={mapRef} style={{height: "200px"}}></div>

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
