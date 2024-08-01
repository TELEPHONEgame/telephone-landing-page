import React from "react";
import { IoMdClose } from "react-icons/io";
import { EmailAnchor } from "../EmailAnchor";
import { ScrollButton } from "../ScrollButton";

const Faq = ({ setDisplayFaq }) => {
  return (
    <div className="faq">
      <button
        className="btn_reset close_icon"
        onClick={() => setDisplayFaq(false)}
      >
        <IoMdClose size={25} />
      </button>
      <h3 className="faq_item">TELEPHONE FAQ</h3>

      <p className="faq_item faq_question">Where is my assignment?</p>
      <p className="faq_item faq_info">
        We know you're eagerly waiting for your assignment! Now that you’ve
        received your acceptance letter, your assignment is on its way. This
        could take up to two months, so don’t despair! That’s just part of the
        game – we’re working hard to find the perfect message for you. If you
        have any time constraints, please let us know, and we’ll do our best to
        speed things up or put you back into the queue.
      </p>

      <p className="faq_item faq_question">
        You gave me [x] weeks to turn my piece around – that’s not enough time!
      </p>
      <p className="faq_item faq_info">
        We understand – creating art takes time. This game revolves around the
        concept of creating art so that other artists can continue the cycle of
        seeing and passing your art along. We kindly ask that you try to realize
        your vision within the given timeframe. Think of it as a challenge! If
        your art form takes more time, we understand and can work with that.
        Just give us a holler at <EmailAnchor />.
      </p>

      <p className="faq_item faq_question">How does this game work?</p>
      <p className="faq_item faq_info">
        It’s simple and beautiful. You apply to play, we adore your art, we give
        it to another person somewhere else in the world, and that recipient
        translates it into another piece of art. That artwork is then sent to
        yet another artist to translate, and so on. In the end, all artworks are
        revealed in a splendid game of TELEPHONE.
      </p>

      <p className="faq_item faq_question">
        What do I do if I don't understand the artwork I was given?
      </p>
      <p className="faq_item faq_info">
        Feeling a bit lost with your assigned artwork? You’re not alone – this
        is a common experience in TELEPHONE. One of the best parts of the game
        is distilling something beyond us into something that resonates with us.
        Look for commonality, even in the colors, textures, or sounds. There is
        always a message waiting to be uncovered.
      </p>

      <p className="faq_item faq_question">Can I switch mediums?</p>
      <p className="faq_item faq_info">
        We allow for switching mediums before submission, though we encourage
        sticking with your initial choice if possible. Part of the game’s magic
        is in never sending, for example, a painting to a painter. Many of our
        artists are multi-talented, and we celebrate that. If you need to change
        your medium, please reach out at <EmailAnchor /> so we can make sure
        your work isn’t accidentally sent to an artist working in your new
        chosen medium.
      </p>

      <p className="faq_item faq_question">
        File type questions. Technical questions. File size.
      </p>
      <p className="faq_item faq_info">
        For technical or file-related questions, please refer to the Artist
        Portal or contact our support team directly. We’re here to help with any
        issues you encounter.
      </p>

      <p className="faq_item faq_question">
        How to change information? Questions about the artist portal.
      </p>
      <p className="faq_item faq_info">
        If you need to update your information or have any questions about using
        the Artist Portal, please visit the support section in the portal or get
        in touch with our team for assistance.
      </p>

      <p className="faq_item faq_question">
        What are my ownership rights to my artwork?
      </p>
      <p className="faq_item faq_info">
        We retain non-exclusive digital rights for your work in perpetuity – as
        long as our online museum is active, your piece may appear in our
        gallery. We will reach out for your consent if we wish to use your work
        in any publication (magazine, online article) or artistic exhibit
        (festival, conference, show). The physical rights to your work remain
        yours, and you can sell it at any time.
      </p>

      <p className="faq_item faq_question">
        When will this be published? / When does this end?
      </p>
      <p className="faq_item faq_info">
        Our first game, featuring 500 works, took about a year. We expanded, and
        our next game, with 1,000 works, also took about a year. We’re growing
        even more, aiming to release many thousands of interconnected works
        within a year. We’re so proud to have you play with us and can’t wait to
        see the incredible art you create. We will notify all artists when we
        are near the release date, and we will all certainly celebrate together,
        both virtually and in the real world.
      </p>

      <p className="faq_info bold">Love, gratitude, illumination,</p>
      <p className="faq_item faq_info bold">TELEPHONE</p>
      <p className="faq_item faq_info bold">
        (PS. Please email us at <EmailAnchor /> with any further questions,
        concerns, things you’d like to share, etc)
      </p>
      <ScrollButton />
    </div>
  );
};

export default Faq;
