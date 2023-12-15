import React from "react";
import get from "lodash/get";
import { StandardInput } from "./Inputs";
import { isEmptyString } from "utils/stringUtils";

const TextInput = ({
  register = () => {},
  errors = {},
  label,
  required = true,
  name = "text",
  ...rest
}) => {
  const { ref, ...registerRest } =
    register(name, {
      required: { value: required, message: "This field is required." },
      validate: {
        emptyString: (value) => {
          if (!required) return true;
          return isEmptyString(value) ? "This field is invalid." : true;
        },
      },
    }) || {};

  return (
    <StandardInput
      inputRef={ref}
      label={label}
      type="text"
      errorMessage={get(errors, `${name}.message`, null)}
      error={get(errors, `${name}`, null) !== null}
      {...rest}
      {...registerRest}
    />
  );
};

export { TextInput };
