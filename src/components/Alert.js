import React from "react";

const Alert = ({ alert }) => {
  return (
    alert && (
      <div className={`alert alert-${alert.type} my-2`} role="alert">
        {alert.msg}
      </div>
    )
  );
};

export default Alert;
