import "./App.css";
import React, { useState } from "react";
import Header from "./components/Header";
import MainSection from "./components/MainSection";

function App() {
  const [joined, setJoined] = useState(false);
  return (
    <div className="App">
      {joined === false ? <Header /> : null}
      <MainSection joined={joined} setJoined={setJoined} />
    </div>
  );
}

export default App;
