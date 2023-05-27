import React, { useCallback, useState } from "react";
import DataContext from "./DataContext";
import axios from "axios";

const DataProvider = ({ children }) => {
  const [update, setUpdate] = useState(false);
  const [myData, setMyData] = useState([]);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [modifiedData, setModifiedData] = useState({
    Title: "",
    Description: "",
  });

  const showListing = () => {
    setShow(!show);
  };

  const getAllArray = () => {
    axios.get("http://localhost:1337/api/posts-report").then((response) => {
      setMyData(response.data);
    });
  };

  const handleInputChange = useCallback(({ target: { name, value } }) => {
    setModifiedData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!modifiedData.Title || !modifiedData.Description) {
      handleOpen();
    } else {
      try {
        const response = await axios.post(
          "http://localhost:1337/api/posts-report",
          {
            data: modifiedData,
          }
        );
        console.log(response.data);
        getAllArray();
        setModifiedData({
          Title: "",
          Description: "",
        });
      } catch (error) {
        setError(error);
      }
    }
  };

  const handleUpdate = (content) => {
    console.log(update);
    if (update) {
      axios
        .put(`http://localhost:1337/api/posts-report/${content?.id}`, {
          data: modifiedData,
        })
        .then((response) => {
          console.log(response);
          getAllArray();
        })
        .catch((error) => {
          setError(error);
        });
      setModifiedData({ Title: "", Description: "" });
    } else {
      const myTitle = content.Title;
      const myDescription = content.Description;

      setModifiedData({ Title: myTitle, Description: myDescription });
    }
  };

  const handleDelete = (content) => {
    axios
      .delete(`http://localhost:1337/api/posts-report/${content?.id}`)
      .then((response) => {
        console.log(response);
        getAllArray();
        setModifiedData({ Title: "", Description: "" });
      })
      .catch((error) => {
        setError(error);
      });
  };

  const showUpdate = (content) => {
    handleUpdate(content);
    setUpdate(!update);
  };

  const value = {
    myData,
    modifiedData,
    getAllArray,
    handleInputChange,
    handleDelete,
    handleSubmit,
    show,
    showUpdate,
    update,
    open,
    handleOpen,
    handleClose,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataProvider;
