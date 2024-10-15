import React, { ChangeEventHandler, KeyboardEvent, MouseEvent } from "react";
import { InputText } from "primereact/inputtext";
import "./customInput.scss";
import Typography from "../../typography/Typography";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";

interface ICustomInputProps {
  value: string;
  onChange: (event: any) => void;
  className?: string;
  placeholder?: string;
  label?: string;
  type?: string;
  labelClassName?: string;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  icon?: string;
  iconPosition?: "left" | "right";
  iconClick?: (event: MouseEvent<HTMLElement>) => void;
}

export const CustomInput = (props: ICustomInputProps) => {
  const {
    placeholder,
    value,
    onChange,
    className,
    label,
    type,
    labelClassName,
    onKeyDown,
    icon,
    iconPosition,
    iconClick,
  } = props;
  return (
    <div>
      <Typography
        variant={""}
        className={`${labelClassName ? labelClassName : "label"}`}
      >
        {label}
      </Typography>
      <IconField iconPosition={iconPosition}>
        <InputIcon
          className={`text-primary ${
            iconClick ? "cursor-pointer" : ""
          } ${icon}`}
          onClick={iconClick}
        />
        <InputText
          value={value}
          onChange={onChange}
          className={`custom-input ${className}`}
          placeholder={placeholder}
          type={type}
          onKeyDown={onKeyDown}
        />
      </IconField>
    </div>
  );
};
