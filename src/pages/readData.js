import React from "react";
import Read from "../components/read";
import DataProvider from "../contexts/DataProvider";

const ReadData = () => {
  return (
    <DataProvider>
      <Read />
    </DataProvider>
  );
};

export default ReadData;
