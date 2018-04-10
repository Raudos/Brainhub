import React from 'react';
import Container from 'react-data-container';
import PropTypes from 'prop-types';

// Components
import Loader from "src/components/Loader";
import Error from "src/components/Error";
import Detail from "src/components/EventDetails/Detail";

// Other
import { downloadEventDetails } from "src/redux/actions/eventDetails";
import formatTimestamp from "src/generic/formatTimestamp";

const detailsData = {
  firstName: {
    label: "First Name",
    additionalClass: "name",
    iconClass: null
  },
  lastName: {
    label: "Last Name",
    additionalClass: "name",
    iconClass: null,
  },
  email: {
    label: "Email Address",
    additionalClass: null,
    iconClass: "fas fa-envelope"
  },
  eventDate: {
    label: "Date of Event",
    additionalClass: null,
    iconClass: "far fa-calendar",
    textTransformer: formatTimestamp
  }
};

const containerConfig = {
  isLoading: that => !that.props.eventDetails,
  isError: that => that.props.eventDetails && that.props.eventDetails.error,
  onCWRP: (that, nextProps) => {
    const currentId = that.props.match.params.id;
    const newId = nextProps.match.params.id;

    if (currentId !== newId) {
      that.props.downloadEventDetails(newId)
    }
  },
  onMount: that => that.props.downloadEventDetails(that.props.match.params.id),
  Error: that => <div className="event-details"><Error /></div>,
  Loader: that => <div className="event-details"><Loader /></div>,
  Redux: {
    mapStateToProps: (state, ownProps) => {
      const id = ownProps.match.params.id;

      return {
        eventDetails: state.eventDetails[id]
      };
    },
    actions: { downloadEventDetails }
  }
};


export class EventDetails extends React.Component {
  static propTypes = {
    downloadEventDetails: PropTypes.func.isRequired,
    eventDetails: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="event-details">
        <div className="details-container">
          <i className="fas fa-address-book main-icon" />

          {Object.keys(this.props.eventDetails).map(key => {
            const value = this.props.eventDetails[key];
            const details = detailsData[key];

            if (details) {
              return (
                <Detail
                  key={key}
                  text={details.textTransformer ? details.textTransformer(value) : value}
                  details={details}
                />
              );
            }

            return null;
          })}
        </div>
      </div>
    );
  };
};

export default Container(containerConfig)(EventDetails);
