import React from 'react';
import Container from 'react-data-container';
import PropTypes from 'prop-types';

// Components
import Loader from "src/components/Loader";
import Error from "src/components/Error";
import ListElement from "src/components/EventsList/ListElement";

// Other
import { downloadEventsList } from "src/redux/actions/eventsList";

const containerConfig = {
  isLoading: that => !that.props.eventsList,
  isError: that => that.props.eventsList && that.props.eventsList.error,
  onMount: that => that.props.downloadEventsList(),
  Error: that => <Error />,
  Loader: that => <Loader />,
  Redux: {
    mapStateToProps: (state, ownProps) => ({
      eventsList: state.eventsList,
      witam: 2
    }),
    actions: { downloadEventsList }
  }
};

export class EventsList extends React.Component {
  static propTypes = {
    eventsList: PropTypes.array.isRequired,
    downloadEventsList: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className='events-list'>
        <header>Number of events - <span>{this.props.eventsList.length}</span></header>

        {this.props.eventsList.map(event => (
          <ListElement
            key={event._id}
            event={event}
          />
        ))}
      </div>
    );
  };
};

export default Container(containerConfig)(EventsList);
