import React from "react";
import styles from "./ContentLayout.module.scss";

const ContentLayout = ({ children }) => {
  return <section className={styles.contentContainer}>{children}</section>;
};

export default ContentLayout;
