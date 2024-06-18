import React, { useEffect, useState } from "react";
import Header from "./Header";

import { Alert } from "antd";
import "../../styles/finalCard.css";

const FinalCard = ({ displayFaq, setDisplayFaq }) => {
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
      <div className="message final_card_header">
        <Header displayFaq={displayFaq} setDisplayFaq={setDisplayFaq} />
        <div>IMG/ICON</div>
        <div>
          {" "}
          Stay by the phone, we’re just a whisper away ❉ We’ll let you know when
          it’s your turn to play!
        </div>
      </div>
      {copySuccess ? (
        <Alert
          message="Copied to Clipboard!"
          // type="success"
          type="info"
          showIcon
          // closable={true}
          // onClose={() => setCopySuccess(false)}
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
      <div>
        <button className="main_btn btn_white" onClick={copyToClip}>
          Refer a friend
        </button>
      </div>
    </div>
  );
};

export default FinalCard;
