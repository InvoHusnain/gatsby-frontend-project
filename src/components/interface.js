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
import { Typography } from "@mui/material";

const Interface = () => {
  const {
    getAllArray,
    handleSubmit,
    handleDelete,
    handleInputChange,
    modifiedData,
    showUpdate,
    myData,
  } = useContext(DataContext);

  useEffect(() => {
    getAllArray();
  }, []);

  return (
    <div className="crud-wrapper">
      <h1
        style={{
          color: "#ffffff",
        }}
      >
        CRUD
      </h1>
      <form onSubmit={handleSubmit}>
        <p style={{ color: "#ffffff" }}>Title</p>
        <input
          type="text"
          name="Title"
          onChange={handleInputChange}
          value={modifiedData?.Title || ""}
        />
        <p style={{ color: "#ffffff" }}>Id</p>
        <input
          type="number"
          name="id"
          onChange={handleInputChange}
          value={modifiedData?.id || ""}
        />
        <div className="form-btn">
          <button type="submit">Submit</button>
        </div>
      </form>
      {/* <button onClick={showListing}>Show Listing</button>
      <a
        href="/readData"
        style={{
          color: "black",
        }}
      >
        Show data
      </a> */}
      <TableContainer
        component={Paper}
        sx={{ marginTop: "30px", maxWidth: 650, backgroundColor: "#091F39" }}
      >
        <Table sx={{ maxWidth: 650 }} aria-label="simple table">
          <TableHead>
            <Typography
              sx={{
                color: "#ffffff",
                fontSize: "30px",
                fontWeight: "600",
                paddingLeft: "20px",
              }}
            >
              Listed Data
            </Typography>
            <TableRow>
              <TableCell sx={{ color: "#ffffff" }}>Sr. No</TableCell>
              <TableCell sx={{ color: "#ffffff" }}>ID</TableCell>
              <TableCell sx={{ color: "#ffffff" }}>Name</TableCell>
              <TableCell sx={{ color: "#ffffff" }}>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myData.map((content, id) => (
              <TableRow
                key={id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {id + 1}
                </TableCell>
                <TableCell component="th" scope="row">
                  {content.id}
                </TableCell>
                <TableCell>{content.Title}</TableCell>
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

export default Interface;
