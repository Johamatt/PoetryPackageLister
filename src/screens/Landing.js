import React, { useState, useEffect } from "react";
import parseData from "../util/parseData";
import "../css/styles.css";
import List from "./List";

export default function Landing() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [parsedData, setParsedData] = useState([]);

  useEffect(() => {
    if (isFileSelected) {
      parseData(selectedFile).then((parsedData) => setParsedData(parsedData));
    }
  }, [isFileSelected]);

  const onChangeFile = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFileSelected(true);
  };

  return (
    <div>
      <div className="header">
        <h1>Poetry Package Lister</h1>
      </div>
      <div className="listcontainer">
        <div id="file-input">
          <input type="file" name="file" id="file" class="inputfile" onChange={onChangeFile}/>
          <label for="file"><i style={{padding: 6 }}class="fa-solid fa-upload"></i>Select file</label>
        </div>
        <div style={{paddingTop: 5}}>
          <List array={parsedData} />
        </div>
      </div>
    </div>
  );
}
