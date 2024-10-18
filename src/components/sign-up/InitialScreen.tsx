import React from "react";
import { Link } from "react-router-dom";
import { TbWorld } from "react-icons/tb";
import Header from "../common/Header";

const InitialScreen = () => {
  return (
    <div className="main_section">
      <Header />
      <div className="message initial_screen">
        A message changing forms as it travels across the world{" "}
        <span className="world_icon">
          <TbWorld />
        </span>{" "}
        from artist → artist.
      </div>
      <div className="landing_page_animation">
        <img
          src="/static/optimized-tele.gif"
          alt="telephone-animation"
          width="300"
          height="450"
        />
      </div>
      <div>
        <Link
          className="btn_reset main_btn btn_white"
          to="/how-to-play"
        >
          How do I play?
        </Link>
        <Link className="btn_reset main_btn" to="/sign-up">
          Join
        </Link>
      </div>
    </div>
  );
};

export default InitialScreen;