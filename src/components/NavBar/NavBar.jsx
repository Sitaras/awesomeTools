import React from "react";

import QrCodeIcon from "@mui/icons-material/QrCode";
import IconButton from "@mui/material/IconButton";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import SmartButtonIcon from "@mui/icons-material/SmartButton";
import CompareIcon from "@mui/icons-material/Compare";
import JavascriptIcon from "@mui/icons-material/Javascript";
import Tooltip from "@mui/material/Tooltip";
import { NavLink } from "react-router-dom";

import styles from "./NavBar.module.scss";

const NavBar = () => {
  const routesLinks = {
    fakeDataGenerator: "/fake-data-generator",
    loremIpsumGenerator: "/lorem-ipsum-generator",
    qrGenerator: "/qr-generator",
    diffChecker: "/diff-checker",
    jsCompiler: "/js-compiler",
  };

  const isIconSelected = (isActive) => (isActive ? styles.selected : "");

  return (
    <nav className={styles.container}>
      <NavLink
        to={routesLinks.fakeDataGenerator}
        aria-label="Fake Data Generator"
      >
        {({ isActive }) => (
          <Tooltip title="Fake Data Generator" placement="right">
            <IconButton aria-label="Fake Data Generator">
              <SmartButtonIcon className={isIconSelected(isActive)} />
            </IconButton>
          </Tooltip>
        )}
      </NavLink>
      <NavLink
        to={routesLinks.loremIpsumGenerator}
        aria-label={"Lorem Ipsum Generator"}
      >
        {({ isActive }) => (
          <Tooltip title="Lorem Ipsum Generator" placement="right">
            <IconButton aria-label="Lorem Ipsum Generator">
              <LocalLibraryIcon className={isIconSelected(isActive)} />
            </IconButton>
          </Tooltip>
        )}
      </NavLink>
      <NavLink to={routesLinks.qrGenerator} aria-label="QR Generator">
        {({ isActive }) => (
          <Tooltip title="QR Generator" placement="right">
            <IconButton aria-label="QR Generator">
              <QrCodeIcon className={isIconSelected(isActive)} />
            </IconButton>
          </Tooltip>
        )}
      </NavLink>
      <NavLink to={routesLinks.diffChecker} aria-label="Diff Checker">
        {({ isActive }) => (
          <Tooltip title="Diff Checker" placement="right">
            <IconButton aria-label="Diff Checker">
              <CompareIcon className={isIconSelected(isActive)} />
            </IconButton>
          </Tooltip>
        )}
      </NavLink>
      <NavLink to={routesLinks.jsCompiler} aria-label="JS Compiler">
        {({ isActive }) => (
          <Tooltip title="JS Compiler" placement="right">
            <IconButton aria-label="JS Compiler">
              <JavascriptIcon className={isIconSelected(isActive)} />
            </IconButton>
          </Tooltip>
        )}
      </NavLink>
    </nav>
  );
};

export default NavBar;
