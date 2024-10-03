import { Dropdown } from "primereact/dropdown";
import "./customDropdown.scss";
import React from "react";

export const CustomDropdown = (props: any) => {
  return (
    <Dropdown
      value={props.value}
      // onChange={(e}
      options={props.options}
      optionLabel="name"
      placeholder={props.placeholder}
      // className="w-full md:w-14rem"
      className="dropdown w-full  md:w-14rem"
      pt={{
        trigger
      }}
    />
  );
};

export default CustomDropdown;
