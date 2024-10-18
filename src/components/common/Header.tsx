import React, { useState } from "react";

import type { MenuProps } from "antd";
import { Dropdown } from "antd";

import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";

const Header = ({ step, title }: { step?: number; title?: string }) => {
  const [displayDropdown, setDisplayDropdown] = useState(false);

  const items: MenuProps["items"] = [
    {
      label: (
        <a href="https://phonebook.gallery/" target="_blank">
          Our last game
        </a>
      ),
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: (
        <Link style={{ width: "100%" }} to="/faq">
          FAQ
        </Link>
      ),
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: (
        <a href="https://www.psychopompprojects.com/telephone" target="_blank">
          Introduction and Theory Group
        </a>
      ),
      key: "2",
    },
  ];

  const getHeaderClasses = () => {
    let headerClasses = "header ";
    if (step === 5) {
      headerClasses += "final_card_header";
    }

    return headerClasses;
  };

  const headerClasses = getHeaderClasses();

  return (
    <header className={headerClasses}>
      <span
        className="main_text"
        style={{ fontStyle: "normal", overflow: "hidden" }}
      >
        {title ?? "TELEPHONE"}
      </span>
      <div
        className="ham_menu"
        onClick={() => setDisplayDropdown(!displayDropdown)}
      >
        <Dropdown
          menu={{ items }} // hover can't be used on touchscreens
          trigger={["click"]}
          placement="bottom"
        >
          <a onClick={(e) => e.preventDefault()}>
            <IoMenu size={26} />
          </a>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
