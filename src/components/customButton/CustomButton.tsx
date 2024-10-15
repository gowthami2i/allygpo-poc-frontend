import React, { MouseEvent } from "react";
import { Button } from "primereact/button";
import "./customButton.scss";
import TrashIcon from "../../assets/images/svg/Trash_icon.svg";

interface ICustomButtonProps {
  className?: string;
  imgURL?: string;
  type?: "submit" | "button" | "reset" | undefined;
  buttonType: string;
  onClick: (event: MouseEvent<HTMLElement>) => void;
  label?: string;
  icon?: string;
  disabled?: boolean;
}

export const CustomButton = (props: ICustomButtonProps) => {
  const {
    className,
    imgURL,
    type,
    label,
    onClick,
    icon,
    buttonType,
    disabled,
  } = props;
  const renderButton = () => {
    switch (buttonType) {
      case "primary":
        return (
          <Button
            className={`custom-button primary-button ${
              imgURL ? "primary-button-image" : ""
            } ${className}`}
            label={!imgURL ? label : ""}
            type={type}
            onClick={onClick}
            icon={icon}
            disabled={disabled}
          >
            {imgURL && (
              <div className="button-with-image">
                <img src={imgURL} alt="button image" className="button-image" />
                <span>{props?.label}</span>
              </div>
            )}
          </Button>
        );

      case "primary-outline":
        return (
          <Button
            className={`custom-button primary-outline ${className}`}
            label={label}
            type={type}
            onClick={onClick}
          />
        );

      case "secondary-button":
        return (
          <Button
            className={`custom-button secondary-button ${className}`}
            label={label}
            type={type}
            onClick={onClick}
          />
        );

      case "text-outline":
        return (
          <Button
            className={`custom-button text-white ${className}`}
            text
            type={type}
            onClick={onClick}
            icon={icon}
          />
        );

      case "delete":
        return (
          <Button
            className={`custom-button delete-icon ${className}`}
            label={label}
            type={type}
            onClick={onClick}
          >
            <img
              src={TrashIcon}
              alt="button image"
              width="16px"
              height="17px"
            />
          </Button>
        );

      default:
        return null;
    }
  };

  return <div>{renderButton()}</div>;
};
