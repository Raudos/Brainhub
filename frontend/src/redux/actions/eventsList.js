import axios from "axios";

export const fetchEventsList = (dispatch = () => {}, getState = () => {}) => {
  return axios({
    url: "http://localhost:3000/events"
  }).then(req => {
    dispatch({
      type: "updateList",
      data: req.data.events
    });

    return req.data.events;
  }).catch(e => {
    dispatch({
      type: "listErrored"
    });

    throw e;
  })
}

export const downloadEventsList = force => {
  return (dispatch, getState) => {
    if (force || !getState().eventsList) {
      fetchEventsList(dispatch, getState);
    }
  };
};
