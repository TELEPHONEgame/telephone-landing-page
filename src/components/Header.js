import React from "react";

import { IoMenu } from "react-icons/io5";

const Header = () => {
  console.log("HEader----");

  return (
    <header className="header">
      <span className="main_text">TELEPHONE</span>
      <div className="ham_menu">
        <IoMenu size={26} />
      </div>
      
    </header>
  );
};

export default Header;
