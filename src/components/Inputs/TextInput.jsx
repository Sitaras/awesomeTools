import React from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("inputs");
  const baseName = "errors";
  const { ref, ...registerRest } =
    register(name, {
      required: { value: required, message: t(`${baseName}.required`) },
      validate: {
        emptyString: (value) => {
          if (!required) return true;
          return isEmptyString(value) ? t(`${baseName}.required`) : true;
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
