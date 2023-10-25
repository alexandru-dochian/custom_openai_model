import React from "react";
import ReactLoading from "react-loading";

const Loading = () => {
  return (
    <ReactLoading
      className="loading"
      type="bars"
      color="rgb(2, 117, 216)"
      height="50px"
      width="100px"
    />
  );
};

export default Loading;
