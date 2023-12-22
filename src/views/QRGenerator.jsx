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
  } = useForm();

  window.api.receive("qrData", (data) => {
    setQrData(tableDataTransformer(data));
  });

  const [qrData, setQrData] = useState();

  const handleUrlsSubmit = ({ URLs }) => {
    const urlsArray = URLs.split("\n");
    window.api.send("convertUrlsToQRs", urlsArray);
  };

  return (
    <QRGeneratorLayout>
      <TextInput
        register={register}
        errors={errors}
        className={styles.urlsMultilineInput}
        label="URLs"
        name="URLs"
        multiline
      />
      <PrimaryButton
        onClick={handleSubmit(handleUrlsSubmit)}
        className={styles.submitButton}
      >
        Generate
      </PrimaryButton>
      <div className={styles.container}>
        <QRContentTable
          rows={qrData}
          handleRows={setQrData}
          tableStyles={styles.tableInnerContainer}
        />
        <SecondaryButton className={styles.saveAsButton} onClick={() => {}}>
          Save as all
        </SecondaryButton>
      </div>
    </QRGeneratorLayout>
  );
};

export default QRGenerator;
