import { Dropdown } from "primereact/dropdown";
import "./customDropdown.scss";
import React from "react";
import Typography from "../../typography/Typography";

export const CustomDropdown = (props: any) => {
  const { optionLabel, optionValue, value, onChange, placeholder, options } =
    props;
  return (
    <div>
      <Typography variant={""} className="label">
        {props.label}
      </Typography>
      <Dropdown
        value={value}
        onChange={onChange}
        options={options}
        optionLabel={optionLabel}
        optionValue={optionValue}
        placeholder={placeholder}
        className="dropdown w-full"
        pt={{
          item: {
            className: "item-label p-2",
            color: "none",
          },
        }}
      />
    </div>
  );
};

export default CustomDropdown;
