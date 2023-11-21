import React from 'react';
import Button from "@mui/material/Button";
import MuiIconButton from "@mui/material/IconButton";

import InnerLoader from './InnerLoader';

const PrimaryButton = (props) => {
  return (
    <Button variant="contained" {...props}>
      {props.children}
    </Button>
  );
};

const SecondaryButton = (props) => {
  return (
    <Button variant="outlined" {...props}>
      {props.children}
    </Button>
  );
};


const PrimaryButtonLoader = ({ loading, children, ...rest }) => {
  return (
    <InnerLoader loading={loading} color="#00084e">
      <PrimaryButton {...rest}>{children}</PrimaryButton>
    </InnerLoader>
  );
};

const SecondaryButtonLoader = ({
  loading,
  children,
  loaderClass = '',
  ...rest
}) => {
  return (
    <InnerLoader loading={loading} className={loaderClass}>
      <SecondaryButton {...rest}>{children}</SecondaryButton>
    </InnerLoader>
  );
};


const IconButton = ({ ...rest }) => {
  return <MuiIconButton {...rest} />;
};

export {
  PrimaryButton,
  SecondaryButton,
  PrimaryButtonLoader,
  SecondaryButtonLoader,
  IconButton,
};
