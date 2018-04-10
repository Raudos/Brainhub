import React from "react";
import PropTypes from 'prop-types';

const Error = props => {
  return (
    <div className="error">
      <p>{props.errorText || "Unexpected error occured, please refresh the application and try again."}</p>
    </div>
  );
};

Error.propTypes = {
  errorText: PropTypes.string
};

export default Error;
