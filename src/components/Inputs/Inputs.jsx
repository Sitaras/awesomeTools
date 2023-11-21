import React from 'react';
import TextField from "@mui/material/TextField";

const StandardInput = ({
  errorMessage = '',
  label = '',
  startAdornment = null,
  endAdornment = null,
  readOnly = false,
  disabled = false,
  maxLength = null,
  InputProps,
  ...restProps
}) => {
  const { 'aria-label': ariaLabel = label } = restProps;
  return (
    <TextField
      label={label}
      helperText={errorMessage}
      InputProps={{
        startAdornment: startAdornment,
        ...(InputProps ? InputProps : {}),
        endAdornment: endAdornment,
        readOnly: readOnly,
        disabled: disabled,
      }}
      inputProps={{
        maxLength: maxLength,
        'aria-label': ariaLabel,
      }}
      disabled={disabled}
      id={`input_${restProps?.name ?? label}`}
      {...restProps}
    />
  );
};

export { StandardInput };
