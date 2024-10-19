import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import TelephoneHeader from "./components/common/v2/TelephoneHeader";
import MainPortal from "./components/portal/MainPortal";
import MainSection from "./components/sign-up/MainSection";
import HowToPlay from "./components/HowToPlay";
import Faq from "./components/sign-up/Faq";
import { ConfigProvider } from "antd";
import "./App.css";

function App() {
  return (
    <div className="App">
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
        <TelephoneHeader />
        <Outlet />
      </ConfigProvider>
    </div>
  );
}

export default App;
