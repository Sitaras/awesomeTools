import React from "react";
import styles from "./ContentLayout.module.scss";

const ContentLayout = ({ children, contentClass = "" }) => {
  return (
    <section className={`${styles.contentContainer} ${contentClass}`}>
      {children}
    </section>
  );
};

export default ContentLayout;
