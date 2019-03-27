import React from "react";

const notFoundStyle = {
  marginTop: "20px"
};

const NotFound = props => {
  return (
    <div>
      {props.show && (
        <p align="center" style={notFoundStyle}>
          No task found
        </p>
      )}
    </div>
  );
};

export default NotFound;
