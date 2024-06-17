import "./App.css";
import React, { useState } from "react";
// import Header from "./components/sign-up/Header";
import MainSection from "./components/sign-up/MainSection";
import Faq from "./components/sign-up/Faq";

function App() {
  const [joined, setJoined] = useState(false);
  const [displayFaq, setDisplayFaq] = useState(false);

  return (
    <div className="App">
      {displayFaq ? (
        <Faq setDisplayFaq={setDisplayFaq} />
      ) : (
        <MainSection
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
