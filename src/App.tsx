import "./App.css";
import React, { useState } from "react";
// import Header from "./components/sign-up/Header";
import MainSection from "./components/sign-up/MainSection";

function App() {
  const [joined, setJoined] = useState(false);

  return (
    <div className="App">
      {/* {joined === false ? <Header /> : null} */}
      <MainSection joined={joined} setJoined={setJoined} />
    </div>
  );
}

export default App;
