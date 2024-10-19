import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Faq from "./components/sign-up/Faq";
import HowToPlay from "./components/HowToPlay";
import InitialScreen from "./components/sign-up/InitialScreen";
import SignUp from "./components/sign-up/MainSection";
import ArtistPortal from "./components/portal/v2/Portal";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <InitialScreen />
      },
      {
        path: "faq",
        element: <Faq />
      },
      {
        path: "how-to-play",
        element: <HowToPlay />
      },
      {
        path: "portal",
        element: <ArtistPortal />
      },
      {
        path: "sign-up",
        element: <SignUp />
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
