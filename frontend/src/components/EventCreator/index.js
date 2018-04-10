import React from "react";
import Container from 'react-data-container';
const R = require("ramda");
import PropTypes from 'prop-types';

// Other
import { downloadEventSchema, createEvent, updateEventCreatorForm } from "src/redux/actions/eventCreator";

// Components
import InputComponent from "./Input";
import DatePicker from "./DatePicker";
import Loader from "src/components/Loader";
import Error from "src/components/Error";

const containerConfig = {
  isLoading: that => !that.props.eventCreator.eventSchema,
  isError: that => that.props.eventCreator && that.props.eventCreator.error,
  onMount: that => that.props.downloadEventSchema(),
  Error: that => <Error />,
  Loader: that => <Loader />,
  Redux: {
    mapStateToProps: (state, ownProps) => ({
      eventCreator: state.eventCreator
    }),
    actions: { downloadEventSchema, createEvent, updateEventCreatorForm }
  }
};

export class EventCreator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formValues: this.props.eventCreator.formValues,
      feedback: false
    };
  };

  static propTypes = {
    downloadEventSchema: PropTypes.func.isRequired,
    createEvent: PropTypes.func.isRequired,
    updateEventCreatorForm: PropTypes.func.isRequired,
    eventCreator: PropTypes.shape({
      eventSchema: PropTypes.object.isRequired,
      formValues: PropTypes.object.isRequired,
      errors: PropTypes.object
    })
  };

  updateForm = (key, value) => {
    this.setState(state => ({
      formValues: {
        ...state.formValues,
        [key]: value
      }
    }));
  };

  componentWillUnmount() {
    this.feedbackReset ? window.clearTimeout(this.feedbackReset) : null;
    this.props.updateEventCreatorForm(this.state.formValues);
  };

  createEvent = () => {
    return this.props.createEvent(this.state.formValues)
      .then(emptyValues => {
        if (emptyValues) {
          this.setState({
            formValues: emptyValues
          }, () => this.toggleFeedback({mode: "success", text: "New event succesfully created."}));

          return true;
        }

        return false
      })
      .catch(e => {
        if (e !== "Validation") {
          this.toggleFeedback({mode: "failure", text: "Unexpected error occured while creating new event."});
        }

        return false;
      });
  };

  toggleFeedback = feedback => this.setState({
    feedback
  }, () => this.feedbackReset = window.setTimeout(() => this.setState({feedback: false}), 3000));

  render() {
    const formKeys = Object.keys(this.state.formValues);
    const { eventSchema, errors } = this.props.eventCreator;

    return (
      <div className="event-creator">
        {formKeys.map(key => {
          const field = eventSchema[key];
          const error = errors[key];
          const value = this.state.formValues[key];
          const updateForm = R.curry(this.updateForm)(key);

          if (eventSchema[key].formRender.type === "input") {
            return (
              <InputComponent
                key={key}
                valueKey={key}
                updateForm={updateForm}
                value={value}
                schemaInfo={field}
                error={error}
              />
            )
          } else if (eventSchema[key].formRender.type === "datePicker") {
            return (
              <DatePicker
                key={key}
                valueKey={key}
                updateForm={updateForm}
                value={value}
                schemaInfo={field}
                error={error}
              />
            )
          }

          return null;
        })}

        <button className={Object.keys(this.props.eventCreator.errors).length ? "errored" : ""} onClick={this.createEvent}>Add Event</button>

        {this.state.feedback ?
          <div className={`feedback ${this.state.feedback.mode}`}>{this.state.feedback.text}</div>

          :

          null
        }
      </div>
    );
  };
};

export default Container(containerConfig)(EventCreator);
