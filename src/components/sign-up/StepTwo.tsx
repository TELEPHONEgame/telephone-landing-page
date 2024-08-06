import React, { useEffect, useRef, useState } from "react";

import { list } from "../../files/countries";
import { useFormContext } from "react-hook-form";
import { SignUpFormType } from "./types";
import { ErrorMessage } from "../ErrorMessage";
import "../../styles/stepTwo.css";
import { notification, Button, Space, Switch } from "antd";

type Props = {
  setStep: (step: number) => void;
};

const StepTwo = ({ setStep }: Props) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const addressResponseRef = useRef<HTMLDivElement>(null);
  const rawCityRef = useRef<HTMLInputElement>(null);
  const latRef = useRef<HTMLInputElement>(null);
  const longRef = useRef<HTMLInputElement>(null);
  const homeMapRef = useRef<HTMLDivElement>(null);
  const homeAddressResponseRef = useRef<HTMLDivElement>(null);
  const rawHomeCityRef = useRef<HTMLInputElement>(null);
  const homeLatRef = useRef<HTMLInputElement>(null);
  const homeLongRef = useRef<HTMLInputElement>(null);
  const { register, formState, trigger, getValues, setValue, setFocus } =
    useFormContext<SignUpFormType>();
  const { errors } = formState;

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
  let homeMap: google.maps.Map;
  let geocoder: google.maps.Geocoder;
  let marker: google.maps.Marker;
  let homeMarker: google.maps.Marker;

  const countryList = parseCountryList();
  const [api, contextHolder] = notification.useNotification();
  const [additionalLocation, setAdditionalLocation] = useState(false);

  useEffect(() => {
    initMaps();
  }, [mapRef, homeMapRef]);

  function initMaps() {
    if (!map && mapRef.current) {
      map = new google.maps.Map(mapRef.current, {
        zoom: 8,
        mapTypeControl: false,
      });
    }
    if (!homeMap && homeMapRef.current) {
      homeMap = new google.maps.Map(homeMapRef.current, {
        zoom: 8,
        mapTypeControl: false,
      });
    }
    if (!geocoder) {
      geocoder = new google.maps.Geocoder();
    }
    if (!marker) {
      marker = new google.maps.Marker({ map: map });
    }
    if (!homeMarker) {
      homeMarker = new google.maps.Marker({ map: homeMap });
    }
  }

  function openNotification(
    city: string,
    field,
    fieldRef: React.RefObject<HTMLInputElement>,
    label: string
  ) {
    const key = `open${field}${Date.now()}`;
    const cityValue = fieldRef.current?.value;
    const btn = (
      <Space>
        <Button
          type="primary"
          size="small"
          onClick={() => {
            api.destroy(key);
            setValue(field, city);
            fieldRef.current!.value = city;
            handleSubmit();
          }}
        >
          Yes, Accept Correction
        </Button>
        <Button
          type="primary"
          size="small"
          onClick={() => {
            api.destroy();
            setFocus(field);
          }}
        >
          No, Re-Enter
        </Button>
      </Space>
    );
    api.open({
      message: "Confirm " + label,
      description:
        'You have entered: "' +
        cityValue +
        '". We have found it as "' +
        city +
        '". Is this correct?',
      btn,
      key,
      duration: null,
      placement: "top",
    });
  }

  function geocode(
    request,
    thisMap: google.maps.Map,
    thisMarker,
    responseRef,
    latField,
    longField
  ) {
    initMaps();
    responseRef.current!.innerText = "";
    geocoder
      .geocode(request)
      .then((result) => {
        const { results } = result;

        if (thisMap) thisMap.setCenter(results[0].geometry.location);
        thisMarker.setPosition(results[0].geometry.location);
        thisMarker.setMap(thisMap);
        if (addressResponseRef.current) {
          responseRef.current.style.display = "block";
          responseRef.current.innerText = results[0].formatted_address;
          latField.current!.value = results[0].geometry.location
            .lat()
            .toString();
          longField.current!.value = results[0].geometry.location
            .lng()
            .toString();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function lookupCity(
    city,
    countryField,
    thisMap,
    thisMarker,
    responseRef,
    latField,
    longField
  ) {
    if (city) {
      const country = getValues(countryField);
      let address = city + ", " + country;
      geocode(
        { address: address },
        thisMap,
        thisMarker,
        responseRef,
        latField,
        longField
      );
    }
  }

  const handleSubmit = async () => {
    if (
      addressResponseRef.current!.innerText != rawCityRef.current?.value &&
      addressResponseRef.current!.innerText != ""
    ) {
      openNotification(
        addressResponseRef.current!.innerText,
        "city",
        rawCityRef,
        "City"
      );
      return;
    }
    if (
      homeAddressResponseRef.current?.innerText != rawHomeCityRef.current?.value
      // homeAddressResponseRef.current!.innerText != ""
    ) {
      openNotification(
        homeAddressResponseRef.current!.innerText,
        "home_city",
        rawHomeCityRef,
        "Home City"
      );
      return;
    }
    handleNextStep();
  };
  const optionalFields =
    rawHomeCityRef.current && homeLatRef.current && homeLongRef.current;

  const handleNextStep = async () => {
    setValue("city", rawCityRef.current!.value);
    setValue("city_lat", Number(latRef.current!.value));
    setValue("city_long", Number(longRef.current!.value));

    if (optionalFields) {
      setValue("home_city", rawHomeCityRef.current.value);
      setValue("home_city_lat", Number(homeLatRef.current.value));
      setValue("home_city_long", Number(homeLongRef.current.value));
    }

    console.log("GETTING VALUES FROM SUB", getValues());
    const hasValidInputs = await trigger(["country", "city"]);
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
            onChange={(e) => {
              if (rawCityRef.current?.value) {
                lookupCity(
                  rawCityRef.current?.value,
                  "country",
                  map,
                  marker,
                  addressResponseRef,
                  latRef,
                  longRef
                );
              }
            }}
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
            onKeyUp={(e) => {
              lookupCity(
                (e.target as HTMLInputElement).value,
                "country",
                map,
                marker,
                addressResponseRef,
                latRef,
                longRef
              );
            }}
            onChange={(e) => {
              setValue("city", (e.target as HTMLInputElement).value);
              rawCityRef.current!.value = (e.target as HTMLInputElement).value;
              lookupCity(
                (e.target as HTMLInputElement).value,
                "country",
                map,
                marker,
                addressResponseRef,
                latRef,
                longRef
              );
            }}
          />
          {errors.city && <ErrorMessage message={errors.city.message} />}

          <div
            id="addressResponse"
            ref={addressResponseRef}
            style={{ height: "fit-content" }}
          />
          <div
            id="map"
            ref={mapRef}
            style={{
              height: "clamp(50px, 12vh, 250px)",
              marginBottom: "1rem",
            }}
          />
          {contextHolder}
          <input type="hidden" ref={rawCityRef} />
          <input type="hidden" ref={latRef} />
          <input type="hidden" ref={longRef} />
          <Button
            size="middle"
            onClick={() => setAdditionalLocation(!additionalLocation)}
          >
            {additionalLocation ? "Cancel" : "Add a home country and home city"}
          </Button>

          {additionalLocation && (
            <>
              <section className="artist_home">
                <label
                  htmlFor="home_country"
                  className="input_label first_label"
                >
                  Home Country
                </label>
                <select
                  className="form_input"
                  id="home_country"
                  {...register("home_country", { required: false })}
                  onChange={(e) => {
                    if (rawHomeCityRef.current?.value) {
                      lookupCity(
                        rawHomeCityRef.current?.value,
                        "home_country",
                        homeMap,
                        homeMarker,
                        homeAddressResponseRef,
                        homeLatRef,
                        homeLongRef
                      );
                    }
                  }}
                >
                  <option value={""}>Country</option>
                  {countryList.map((elem) => (
                    <option key={`${elem[0]}+${elem[1]}`} value={elem[1]}>
                      {elem[1]}
                    </option>
                  ))}
                </select>

                {errors.home_country && (
                  <ErrorMessage message={errors.home_country.message} />
                )}

                <label htmlFor="home_city" className="input_label">
                  City
                </label>

                <input
                  className="form_input"
                  type="text"
                  id="home_city"
                  placeholder="City"
                  {...register("home_city", { required: false })}
                  onKeyUp={(e) => {
                    lookupCity(
                      (e.target as HTMLInputElement).value,
                      "home_country",
                      homeMap,
                      homeMarker,
                      homeAddressResponseRef,
                      homeLatRef,
                      homeLongRef
                    );
                  }}
                  onChange={(e) => {
                    setValue("home_city", (e.target as HTMLInputElement).value);
                    rawHomeCityRef.current!.value = (
                      e.target as HTMLInputElement
                    ).value;
                    lookupCity(
                      (e.target as HTMLInputElement).value,
                      "home_country",
                      homeMap,
                      homeMarker,
                      homeAddressResponseRef,
                      homeLatRef,
                      homeLongRef
                    );
                  }}
                />

                {errors.home_city && (
                  <ErrorMessage message={errors.home_city.message} />
                )}

                <div
                  id="homeAddressResponse"
                  ref={homeAddressResponseRef}
                  style={{ height: "fit-content" }}
                />
                <div
                  id="home_map"
                  ref={homeMapRef}
                  style={{ height: "clamp(50px, 12vh, 250px)" }}
                  hidden
                />
                <input type="hidden" ref={rawHomeCityRef} />
                <input type="hidden" ref={homeLatRef} />
                <input type="hidden" ref={homeLongRef} />
              </section>
            </>
          )}
        </section>
      </div>

      <div className="next_btn_box">
        <button className="main_btn" type="button" onClick={handleSubmit}>
          Next
        </button>
      </div>
    </>
  );
};

export default StepTwo;
