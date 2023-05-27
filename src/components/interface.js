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
import { Box, Button, TextField, Typography } from "@mui/material";
import BasicModal from "./modal";

const Interface = () => {
  const {
    getAllArray,
    handleSubmit,
    handleDelete,
    handleInputChange,
    modifiedData,
    showUpdate,
    myData,
    update,
    noData,
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
        CRUD APP
      </h1>
      <form onSubmit={handleSubmit}>
        <Box className="form-wrapper">
          <TextField
            type="text"
            name="Title"
            onChange={handleInputChange}
            value={modifiedData?.Title || ""}
            label="Title"
          />
          <TextField
            name="Description"
            onChange={handleInputChange}
            value={modifiedData?.Description || ""}
            label="Description"
          />
        </Box>
        <div className="form-btn">
          <Button
            variant="outlined"
            disabled={update ? true : false}
            type="submit"
          >
            Submit
          </Button>
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
        sx={{ marginTop: "30px", maxWidth: 800, backgroundColor: "#091F39" }}
      >
        <Table sx={{ maxWidth: 800 }} aria-label="simple table">
          <TableHead>
            <Box
              sx={{
                paddingLeft: "20px",
                minWidth: "200px",
              }}
            >
              <Typography
                sx={{
                  color: "#ffffff",
                  fontSize: "30px",
                  fontWeight: "600",
                  fontFamily: `"Poppins",sans-serif !important`,
                }}
              >
                Listed Data
              </Typography>
            </Box>
            <TableRow>
              <TableCell
                sx={{
                  color: "#ffffff",
                  fontFamily: `"Poppins",sans-serif !important`,
                }}
              >
                Sr. No
              </TableCell>
              <TableCell
                sx={{
                  color: "#ffffff",
                  fontFamily: `"Poppins",sans-serif !important`,
                }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  color: "#ffffff",
                  fontFamily: `"Poppins",sans-serif !important`,
                }}
              >
                Description
              </TableCell>
              <TableCell
                sx={{
                  color: "#ffffff",
                  fontFamily: `"Poppins",sans-serif !important`,
                }}
              >
                Edit
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myData.map((content, id) => (
              <TableRow
                key={id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  sx={{
                    color: "#ffffff",
                    fontFamily: `"Poppins",sans-serif !important`,
                  }}
                >
                  {id + 1}
                </TableCell>
                <TableCell
                  sx={{
                    color: "#ffffff",
                    fontFamily: `"Poppins",sans-serif !important`,
                  }}
                >
                  {content?.Title}
                </TableCell>
                <TableCell
                  sx={{
                    color: "#ffffff",
                    fontFamily: `"Poppins",sans-serif !important`,
                  }}
                >
                  {content?.Description}
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      columnGap: "10px",
                    }}
                  >
                    <DriveFileRenameOutlineIcon
                      sx={{ fill: "#ffffff", cursor: "pointer" }}
                      onClick={() => showUpdate(content)}
                    />
                    <DeleteIcon
                      sx={{ fill: "#ffffff", cursor: "pointer" }}
                      onClick={() => handleDelete(content)}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <BasicModal />
    </div>
  );
};

export default Interface;
