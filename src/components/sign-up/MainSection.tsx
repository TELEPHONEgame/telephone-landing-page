import React, { useEffect, useState } from "react";

import Header from "./Header";
import SignUpForm from "./SignUpForm";
import ProgressBar from "./ProgressBar";
import { InitialScreen } from "./InitialScreen";

const MainSection = ({ joined, setJoined }) => {
  const [step, setStep] = useState<number>(1);
  return (
    <div className="main_section">
      {joined === false ? <Header /> : null}
      {joined === false ? (
        <InitialScreen setJoined={setJoined} />
      ) : (
        <>
          {step === 5 ? null : (
            <ProgressBar step={step} setStep={setStep} setJoined={setJoined} />
          )}

          <SignUpForm step={step} setStep={setStep} />
        </>
      )}
    </div>
  );
};

export default MainSection;
