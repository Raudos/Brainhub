import axios from "axios";
import moment from "moment";

function filterFormValues(schema) {
  const formValues = {};

  Object.entries(schema).forEach(field => {
    if (field[1].formRender) {
      if (field[1].formRender.type === "datePicker") {
        formValues[field[0]] = moment();
      } else {
        formValues[field[0]] = "";
      }
    }
  });

  return formValues;
};

export const updateEventCreatorForm = formValues => {
  return (dispatch, getState) => {
    dispatch({
      type: "updateEventCreatorForm",
      data: formValues
    });
  };
};

export const downloadEventSchema = force => {
  return (dispatch, getState) => {
    if (force || !getState().eventCreator.eventSchema) {
      axios({
        url: `http://localhost:3000/eventSchema`
      }).then(req => {
        dispatch({
          type: "downloadEventSchema",
          data: {
            formValues: filterFormValues(req.data.EventSchema),
            eventSchema: req.data.EventSchema
          }
        });
      }).catch(e => {
        dispatch({
          type: "eventCreatorErrored"
        });
      })
    }
  };
};

function transformFormValues(values) {
  const shallowValues = {...values};
  shallowValues.eventDate = shallowValues.eventDate.format("X");

  return shallowValues;
};

export const createEvent = formValues => {
  return (dispatch, getState) => {
    return axios({
      url: `http://localhost:3000/createEvent`,
      method: "POST",
      data: transformFormValues(formValues),
      header: {
        "content-type": "application/json"
      }
    }).then(req => {
      const emptyValues = filterFormValues(getState().eventCreator.eventSchema);
      dispatch({
        type: "eventCreated",
        data: emptyValues
      });

      return emptyValues;
    }).catch(e => {
      if (e.response) {
        if (e.response.data._message === "Event validation failed") {
          dispatch({
            type: "createEventValidationFailure",
            data: e.response.data.errors
          });

          throw "Validation";
        } else {
          throw "Error";
        }
      } else {
        throw "Error";
      }
    })
  };
};
