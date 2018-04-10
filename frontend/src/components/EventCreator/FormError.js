import React from "react";

export default props => {
  if (props.error) {
    return (
      <div className="form-error break-text">
        {props.error.message}
      </div>
    );
  }

  return null;
};
