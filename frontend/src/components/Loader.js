import React from "react";
import PropTypes from 'prop-types';

const Loader = props => {
  return (
    <div className="loader">
      <p>{props.loaderText || "Loading ..."}</p>
    </div>
  );
};

Loader.propTypes = {
  loaderText: PropTypes.string
};

export default Loader;
