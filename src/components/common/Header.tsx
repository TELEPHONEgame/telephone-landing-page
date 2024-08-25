import React, { useState } from "react";

import type { MenuProps } from "antd";
import { Dropdown } from "antd";

import { IoMenu } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";

const Header = ({ displayFaq, setDisplayFaq, step, page, task, setTask }) => {
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
        <div
          style={{ width: "100%" }}
          onClick={() => setDisplayFaq(!displayFaq)}
        >
          FAQ
        </div>
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
  // console.log("HEADER step--", step);
  // console.log("HEADER page--", page);

  const getHeaderClasses = () => {
    let headerClasses = "header ";
    if (step === 5) {
      headerClasses += "final_card_header";
    }
    if (!step) {
      // console.log("add header PORTAL classes");
    }

    // console.log("headerClasses--", headerClasses);
    return headerClasses;
  };

  const headerClasses = getHeaderClasses();

  return (
    <header className={headerClasses}>
      {task !== 0 ? (
        <FaArrowLeft
          onClick={() => setTask(0)}
          className="arrow_icon_portal"
        />
      ) : null}
      <span className="main_text">
        {page === "portal" ? "TELEPHONE: Artist Portal" : "TELEPHONE"}
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
