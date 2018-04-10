import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";

const variants = {
  list: {
    eventsList: [{
      _id: "1234",
      firstName: "Piotr",
      lastName: "Sklepiński",
      email: "sklepinski.p@gmail.com",
      eventDate: "123456789"
    }]
  },
  loader: {
    eventsList: null
  },
  error: {
    eventsList: {
      error: true
    }
  }
};

export default variant => {
  if (!variants[variant]) {
    throw "EventsList mockedStore invalid variant passed.";
  }

  const mockStore = configureStore([thunk]);
  const store = mockStore(variants[variant]);

  return store;
};
