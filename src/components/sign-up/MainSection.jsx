import React, { useEffect, useState } from "react";
import SignUpForm from "./SignUpForm";
import ProgressBar from "./ProgressBar.tsx";
import { InitialScreen } from "./InitialScreen.tsx";


const MainSection = ({ joined, setJoined }) => {
  const [step, setStep] = useState(1);
  return (
    <section className="main_section">
      {joined === false ? (
        <InitialScreen setJoined={setJoined}/>
      ) : (
        <>
          {step === 5 ? null : (
            <ProgressBar step={step} setStep={setStep} setJoined={setJoined} />
          )}

          <SignUpForm step={step} setStep={setStep} />
        </>
      )}
    </section>
  );
};

export default MainSection;
