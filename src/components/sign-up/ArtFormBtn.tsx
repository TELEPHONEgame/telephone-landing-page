import React from "react";
import { useFormContext } from "react-hook-form";
import { ArtForm, SignUpFormType } from "./types";
import clsx from "clsx";
type Props = {
  name: ArtForm;
};

const ArtFormBtn = ({ name }: Props) => {
  const { setValue, watch } = useFormContext<SignUpFormType>();
  const artForm = watch("artForm");
  const isSelected = artForm === name;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setValue("artForm", name);
  };

  return (
    <button
      className={clsx("art_form_btn", isSelected && "art_form_btn_selected")}
      onClick={handleClick}
      type="button"
    >
      {name}
    </button>
  );
};

export default ArtFormBtn;
