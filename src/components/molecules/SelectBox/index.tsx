import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

type TMenuItem = {
  label: string;
  value: string | number;
};

export type TSelectBoxOnChange = (name: string, value: string | number | null) => void;

type TProps = {
  label: string;
  name: string;
  value: string | number | null;
  onChange: TSelectBoxOnChange;
  menuItems: TMenuItem[];
};

// select box (dropdown)
const SelectBox = ({ label, name, value, onChange, menuItems }: TProps) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        className="min-w-[195px]"
        name={name}
        value={value}
        label={label}
        onChange={({ target: { value, name } }) => {
          if (value) onChange(name, value);
        }}
      >
        {menuItems.map(({ label, value }) => {
          return (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default SelectBox;
