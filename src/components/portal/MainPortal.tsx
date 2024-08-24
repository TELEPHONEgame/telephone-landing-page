import React from "react";

import Header from "../common/Header";
import ProgressBar from "../common/ProgressBar";

const MainPortal = ({
  step,
  setStep,
}) => {
  return (
    <div className={`main_section ${step === 5 ? "final_card" : ""}`}>
    <Header
        displayFaq={null}
        setDisplayFaq={null}
        step={step}
    />
    <ProgressBar step={step} totalSteps={2} setStep={setStep} setJoined={() => {}} />
    </div>
  );
};

export default MainPortal;
