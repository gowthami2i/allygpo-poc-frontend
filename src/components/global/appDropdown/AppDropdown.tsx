import React from "react";
import { Dropdown } from "primereact/dropdown";
import { TextVariant } from "../../../constants/appConstants";
import Typography from "../typography/Typography";

interface IContractType {
  name: string;
  code: string;
}

interface IAppDropdownProps {
  className: string;
  label: string;
  value: string;
  options: IContractType[];
  optionLabel: string;
  optionValue: string;
  onChange: (event: any) => void;
  placeholder: string;
}

export const AppDropdown = (props: IAppDropdownProps) => {
  const { optionLabel, optionValue, value, onChange, placeholder, options } =
    props;
  return (
    <div>
      <Typography variant={TextVariant.SUBHEADING1}>{props.label}</Typography>
      <Dropdown
        value={value}
        onChange={onChange}
        options={options}
        optionLabel={optionLabel}
        optionValue={optionValue}
        placeholder={placeholder}
        className="w-full"
      />
    </div>
  );
};

export default AppDropdown;
