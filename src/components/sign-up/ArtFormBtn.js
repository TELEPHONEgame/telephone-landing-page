import React from "react";

import { IoMenu } from "react-icons/io5";

const ArtFormBtn = ({ name, inputFields, setInputFields }) => {
  return (
    <button
      className="art_form_btn"
      name={name}
      onClick={e =>
        setInputFields({
          ...inputFields,
          artForm: e.target.name,
        })
      }
    >
      {name}
    </button>
  );
};

export default ArtFormBtn;
