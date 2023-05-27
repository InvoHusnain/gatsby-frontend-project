import React, { useEffect, useContext } from "react";
import "../styles/crudStyles.css";
import DataContext from "../contexts/DataContext";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";

const Read = () => {
  const {
    getAllArray,
    handleDelete,
    showUpdate,
    myData,
    handleInputChange,
    modifiedData,
  } = useContext(DataContext);

  useEffect(() => {
    getAllArray();
  }, []);
  return (
    <div>
      <TableContainer component={Paper} sx={{ maxWidth: 650 }}>
        <Table sx={{ maxWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sr. No</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myData?.map((content, id) => (
              <TableRow
                key={id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {id + 1}
                </TableCell>
                <TableCell component="th" scope="row">
                  <input
                    type="number"
                    name="id"
                    onChange={handleInputChange}
                    value={modifiedData?.id || ""}
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="text"
                    name="Title"
                    onChange={handleInputChange}
                    value={modifiedData?.Title || ""}
                  />
                </TableCell>
                <TableCell>
                  <DriveFileRenameOutlineIcon
                    onClick={() => showUpdate(content)}
                  />
                  <DeleteIcon onClick={() => handleDelete(content)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Read;
