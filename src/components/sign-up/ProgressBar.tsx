import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import "../../styles/mainSection.css";

type Props = {
  step: number;
};

const ProgressBar = ({ step }: Props) => {
  return (
    <div className="stepper">
      <FaArrowLeft style={{ height: "4vw", width: "4vw" }} />
      <div className="progress_bar_box">
        <div
          className="progress_bar"
          style={{ width: `${step * 25}%`, color: "#0A0C0E" }}
        />
      </div>
      <span className="span_progress">{`${step}/4`}</span>
    </div>
  );
};

export default ProgressBar;
