import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import React from "react";

const SearchBar = () => {
  return (
    <IconField iconPosition="right">
      <InputIcon
        className="pi pi-search"
        style={{ color: "var(--app-primaryColor)" }}
      />
      <InputText
        placeholder="Search"
        className="p-inputtext-sm"
        style={{ borderRadius: "4px" }}
      />
    </IconField>
  );
};

export default SearchBar;
