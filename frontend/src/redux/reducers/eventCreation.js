
export default (state, action) => {
  switch (action.type) {
    case 'updateEventCreatorForm':
      return {
        ...state,
        formValues: action.data
      };
    case 'downloadEventSchema':
      return {
        ...action.data,
        errors: {}
      };
    case 'createEventValidationFailure':
      return {
        ...state,
        errors: action.data
      };
    case 'eventCreatorErrored':
      return {
        error: true
      };
    case 'eventCreated':
      return {
        ...state,
        formValues: action.data,
        errors: {}
      };
  default:
    return state;
  }
};
