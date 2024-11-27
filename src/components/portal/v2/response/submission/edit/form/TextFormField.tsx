import React from "react";
import styles from "./styles.module.scss";
import { UseFormRegisterReturn } from "react-hook-form";

interface TextFormFieldProps {
  readonly inputProps: UseFormRegisterReturn;
  readonly label: string;
  readonly placeholder: string;
}

const TextFormField = ({
  inputProps,
  label,
  placeholder,
}: TextFormFieldProps) => {
  const fieldId = `field_${inputProps.name}`;

  return (
    <div className={styles.formField}>
      <label className={styles.formFieldLabel} htmlFor={fieldId}>
        {label}
      </label>
      <input
        className={styles.formFieldInput}
        id={fieldId}
        type="text"
        placeholder={placeholder}
        {...inputProps}
      />
    </div>
  );
};

export default TextFormField;
