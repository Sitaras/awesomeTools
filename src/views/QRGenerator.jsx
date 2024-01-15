import React, { useState } from "react";
import QRGeneratorLayout from "containers/QRGeneratorLayout";
import { TextInput } from "components/Inputs/TextInput";
import { PrimaryButton } from "components/Buttons/Buttons";
import { useForm } from "react-hook-form";
import { tableDataTransformer } from "utils/stringUtils";
import QRContentTable from "components/Table/QRContentTable";
import { SecondaryButton } from "components/Buttons/Buttons";

import styles from "./QRGenerator.module.scss";

const QRGenerator = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    getValues,
  } = useForm();

  window.api.receive("qrData", (data) => {
    setQrData(tableDataTransformer(data));
  });

  const [qrData, setQrData] = useState();

  const displaySaveAsAllButton = qrData?.length > 1;
  const displayInputsButtons = qrData?.length > 0;

  const handleUrlsSubmit = ({ URLs }) => {
    const urlsArray = [...new Set(URLs.split("\n"))];
    window.api.send("convertUrlsToQRs", urlsArray);
  };

  const handleSaveAsAll = () => {
    window.api.send("saveQRfilesFolder", qrData);
  };

  const handleClear = () => {
    resetField("URLs");
    setQrData([]);
  };

  const handleSaveAsTxt = () => {
    const urls = getValues("URLs");
    window.api.send("saveAsTxt", urls);
  };

  return (
    <QRGeneratorLayout>
      <div className={styles.inputContainer}>
        <TextInput
          register={register}
          errors={errors}
          className={styles.urlsMultilineInput}
          label="URLs"
          name="URLs"
          multiline
        />
        <div className={styles.inputButtonsContainer}>
          {displayInputsButtons && (
            <>
              <SecondaryButton
                onClick={handleClear}
                className={styles.saveAsTxtButton}
              >
                Clear
              </SecondaryButton>

              <SecondaryButton
                onClick={handleSaveAsTxt}
                className={styles.saveAsTxtButton}
              >
                Save as txt
              </SecondaryButton>
            </>
          )}
        </div>
      </div>
      <PrimaryButton
        onClick={handleSubmit(handleUrlsSubmit)}
        className={styles.submitButton}
      >
        Generate
      </PrimaryButton>
      <div className={styles.tableContainer}>
        <QRContentTable
          rows={qrData}
          handleRows={setQrData}
          tableStyles={styles.tableInnerContainer}
        />
        {displaySaveAsAllButton && (
          <SecondaryButton
            className={styles.saveAsButton}
            onClick={handleSaveAsAll}
          >
            Save as all
          </SecondaryButton>
        )}
      </div>
    </QRGeneratorLayout>
  );
};

export default QRGenerator;
