import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  TableContainer,
} from "@mui/material";
import { Input } from "@mui/material";
import { IconButton } from "components/Buttons/Buttons";
import UndoIcon from "@mui/icons-material/Undo";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import PreviewIcon from "@mui/icons-material/Preview";
import DialogOverlay from "components/DialogOverlay/DialogOverlay";
import useDialog from "hooks/useDialog";
import { StandardDropDown } from "components/DropDown/DropDowns";

const QRContentTable = ({ rows, handleRows, tableStyles }) => {
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

  const handleChangeRow = (e, row) => {
    if (!previous[row.id]) {
      setPrevious((_prev) => ({ ..._prev, [row.id]: row }));
    }
    const value = e.target.value;
    const name = e.target.name;
    const { id } = row;

    const newRows = rows.map((row) => {
      if (row.id === id) {
        return { ...row, [name]: value, canBeReverted: true };
      }
      return row;
    });

    handleRows(newRows);
  };

  const handleChangeCell = (row) => (e) => handleChangeRow(e, row);

  const handleQrPreview = (row) => (e) => {
    console.log(row?.file);
    setQrView(row?.file);
    qrViewDialog.show();
  };

  return (
    <>
      <TableContainer className={tableStyles}>
        <Table aria-label="caption table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="left" />
              <TableCell align="left">Filename</TableCell>
              <TableCell align="left">Extension</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <IconButton
                    aria-label="undo"
                    onClick={() => onRevert(row.id)}
                    disabled={!row.canBeReverted}
                  >
                    <UndoIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="left">
                  <Input
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
                    ]}
                  />
                </TableCell>
                {/* add drop down at the above one */}
                <TableCell align="left">
                  <IconButton aria-label="saveAs" onClick={() => {}}>
                    <SaveAsIcon />
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
