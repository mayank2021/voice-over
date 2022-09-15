import React, { useState } from "react";
import "./ExportCompo.css";

const ExportCompo = ({ handleFileSubmit }) => {
  const [fileName, setFileName] = useState("");

  const handleFile = (e) => {
    const file = e.target.value;
    const fileName = file.slice(12, 38);
    setFileName(fileName);
  };

  return (
    <div>
      <div>
        <h1>import the file</h1>
        <form className="form" onSubmit={handleFileSubmit}>
          <div className="form-group">
            <input
              id="file-input"
              className="custom-file-input"
              type="file"
              placeholder="File"
              accept=".pdf, .doc, .docx"
              onChange={(e) => handleFile(e)}
              required
            />
          </div>
          <label className="label--file">
            {fileName
              ? fileName.length > 26
                ? `${fileName}...`
                : fileName
              : "Select some files"}
          </label>

          <button className="submit-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExportCompo;
