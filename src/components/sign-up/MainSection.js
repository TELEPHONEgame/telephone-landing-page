import React, { useEffect, useState } from "react";
import { TbWorld } from "react-icons/tb";
import SignUpForm from "./SignUpForm";
import ProgressBar from "./ProgressBar.tsx";

// import { FaSquareFull } from "react-icons/fa";
// import { FaRegSquareFull } from "react-icons/fa6";

const MainSection = ({ joined, setJoined }) => {
  const [step, setStep] = useState(1);

  const renderInitialScreen = () => {
    return (
      <div className="main_section_box">
        <div className="message">
          A message changing forms as it travels across the world{" "}
          <span>
            <TbWorld />
          </span>
          from artist → artist.
        </div>
        <div className="landing_page_animation">
          <img
            src="animHolder.png"
            alt="telephone-animation"
            width="350"
            height="500"
          />
        </div>
        <div>
          <button className="main_btn btn_white">How do I play?</button>
          <button className="main_btn" onClick={() => setJoined(true)}>
            Join
          </button>
        </div>
      </div>
    );
  };

  // console.log("MainSection----");
  return (
    <section className="main_section">
      {joined === false ? (
        renderInitialScreen()
      ) : (
        <>
          {step === 5 ? null : <ProgressBar step={step} />}

          <SignUpForm step={step} setStep={setStep} />
        </>
      )}
    </section>
  );
};

export default MainSection;
