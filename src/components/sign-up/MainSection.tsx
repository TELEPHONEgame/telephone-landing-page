import React, {useState} from "react";

import Header from "../common/Header";
import SignUpForm from "./SignUpForm";
import ProgressBar from "../common/ProgressBar";
import FinalCard from "./FinalCard";

const MainSection = () => {
  const [joined, setJoined] = useState(false);
  const [step, setStep] = useState<number>(1);

  return (
    <div className={`main_section ${step === 5 ? "final_card" : ""}`}>
      {step === 5 ? null : (
        <ProgressBar step={step} totalSteps={4} setStep={setStep} setJoined={setJoined} />
      )}

      {step === 5 ? (
        <FinalCard
          step={step}
        />
      ) : (
        <SignUpForm step={step} setStep={setStep} />
      )}
    </div>
  );
};

export default MainSection;
