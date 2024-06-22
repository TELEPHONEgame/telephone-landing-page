import React from "react";
import { TbWorld } from "react-icons/tb";

type Props = {
  setJoined: (joined: boolean) => void;
};

export const InitialScreen = ({ setJoined }: Props) => {
  return (
    <>
      <div className="message">
        A message changing forms as it travels across the world{" "}
        <span className="world_icon">
          <TbWorld />
        </span>
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
        <button className="main_btn btn_white">How do I play?</button>
        <button className="main_btn" onClick={() => setJoined(true)}>
          Join
        </button>
      </div>
    </>
  );
};
