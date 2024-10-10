import { InputText } from "primereact/inputtext";
import "./customInput.scss";
import Typography from "../../typography/Typography";

interface ICustomInputProps {
  value: string;
  onChange: (event: any) => void;
  className?: string;
  placeholder?: string;
  label?: string;
  type?: string;
  labelClassName?: string;
  onKeyDown?: (event: any) => void;
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
  } = props;
  return (
    <div>
      <Typography
        variant={""}
        className={`${labelClassName ? labelClassName : "label"}`}
      >
        {label}
      </Typography>
      <InputText
        value={value}
        onChange={onChange}
        className={`custom-input ${className}`}
        placeholder={placeholder}
        type={type}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};
