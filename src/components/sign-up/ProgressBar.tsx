import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import "../../styles/mainSection.css";

type Props = {
  step: number;
};

const ProgressBar = ({ step, setStep, setJoined }: Props) => {
  console.log("Step---", step);
  const handleStepBack = () => {
    if (step !== 1) {
      setStep(step - 1);
    } else if (step === 1) {
      setJoined(false);
    }
  };

  return (
    <div className="stepper">
      <FaArrowLeft
        style={{ height: "4vw", width: "4vw" }}
        onClick={() => handleStepBack()}
      />
      <div className="progress_bar_box">
        <div
          className="progress_bar"
          style={{ width: `${step * 25}%`, color: "#0A0C0E" }}
        />
      </div>
      <span className="span_progress">{`${step}/4`}</span>
    </div>
  );
};

export default ProgressBar;
