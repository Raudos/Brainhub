
export default (state, action) => {
  switch (action.type) {
    case 'downloadDetails':
      return {
        ...state,
        [action.data._id]: action.data
      };
    case 'detailsErrored':
      return {
        ...state,
        [action.data.id]: {error: true}
      };
  default:
    return state;
  }
};
