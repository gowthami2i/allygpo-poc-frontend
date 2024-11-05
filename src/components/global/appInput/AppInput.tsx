import React, { KeyboardEvent, MouseEvent } from "react";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { TextVariant } from "../../../constants/appConstants";
import "./appInput.scss";
import Typography from "../typography/Typography";

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
  isLoading?: any;
}

export const AppInput = (props: ICustomInputProps) => {
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
    isLoading,
  } = props;

  return (
    <div>
      <Typography
        variant={TextVariant.SUBHEADING1}
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
          className={`${className} w-full`}
          placeholder={placeholder}
          type={type}
          onKeyDown={onKeyDown}
          disabled={isLoading}
        />
      </IconField>
    </div>
  );
};
