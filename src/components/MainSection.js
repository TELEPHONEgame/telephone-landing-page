import React, { useEffect, useState } from "react";
import { TbWorld } from "react-icons/tb";
import SignUpForm from "./SignUpForm";

// import { FaSquareFull } from "react-icons/fa";
// import { FaRegSquareFull } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa";

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

  console.log("MainSection----");
  let progress;

  // useEffect(() => {
  //   if (step === 1) {
  //     progress = "1/4";
  //   } else if (step === 2) {
  //     progress = "2/4";
  //   } else if (step === 3) {
  //     progress = "3/4";
  //   } else if (step === 4) {
  //     progress = "4/4";
  //   }
  // }, [step]);
  // console.log("Progressss---", progress)

  return (
    <section className="main_section">
      {joined === false ? (
        renderInitialScreen()
      ) : (
        <div>
          <div className="stepper">
            <FaArrowLeft />
            <div class="progress_bar_box">
              <div
                class="progress_bar"
                style={{ height: "3px", width: "25%" }}
              ></div>
            </div>
            <span className="span_progress">{`${'1'}/4`}</span>
          </div>

          <SignUpForm step={step} setStep={setStep} />
        </div>
      )}
    </section>
  );
};

export default MainSection;
