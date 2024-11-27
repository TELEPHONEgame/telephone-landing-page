import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "../../styles/mainSection.css";

type Props = {
  step: number;
  totalSteps: number;
  setStep: (currentStep: number) => void;
  setJoined: (joined: boolean) => void;
};

const ProgressBar = ({ step, totalSteps, setStep }: Props) => {
  const navigate = useNavigate();

  const handleStepBack = () => {
    if (step !== 1) {
      setStep(step - 1);
    } else if (step === 1) {
      navigate("/");
    }
  };

  return (
    <div className="stepper">
      <FaArrowLeft
        onClick={() => handleStepBack()}
        className="stepper_back_button"
      />

      <div className="progress_bar_box">
        <div
          className="progress_bar"
          style={{ width: `${step * (100 / totalSteps)}%`, color: "#0A0C0E" }}
        />
      </div>
      <span className="span_progress">{`${step}/${totalSteps}`}</span>
    </div>
  );
};

export default ProgressBar;
