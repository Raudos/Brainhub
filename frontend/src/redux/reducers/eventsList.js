
export default (state, action) => {
  switch (action.type) {
    case 'updateList':
      return action.data;
    case 'listErrored':
      return {error: true};
    case 'eventCreated':
      return null;
  default:
    return state;
  }
};
