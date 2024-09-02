import React, { useEffect, useState } from "react";
import Header from "../common/Header";

import { Alert } from "antd";
import "../../styles/finalCard.css";

const FinalCard = ({ displayFaq, setDisplayFaq, step }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (copySuccess) {
      let timer = setTimeout(() => {
        setCopySuccess(false);
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [copySuccess]);

  async function copyToClip() {
    const url = location.href;
    await navigator.clipboard.writeText(url);
    setCopySuccess(true);
  }

  return (
    <div className="main_section_box">
      <div className="final_card_header">
        <Header
          displayFaq={displayFaq}
          setDisplayFaq={setDisplayFaq}
          step={step}
        />
        <section className="final_card_info">
          <img
            src="/static/teleIcon.png"
            style={{
              paddingRight: "1rem",
              marginTop: "0.5rem",
              height: "clamp(3.5rem, 7vh, 80px)",
            }}
          />
          <p
          //  style={{ paddingRight: "50%" }} 
          className="message msg_final_card">
            {" "}
            Stay by the phone, we’re just a whisper away ❉ We’ll let you know
            when it’s your turn to play!
          </p>
        </section>
      </div>
      {copySuccess ? (
        <Alert
          message="Copied to Clipboard!"
          type="info"
          showIcon
          className="final_card_alert"
        />
      ) : null}

      <div className="landing_page_animation">
        <img
          src="/static/optimized-tele.gif"
          alt="telephone-animation"
          width="300"
          height="450"
        />
      </div>
      <button className="main_btn btn_white" onClick={copyToClip}>
        Refer a friend
      </button>
    </div>
  );
};

export default FinalCard;
