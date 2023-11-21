import React from 'react';
import { CircularProgress } from "@mui/material";

import styles from './InnerLoader.module.scss';

const InnerLoader = ({
  loading,
  children,
  color = '#ffffff',
  size = 24,
  ...rest
}) => {
  const progressStyles = { color: color };
  return (
    <div className={styles.wrapper}>
      {children}
      {loading ? (
        <div className={styles.iconWrapper}>
          <CircularProgress size={size} style={progressStyles} {...rest} />
        </div>
      ) : null}
    </div>
  );
};

export default InnerLoader;
