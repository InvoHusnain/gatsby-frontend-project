import React, { useCallback, useState } from "react";
import DataContext from "./DataContext";
import axios from "axios";

const DataProvider = ({ children }) => {
  const [update, setUpdate] = useState(false);

  const [myData, setMyData] = useState([]);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);
  const [modifiedData, setModifiedData] = useState({
    id: "",
    Title: "",
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
        id: "",
        Title: "",
      });
    } catch (error) {
      setError(error);
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
      setModifiedData({ Title: "", id: "" });
    } else {
      const myTitle = content.Title;
      const myId = content.id;

      setModifiedData({ Title: myTitle, id: myId });
    }
  };

  const handleDelete = (content) => {
    axios
      .delete(`http://localhost:1337/api/posts-report/${content?.id}`)
      .then((response) => {
        console.log(response);
        getAllArray();
        setModifiedData({ Title: "", id: "" });
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
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataProvider;
