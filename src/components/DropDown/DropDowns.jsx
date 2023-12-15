import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const StandardDropDown = ({
  label = "",
  options,
  handleChange,
  ...restProps
}) => {
  return (
    <Select
      labelId={`select-${label}`}
      id={label}
      onChange={handleChange}
      {...restProps}
    >
      {options?.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.name}
        </MenuItem>
      ))}
    </Select>
  );
};

export { StandardDropDown };
