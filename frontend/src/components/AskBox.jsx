import React from "react";

const AskBox = ({ value, onChange, onClick, placeHolder }) => {
  return (
    <div className="row">
      <div className="col-10">
        <input
          type="text"
          name="query"
          className="form-control"
          placeholder={placeHolder}
          value={value}
          onChange={(e) => onChange(e.currentTarget.value)}
        />
      </div>
      <div className="col-2">
        <button onClick={() => onClick()} className="btn btn-primary">
          Ask
        </button>
      </div>
    </div>
  );
};

export default AskBox;
