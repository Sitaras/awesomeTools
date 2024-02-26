import React, { useState } from "react";
import { useForm } from "react-hook-form";

import useMediaQuery from "@mui/material/useMediaQuery";
import ContentLayout from "containers/ContentLayout";
import SplitButton from "components/Buttons/SplitButton";
import { TextInput } from "components/Inputs/TextInput";
import { StandardDropDown } from "components/DropDown/DropDowns";
import { diffChars, diffWords, diffCss, diffJson } from "diff";
import {
  convertToLowerCase,
  replaceNewLineWithWhiteSpace,
  trim,
} from "utils/stringUtils";

import styles from "./DiffChecker.module.scss";

const DiffChecker = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  const phoneUp = useMediaQuery("(min-height:760px)");

  const maxRows = phoneUp ? 20 : 10;

  const [selectedComparisonFunction, setSelectedComparisonFunction] =
    useState("diffJson");

  const firstTextInputValue = watch("originalText") || "";
  const secondTextInputValue = watch("changedText") || "";

  const diffFunctions = {
    diffChars,
    diffWords,
    diffCss,
    diffJson,
  };

  const diff = diffFunctions[selectedComparisonFunction](
    firstTextInputValue,
    secondTextInputValue
  );

  const comparisonResult =
    firstTextInputValue && secondTextInputValue ? (
      diff?.map((part, index) => {
        const textClass = part?.added
          ? styles.added
          : part?.removed
          ? styles.removed
          : styles.equal;

        return (
          <span key={index} className={textClass}>
            {part.value}
          </span>
        );
      })
    ) : (
      <p className={styles.comparisonPlaceholder}>Difference</p>
    );

  const handleSelectComparisonFunction = (event) => {
    setSelectedComparisonFunction(event.target.value);
  };

  const handleToolAction = (action) => () => {
    const transformedFirstValue = action(firstTextInputValue);
    const transformedSecondValue = action(secondTextInputValue);
    setValue("originalText", transformedFirstValue);
    setValue("changedText", transformedSecondValue);
  };

  const toolsOptions = [
    {
      label: "To Lower Case",
      disable: false,
      action: handleToolAction(convertToLowerCase),
    },
    {
      label: "Replace new line with whitespace",
      disable: false,
      action: handleToolAction(replaceNewLineWithWhiteSpace),
    },
    {
      label: "Trim whitespace",
      disable: false,
      action: handleToolAction(trim),
    },
  ];

  return (
    <ContentLayout contentClass={styles.content}>
      <div className={styles.ctasContainer}>
        <StandardDropDown
          size="small"
          value={selectedComparisonFunction}
          label="Comparison function"
          handleChange={handleSelectComparisonFunction}
          options={[
            { value: "diffJson", name: "JSON" },
            { value: "diffCss", name: "CSS" },
            { value: "diffWords", name: "Words" },
            { value: "diffChars", name: "Chars" },
          ]}
        />
        <SplitButton options={toolsOptions} label={"string tools"} />
      </div>
      <div className={styles.inputsContainer}>
        <TextInput
          register={register}
          errors={errors}
          className={styles.multilineInput}
          label="Original text"
          name="originalText"
          multiline
          rows={maxRows}
        />
        <TextInput
          register={register}
          errors={errors}
          className={styles.multilineInput}
          label="Changed text"
          name="changedText"
          multiline
          rows={maxRows}
        />
      </div>
      <div className={styles.differenceBlock}>
        <pre className={styles["differenceBlock-content"]}>
          {comparisonResult}
        </pre>
      </div>
    </ContentLayout>
  );
};

export default DiffChecker;
