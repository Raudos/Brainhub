import axios from "axios";

export const downloadEventDetails = (id, force) => {
  return (dispatch, getState) => {
    if (force || !getState().eventDetails[id]) {
      axios({
        url: `http://localhost:3000/event/${id}`
      }).then(req => {
        dispatch({
          type: "downloadDetails",
          data: req.data.event
        });
      }).catch(e => {
        dispatch({
          type: "detailsErrored",
          data: {
            id
          }
        });
      });
    }
  };
};
