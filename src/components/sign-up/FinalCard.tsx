import React from "react";

const FinalCard = () => {
  console.log("FinalCard----");

  return (
    <div className="main_section_box">
      <div className="message">
        <div>Telephone image/icon</div>
        <div>
          {" "}
          Stay by the phone, we’re just a whisper away ❉ We’ll let you know when
          it’s your turn to play!
        </div>
      </div>
      <div className="landing_page_animation">
        <img
          src="/assets/optimized-tele.gif"
          alt="telephone-animation"
        />
      </div>
      <div>
        <button
          className="main_btn btn_white"
          onClick={() => console.log("refere a friend")}
        >
          Refer a friend
        </button>
      </div>
    </div>
  );
};

export default FinalCard;
