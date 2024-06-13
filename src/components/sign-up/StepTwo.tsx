import React, { useEffect, useRef, useState } from "react";

import ArtFormBtn from "./ArtFormBtn";
import { list } from "../../files/countries";
import "../../styles/stepTwo.css";
import { useFormContext } from "react-hook-form";
import { ArtForm, SignUpFormType } from "./types";
import { ErrorMessage } from "../ErrorMessage";

import { notification, Button, Space } from "antd";

type Props = {
  setStep: (step: number) => void;
};

const StepTwo = ({ setStep }: Props) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const addressResponseRef = useRef<HTMLDivElement>(null);
  const { register, formState, trigger, getValues, setValue } =
    useFormContext<SignUpFormType>();
  const { errors } = formState;
  const [citySelection, setCitySelection] = useState("");
  console.log("citySelection--", citySelection);

  const parseCountryList = () => {
    const arrList = list.split("\n").map((elem) => elem.split(", "));
    const newArrList = arrList.map((elem) => {
      const newElem = elem[0].split(",");
      newElem.pop();
      return newElem;
    });
    newArrList.sort((a, b) =>
      a[1].toUpperCase().localeCompare(b[1].toUpperCase())
    );
    return newArrList;
  };

  let map: google.maps.Map;
  let geocoder: google.maps.Geocoder;
  let marker: google.maps.Marker;
  let responseDiv;
  let response;

  const countryList = parseCountryList();
  const artFormList = Object.values(ArtForm);

  useEffect(() => {
    if (mapRef.current) {
      map = new google.maps.Map(mapRef.current, {
        zoom: 8,
        //center: { lat: -34.397, lng: 150.644 },
        mapTypeControl: false,
      });
      geocoder = new google.maps.Geocoder();
      responseDiv = addressResponseRef.current;
    }
  }, [mapRef]);

  const [api, contextHolder] = notification.useNotification();
  const setCityValue = () => {
    var city = addressResponseRef.current!.innerText
    setValue("city", city);
    const cityInput = document.getElementById("city") as HTMLInputElement;
    if (cityInput) {
      cityInput.value = city;
    }
  };

  const openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Space>
        <Button type="primary" size="small" onClick={() => api.destroy()}>
          Not correct
        </Button>
        <Button
          type="primary"
          size="small"
          onClick={() => {
            setCityValue();
            api.destroy(key);
          }}
        >
          Confirm
        </Button>
      </Space>
    );
    api.open({
      message: "Please confirm",
      description: "Is this city correct? " + addressResponseRef.current!.innerText,
      btn,
      key,
      // onClose: close,
      placement: "top",
      // type: 'info',
    });
  };

  function clear() {
    //marker.setMap(null);
    //responseDiv.style.display = "none";
    addressResponseRef.current!.innerText = "";
  }

  function geocode(request) {
    clear();
    if (!map && mapRef.current) {
      map = new google.maps.Map(mapRef.current, {
        zoom: 8,
        mapTypeControl: false,
      });
    }
    if (!geocoder) {
      geocoder = new google.maps.Geocoder();
    }
    if (!marker) {
      marker = new google.maps.Marker({ map });
    }
    geocoder
      .geocode(request)
      .then((result) => {
        const { results } = result;

        if (map) map.setCenter(results[0].geometry.location);
        marker.setPosition(results[0].geometry.location);
        marker.setMap(map);
        if (addressResponseRef.current) {
          addressResponseRef.current.style.display = "block";
          addressResponseRef.current.innerText = results[0].formatted_address;
        }

        if (results[0].formatted_address != request.address) {
          const msg = results[0].formatted_address;
          setCitySelection(msg);
          openNotification();
          // if (confirm("Is this correct? " + results[0].formatted_address)) {
          //   setValue("city", results[0].formatted_address);
          // }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function lookupCity(city) {
    if (city) {
      const country = getValues("country");
      let address = city + ", " + country;
      let results = geocode({ address: address });
    }
  }

  const handleNextStep = async (e) => {
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
            {countryList.map((elem) => (
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
            onBlur={(e) => {
              lookupCity(e.target.value);
            }}
          />
          {errors.city && <ErrorMessage message={errors.city.message} />}

          <div id="addressResponse" ref={addressResponseRef} />
          <div id="map" ref={mapRef} style={{ height: "200px" }} />
          {contextHolder}

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
            {artFormList.map((artForm) => (
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
