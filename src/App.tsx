import "./App.css";
import React, { useState } from "react";
import MainSection from "./components/sign-up/MainSection";
import Faq from "./components/sign-up/Faq";

function App() {
  const [joined, setJoined] = useState(false);
  const [displayFaq, setDisplayFaq] = useState(false);
  const [step, setStep] = useState<number>(1);

  return (
    <div className={`App ${step === 5 && !displayFaq ? "final_card" : ""}`}>
      {displayFaq ? (
        <Faq setDisplayFaq={setDisplayFaq} />
      ) : (
        <MainSection
          step={step}
          setStep={setStep}
          joined={joined}
          setJoined={setJoined}
          displayFaq={displayFaq}
          setDisplayFaq={setDisplayFaq}
        />
      )}
    </div>
  );
}

export default App;
