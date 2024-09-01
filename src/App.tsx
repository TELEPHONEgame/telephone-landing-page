import React, { useEffect, useState } from "react";
import MainPortal from "./components/portal/MainPortal";
import MainSection from "./components/sign-up/MainSection";
import HowToPlay from "./components/HowToPlay";
import Faq from "./components/sign-up/Faq";
import { ConfigProvider } from "antd";
import "./App.css";

function App() {
  const [joined, setJoined] = useState(false);
  const [page, setPage] = useState<"main" | "faq" | "how-to-play" | "portal">(
    "main"
  );
  const [step, setStep] = useState<number>(1);

  const setDisplayFaq = (display: boolean) => {
    display ? setPage("faq") : setPage("main");
  };
  const setDisplayHowToPlay = (display: boolean) => {
    display ? setPage("how-to-play") : setPage("main");
  };

  useEffect(() => {
    const path = window.location.pathname;
    console.log(path);
    if (path.substring(0, 7) == "/portal") setPage("portal");
  }, []);

  useEffect(() => {
    console.log('this also')
  }, []);

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
          <HowToPlay
            setDisplayHowToPlay={setDisplayHowToPlay}
            setDisplayFaq={setDisplayFaq}
          />
        ) : page === "portal" ? (
          <MainPortal page={page} />
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
