import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const Interface = () => {
  const [myData, setMyData] = useState([]);
  const [error, setError] = useState(null);
  const [modifiedData, setModifiedData] = useState({
    id: "",
    Title: "",
  });
  const [update, setUpdate] = useState(false);
  const getAllArray = () => {
    axios.get("http://localhost:1337/api/posts-report").then((response) => {
      setMyData(response.data);
      console.table(response.data);
    });
  };
  const handleInputChange = useCallback(({ target: { name, value } }) => {
    setModifiedData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModifiedData({
      id: "",
      Title: "",
    });

    await axios
      .post("http://localhost:1337/api/posts-report", {
        data: modifiedData,
      })
      .then((response) => {
        console.log(response);
        getAllArray();
      })
      .catch((error) => {
        setError(error);
      });
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

  useEffect(() => {
    getAllArray();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <p>Title</p>
        <input
          type="text"
          name="Title"
          onChange={handleInputChange}
          value={modifiedData.Title || ""}
        />
        <p>Id</p>
        <input
          type="number"
          name="id"
          onChange={handleInputChange}
          value={modifiedData.id || ""}
        />
        <button type="submit">Submit</button>
      </form>
      <p>Listed Data</p>
      {myData.map((content, id) => {
        return (
          <p key={id}>
            <span>{content.id} </span>
            {content.Title}
            <span>
              <button onClick={() => handleDelete(content)}>Delete</button>
            </span>
            <span>
              <button
                onClick={() => {
                  handleUpdate(content);
                  setUpdate(!update);
                }}
              >
                Update
              </button>
            </span>
          </p>
        );
      })}
    </>
  );
};

export default Interface;
