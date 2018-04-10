import React from 'react';
import PropTypes from 'prop-types';

const Detail = props => (
  <div className={`detail ${props.details.additionalClass || ""}`}>
    {props.details.iconClass ?
      <i className={props.details.iconClass} />

      :

      null
    }

    <div className="text">
      <div className="label">{props.details.label}</div>

      <div>
        {props.text}
      </div>
    </div>
  </div>
);

Detail.propTypes = {
  text: PropTypes.string.isRequired,
  details: PropTypes.shape({
    label: PropTypes.string.isRequired,
    iconClass: PropTypes.string,
    additionalClass: PropTypes.string
  })
};

export default Detail;
