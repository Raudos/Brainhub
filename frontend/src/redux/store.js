import { createStore as createStoreFunc, applyMiddleware } from 'redux';
import logger from "redux-logger";
import thunk from "redux-thunk";

// Other
import combineReducer from 'src/redux/reducers/index';

const initialStoreObj = {
  eventCreator: {
    formValues: {},
    eventSchema: null,
    errors: {}
  },
  eventDetails: {},
  eventsList: null
};

export const initialStore = initialStoreObj;
export const createStore = createStoreFunc(combineReducer, initialStoreObj, applyMiddleware(thunk));
