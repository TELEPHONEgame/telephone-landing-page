import "./App.css";
import React, { useState } from "react";
import MainSection from "./components/sign-up/MainSection";
import HowToPlay from "./components/HowToPlay";
import Faq from "./components/sign-up/Faq";
import { ConfigProvider } from "antd";

function App() {
  const [joined, setJoined] = useState(false);
  const [page, setPage] = useState<"main" | "faq" | "how-to-play">("main");
  const [step, setStep] = useState<number>(5);

  const setDisplayFaq = (display: boolean) => {
    display ? setPage("faq") : setPage("main");
  };
  const setDisplayHowToPlay = (display: boolean) => {
    display ? setPage("how-to-play") : setPage("main");
  };

  return (
    <div className={`App ${step === 5 && page !== "faq" ? "final_card" : ""}`}>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: "black",
          },
          components: {
            Button: {
              colorPrimary: "rgb(0, 0, 0)",
              borderRadius: 5,
            },
          },
        }}
      >
        {page === "faq" ? (
          <Faq setDisplayFaq={setDisplayFaq} />
        ) : page === "how-to-play" ? (
          <HowToPlay setDisplayHowToPlay={setDisplayHowToPlay} />
        ) : (
          <MainSection
            step={step}
            setStep={setStep}
            joined={joined}
            setJoined={setJoined}
            displayFaq={false}
            setDisplayFaq={setDisplayFaq}
            setDisplayHowToPlay={setDisplayHowToPlay}
          />
        )}
      </ConfigProvider>
    </div>
  );
}

export default App;
