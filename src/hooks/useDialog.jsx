import { useEffect, useState } from 'react';

const useDialog = (initialValue = false) => {
  const [open, setOpen] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const [secondaryLoading, setSecondaryLoading] = useState(false);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const startLoading = () => {
    setLoading(true);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  const startSecondaryLoading = () => {
    setSecondaryLoading(true);
  };

  const stopSecondaryLoading = () => {
    setSecondaryLoading(false);
  };

  useEffect(() => {
    if (!open) {
      stopLoading();
      stopSecondaryLoading();
    }
    return () => {
      stopLoading();
      stopSecondaryLoading();
    };
  }, [open]);
  return {
    isOpen: open,
    isLoading: loading,
    show: openDialog,
    close: closeDialog,
    startLoading,
    stopLoading,
    isSecondaryLoading: secondaryLoading,
    startSecondaryLoading,
    stopSecondaryLoading,
    // error,
    // handleError,
    // clearError,
  };
};

export default useDialog;
