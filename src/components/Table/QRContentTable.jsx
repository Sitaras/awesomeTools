import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  TableContainer,
  TextField,
} from "@mui/material";
import { IconButton } from "components/Buttons/Buttons";
import UndoIcon from "@mui/icons-material/Undo";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import PreviewIcon from "@mui/icons-material/Preview";
import DialogOverlay from "components/DialogOverlay/DialogOverlay";
import useDialog from "hooks/useDialog";
import { StandardDropDown } from "components/DropDown/DropDowns";
import { hasEqualObjectValues } from "utils/objectUtils";

import styles from "./QRContentTable.module.scss";

const QRContentTable = ({ rows, handleRows }) => {
  const qrViewDialog = useDialog();
  const [qrView, setQrView] = useState("");

  const [previous, setPrevious] = useState({});

  const onRevert = (id) => {
    const newRows = rows.map((row) => {
      if (row.id === id) {
        return previous[id] ? previous[id] : row;
      }
      return row;
    });
    handleRows(newRows);
    setPrevious((state) => {
      delete state[id];
      return state;
    });
  };

  const transformDimensionsInput = (value) => {
    const maximumImageSize = 65535;

    if (isNaN(value)) return 0;

    if (value > maximumImageSize) return maximumImageSize;

    if (value < 0 || value === "-") return 0;

    return value;
  };

  const handleChangeRow = (e, row) => {
    if (!previous[row.id]) {
      setPrevious((_prev) => ({ ..._prev, [row.id]: row }));
    }

    const name = e.target.name;
    const value =
      name === "width" || name === "height"
        ? transformDimensionsInput(e.target.value)
        : e.target.value;
    const { id } = row;

    const newRows = rows.map((row) => {
      if (row.id === id) {
        const canBeReverted =
          previous[row.id]?.[name] !== value ||
          !hasEqualObjectValues(row, previous[row.id]);
        return { ...row, [name]: value, canBeReverted };
      }
      return row;
    });

    handleRows(newRows);
  };

  const handleChangeCell = (row) => (e) => handleChangeRow(e, row);

  const handleQrPreview = (row) => (e) => {
    setQrView(`file://${row?.file}`);
    qrViewDialog.show();
  };

  const handleSaveAs = (row) => (e) => {
    window.api.send("saveQRfile", row);
  };

  const showDimensionsColumn = rows?.some((row) => row.extension !== "svg");

  return (
    <>
      <TableContainer>
        <Table aria-label="caption table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="left" />
              <TableCell align="left">Filename</TableCell>
              <TableCell align="left">Extension</TableCell>
              {showDimensionsColumn && (
                <TableCell align="left">Dimensions</TableCell>
              )}
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <IconButton
                    className={!row.canBeReverted ? styles["gray-fill"] : ""}
                    aria-label="undo"
                    onClick={() => onRevert(row.id)}
                    disabled={!row.canBeReverted}
                  >
                    <UndoIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="left">
                  <TextField
                    name="fileName"
                    variant="standard"
                    value={row.fileName}
                    onChange={handleChangeCell(row)}
                  />
                </TableCell>
                <TableCell align="left">
                  <StandardDropDown
                    size="small"
                    value={row.extension}
                    name="extension"
                    label={"select image format"}
                    handleChange={handleChangeCell(row)}
                    options={[
                      { value: "svg", name: "svg" },
                      { value: "png", name: "png" },
                      { value: "jpeg", name: "jpeg" },
                      { value: "webp", name: "webp" },
                      { value: "tiff", name: "tiff" },
                    ]}
                  />
                </TableCell>
                {showDimensionsColumn && (
                  <TableCell align="justify">
                    {row.extension !== "svg" && (
                      <div className={styles.dimensionsContainer}>
                        <TextField
                          name="height"
                          variant="outlined"
                          size="small"
                          value={row?.height}
                          onChange={handleChangeCell(row)}
                        />
                        <TextField
                          name="width"
                          variant="outlined"
                          size="small"
                          value={row?.width}
                          onChange={handleChangeCell(row)}
                        />
                      </div>
                    )}
                  </TableCell>
                )}
                <TableCell align="left">
                  <IconButton aria-label="saveAs">
                    <SaveAsIcon
                      aria-label="saveAs"
                      onClick={handleSaveAs(row)}
                    />
                  </IconButton>
                  <IconButton
                    aria-label="preview"
                    onClick={handleQrPreview(row)}
                  >
                    <PreviewIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DialogOverlay
        open={qrViewDialog.isOpen}
        closeDialog={qrViewDialog.close}
        dialogHeader="QR Preview"
        scroll="body"
      >
        <img src={qrView} alt="qr" />
      </DialogOverlay>
    </>
  );
};

export default QRContentTable;
