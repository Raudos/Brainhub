import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";

const variants = {
  details: {
    eventDetails: {
      1234: {
        _id: "1234",
        firstName: "Piotr",
        lastName: "Sklepiński",
        email: "sklepinski.p@gmail.com",
        eventDate: "123456789"
      }
    }
  },
  loader: {
    eventDetails: {}
  },
  error: {
    eventDetails: {
      1234: {
        error: true
      }
    }
  }
};

export default variant => {
  if (!variants[variant]) {
    throw "EventDetails mockedStore invalid variant passed.";
  }

  const mockStore = configureStore([thunk]);
  const store = mockStore(variants[variant]);

  return store;
};
