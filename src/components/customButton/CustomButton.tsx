import { Button } from "primereact/button";
import "./customButton.scss";
import TrashIcon from "../../assets/images/svg/Trash_icon.svg";

export const CustomButton = (props: any) => {
  const renderButton = () => {
    switch (props.buttonType) {
      case "primary":
        return (
          <Button
            className={`custom-button primary-button-image ${props.className}`}
            label={!props.imgURL ? props.label : ""}
            type={props.type}
          >
            {props?.imgURL && (
              <div className="button-with-image">
                <img
                  src={props?.imgURL}
                  alt="button image"
                  className="button-image"
                />
                <span>{props?.label}</span>
              </div>
            )}
          </Button>
        );

      case "primary-outline":
        return (
          <Button
            className={`custom-button primary-outline ${props.className}`}
            label={props.label}
            type={props.type}
          />
        );

      case "secondary-button":
        return (
          <Button
            className={`custom-button secondary-button ${props.className}`}
            label={props.label}
            type={props.type}
          />
        );

      case "delete":
        return (
          <Button
            className={`custom-button delete-icon ${props.className}`}
            label={props.label}
            type={props.type}
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
