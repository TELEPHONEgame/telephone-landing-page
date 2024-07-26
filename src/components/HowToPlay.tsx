import React from "react";
import { IoMdClose } from "react-icons/io";

const Faq = ({ setDisplayHowToPlay }) => {
  return (
    <div className="htp">
      <button className="btn_reset close_icon" onClick={() => setDisplayHowToPlay(false)}>
        <IoMdClose size={25} />
      </button>

      <div className="htp_content">
        <h3 className="htp_title">HOW TO PLAY</h3>

        <p className="htp_paragraph">
          Playing TELEPHONE is simple. We will review your application and, if
          accepted, you will receive a confirmation email. Then, we ask that you
          keep your eyes peeled for an assignment. Depending on how our game
          unfolds, this assignment may come quickly or may take time.
        </p>

        <p className="htp_paragraph">
          In this email, you will be assigned an anonymous work of art from
          somewhere else on earth and it will be your job to translate this
          artwork into your own medium. This work of art may not immediately
          speak to you or reveal its meaning, but trust that it contains a
          message. Once you&apos;ve completed your translation, you will return
          your work to us, and it will be passed to another artist somewhere on
          our big, beautiful globe to translate in turn.
        </p>
      </div>
    </div>
  );
};

export default Faq;
