import "./App.css";
import React, { useState, useEffect } from "react";
import parseData from "./parseData";

import List from "./list";

export default function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFileSelected, setIsFileSelected] = useState(false);

  const [data, setData] = useState([]);

  useEffect(() => {
    if (isFileSelected) {
      parseData(selectedFile).then((data) => setData(data));
    }
  }, [selectedFile]);

  const onChangeFile = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFileSelected(true);
  };

  return (
    <div>
      <input type="file" name="file" onChange={onChangeFile} />

        <div>
          <List array={data}/>
        </div>

        <p>Select a file to show details</p>

    </div>
  );
}
