import React from "react";

const ArtFormBtn = ({ name, inputFields, setInputFields }) => {
  const handleChange = (e) => {
    e.preventDefault();
    setInputFields({
      ...inputFields,
      artForm: e.target.name,
    });
  };

  return (
    <button
      className="art_form_btn"
      name={name}
      onClick={(e) => handleChange(e)}
    >
      {name}
    </button>
  );
};

export default ArtFormBtn;
