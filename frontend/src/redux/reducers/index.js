import EventsListUpdater from "src/redux/reducers/eventsList";
import EventDetailsUpdater from "src/redux/reducers/eventDetails";
import EventCreatorFormUpdater from "src/redux/reducers/eventCreation";

export default (currentState, action) => {
  var nextState = {...currentState};

  return {
    eventsList: EventsListUpdater(nextState.eventsList, action),
    eventDetails: EventDetailsUpdater(nextState.eventDetails, action),
    eventCreator: EventCreatorFormUpdater(nextState.eventCreator, action)
  };
};
