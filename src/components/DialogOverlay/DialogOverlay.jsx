import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { ReactComponent as ArrowBackIcon } from "assets/icons/ArrowLeftIcon.svg";
import { ReactComponent as CancelIcon } from "assets/icons/CloseIcon.svg";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { isEmptyString } from "utils/stringUtils";

import styles from "./DialogOverlay.module.scss";

const DialogOverlay = ({
  open = true,
  closeDialog,
  goBack,
  dialogHeader,
  children,
  dialogActions,
  dialogFooter = null,
  /* classes */
  dialogClass = "",
  titleClass = "",
  contentClass = "",
  actionsClass = "",
  closeButtonClass = "",
  /* config properties */
  showCloseButton = true,
  showBackButton = false,
  topLeftIcon,
  disableBackdropClick = true,
  isFullscreen = false,
  scroll = "body",
}) => {
  const theme = useTheme();
  const showFullscreen = useMediaQuery(theme.breakpoints.down("sm"));
  const dialogClasses = {
    paper: `${styles["dialog"]} ${dialogClass}`,
  };

  const handleOnClose = (event, reason) => {
    if (
      disableBackdropClick &&
      (reason === "escapeKeyDown" || reason === "backdropClick")
    ) {
      return;
    }
    if (typeof closeDialog === "function") closeDialog(event, reason);
  };

  const showDialogTitle =
    showBackButton === true ||
    showCloseButton === true ||
    !isEmptyString(dialogHeader);
  return (
    <Dialog
      open={open}
      onClose={handleOnClose}
      maxWidth={false}
      classes={dialogClasses}
      scroll={scroll}
      fullScreen={isFullscreen && showFullscreen}
    >
      {showDialogTitle && (
        <DialogTitle className={`${styles.dialogTitle} ${titleClass}`}>
          {showBackButton && (
            <IconButton
              className={styles.backButton}
              aria-label="go-back"
              onClick={() => {
                if (typeof goBack === "function") {
                  goBack();
                }
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          {topLeftIcon && topLeftIcon}
          {dialogHeader && <h1 className={styles.header}>{dialogHeader}</h1>}
          {showCloseButton && (
            <IconButton
              className={`${styles.closeButton} ${closeButtonClass}`}
              aria-label="close"
              onClick={handleOnClose}
            >
              <CancelIcon />
            </IconButton>
          )}
        </DialogTitle>
      )}
      <DialogContent className={`${styles.dialogContent} ${contentClass}`}>
        {children}
      </DialogContent>
      {dialogActions && (
        <DialogActions className={`${styles.dialogActions} ${actionsClass}`}>
          {dialogActions}
        </DialogActions>
      )}
      {dialogFooter}
    </Dialog>
  );
};

export default DialogOverlay;
