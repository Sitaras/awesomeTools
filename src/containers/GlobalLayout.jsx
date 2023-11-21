import React from "react";
import styles from "./GlobalLayout.module.scss";

const GlobalLayout = ({ children }) => {
  return <section className={`${styles.contentContainer}`}>{children}</section>;
};

export default GlobalLayout;
