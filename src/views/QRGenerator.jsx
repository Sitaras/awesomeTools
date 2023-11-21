import React, { useState } from "react";
import QRGeneratorLayout from "containers/QRGeneratorLayout";
import { TextInput } from "components/Inputs/TextInput";
import { PrimaryButton } from "components/Buttons/Buttons";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { tableDataTransformer } from "utils/stringUtils";
import QRContentTable from "components/Table/QRContentTable";

import styles from "./QRGenerator.module.scss";

const QRGenerator = () => {
  const { t } = useTranslation("buttons");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [qrData, setQrData] = useState(
    tableDataTransformer([
      { id: 1, fileName: "nbg1", extension: "png" },
      { id: 2, fileName: "nbg2", extension: "png" },
      { id: 3, fileName: "nbg3", extension: "png" },
      { id: 4, fileName: "nbg4", extension: "png" },
      { id: 5, fileName: "nbg5", extension: "png" },
      { id: 6, fileName: "nbg6", extension: "png" },
      { id: 7, fileName: "nbg7", extension: "png" },
      { id: 8, fileName: "nbg8", extension: "png" },
      { id: 9, fileName: "nbg9", extension: "png" },
      { id: 10, fileName: "nbg10", extension: "png" },
    ])
  );

  return (
    <QRGeneratorLayout>
      <TextInput
        register={register}
        errors={errors}
        className={styles.urlsMultilineInput}
        label="URLs"
        multiline
      />
      <PrimaryButton
        onClick={handleSubmit(() => {
          console.log("ping");
          window.api.send("toMain", "ping");
        })}
        className={styles.submitButton}
      >
        {t("qrGeneratorScreen.submit")}
      </PrimaryButton>
      <QRContentTable
        rows={qrData}
        handleRows={setQrData}
        tableStyles={styles.tableContainer}
      />
    </QRGeneratorLayout>
  );
};

export default QRGenerator;
