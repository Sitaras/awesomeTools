import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import ContentLayout from "containers/ContentLayout";
import { PositiveNumberInput } from "components/Inputs/PositiveNumberInput";
import { PrimaryButtonLoader } from "components/Buttons/Buttons";
import { SecondaryButton } from "components/Buttons/Buttons";
import { Radio } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { RadioGroup } from "@mui/material";
import { IconButton } from "components/Buttons/Buttons";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Snackbar } from "@mui/material";

import styles from "./HipsterIpsumGenerator.module.scss";

const HipsterIpsumGenerator = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [dummyText, setDummyText] = useState();
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const handleGenerate = async ({ choice, number }) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://hipsum.co/api/?type=hipster-centric&${choice}=${number}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
      }
      const text = await response.json();
      setDummyText(text?.join("\n\n"));
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveAsTxt = () => {
    window.api.send("saveAsTxt", dummyText);
  };

  const handleClear = () => {
    setDummyText();
  };

  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };

  const handleOpenSnackBar = () => {
    setOpenSnackBar(true);
  };

  return (
    <ContentLayout>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSnackBar}
        autoHideDuration={3000}
        className={styles.snackbar}
        onClose={handleCloseSnackBar}
        message="Copied to clipboard!"
      />
      <form
        className={styles.formContainer}
        onSubmit={handleSubmit(handleGenerate)}
      >
        <h1 className={styles.header}>
          Dummy text? More like dummy thicc text, amirite?
        </h1>
        <Controller
          control={control}
          name="choice"
          defaultValue="sentences"
          render={({ field }) => (
            <RadioGroup {...field}>
              <FormControlLabel
                value="sentences"
                control={<Radio />}
                label="Sentences"
              />
              <FormControlLabel
                value="paras"
                control={<Radio />}
                label="Paragraphs"
              />
            </RadioGroup>
          )}
        />
        <PositiveNumberInput
          register={register}
          errors={errors}
          label="Number of paragraphs/sentences"
          name="number"
        />
        <div className={styles.ctaContainer}>
          <PrimaryButtonLoader
            loading={isLoading}
            disabled={isLoading}
            type="submit"
          >
            Generate
          </PrimaryButtonLoader>
          <SecondaryButton
            onClick={handleSaveAsTxt}
            className={styles.saveAsTxtButton}
            disabled={!dummyText}
          >
            Save as txt
          </SecondaryButton>
          <SecondaryButton
            onClick={handleClear}
            className={styles.saveAsTxtButton}
            disabled={!dummyText}
          >
            Clear
          </SecondaryButton>
        </div>
      </form>
      {dummyText && (
        <div className={styles.textContainer}>
          <p>{dummyText}</p>
          <IconButton
            aria-label="undo"
            onClick={() => {
              navigator.clipboard.writeText(dummyText);
              handleOpenSnackBar();
            }}
            className={styles.copyButton}
          >
            <ContentCopyIcon />
          </IconButton>
        </div>
      )}
    </ContentLayout>
  );
};

export default HipsterIpsumGenerator;
