import React from "react";
import "./FormCompo.css";
import ExportCompo from "../ExportCompo/ExportCompo";

const FormCompo = ({ sendUrl, url, setUrl, setSent, handleFileSubmit }) => {
  return (
    <div className="form-container">
      <div>
        <h1> Enter the URL</h1>
        <form onSubmit={sendUrl} className="form">
          <div className="form-group">
            <input
              className="form-input"
              type="text"
              placeholder="URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
            <label className="form-label">URL</label>
          </div>

          <button className="submit-button" type="submit">
            Submit
          </button>
        </form>
      </div>
      <div className="or-divider">
        <span>OR</span>
      </div>
      <ExportCompo setSent={setSent} handleFileSubmit={handleFileSubmit} />
    </div>
  );
};

export default FormCompo;
