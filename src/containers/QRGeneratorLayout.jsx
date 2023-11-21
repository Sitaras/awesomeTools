import React from "react";
import styles from "./QRGeneratorLayout.module.scss";

const QRGeneratorLayout = ({ children }) => {
  return <section className={styles.contentContainer}>{children}</section>;
};

export default QRGeneratorLayout;
