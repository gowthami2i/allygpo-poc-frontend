import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";

interface ISeachBarProps {
  value: string;
  handleChange: any;
}

const SearchBar = (props: ISeachBarProps) => {
  const { value, handleChange } = props;
  return (
    <IconField iconPosition="right">
      <InputIcon
        className="pi pi-search"
        style={{ color: "var(--primary-color)" }}
      />
      <InputText
        value={value}
        onChange={(e) => handleChange(e)}
        placeholder="Search"
        className="p-inputtext-sm shadow-none"
        style={{ borderRadius: "4px", borderColor: "var(--app-border-color)" }}
      />
    </IconField>
  );
};

export default SearchBar;
