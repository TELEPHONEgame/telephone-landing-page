import React, { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import "../App.css";

export const ScrollButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    const scrolled = document.documentElement.scrollTop;
    const visibleView = 200;

    if (scrolled > visibleView) {
      setIsVisible(true);
    } else if (scrolled < visibleView) {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  console.log(document.documentElement.scrollTop);
  window.addEventListener("scroll", toggleVisibility);
  return (
    <button
      className="scroll_button"
      style={{ display: isVisible ? "inline" : "none" }}
    >
      <FaArrowUp onClick={scrollToTop} />
    </button>
  );
};
