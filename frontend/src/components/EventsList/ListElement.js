import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Other
import formatTimestamp from "src/generic/formatTimestamp";

const ListElement = props => (
  <div key={props.event._id} className='event'>
    <Link to={`/events/${props.event._id}`}>{`${props.event.lastName} ${props.event.firstName} `}</Link>

    <div className="secondary-info">
      <i className="fas fa-envelope"/>

      <span>{props.event.email}</span>
    </div>

    <div className="secondary-info">
      <i className="far fa-calendar" />

      <span>{formatTimestamp(props.event.eventDate)}</span>
    </div>
  </div>
);

ListElement.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    eventDate: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  })
};

export default ListElement;
