import React from "react";

const Button = ({ label, btnClassType = "success", onClick, ...rest }) => {
  return (
    <button {...rest} className={`btn btn-${btnClassType}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
