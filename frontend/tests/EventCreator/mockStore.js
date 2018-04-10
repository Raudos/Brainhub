import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import moment from "moment";

const eventSchema = {
  firstName: {
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 30,
    formRender: {
      label: "First Name",
      placeholder: "Enter your first name",
      type: "input"
    }
  },
  lastName: {
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 30,
    formRender: {
      label: "Last Name",
      placeholder: "Enter your last name",
      type: "input"
    }
  },
  email: {
    required: true,
    trim: true,
    minlength: 4,
    maxlength: 40,
    formRender: {
      label: "Email Address",
      placeholder: "Enter your email address",
      type: "input"
    },
    validate: {
      message: "This is not a valid email address."
    }
  },
  eventDate: {
    required: true,
    trim: true,
    minlength: 8,
    maxlength: 12,
    formRender: {
      label: "Event Date",
      placeholder: "Pick date for your event",
      type: "datePicker"
    },
    validate: {
      message: "This is not a valid date."
    }
  }
};

export const variants = {
  creator: {
    eventCreator: {
      errors: {},
      eventSchema,
      formValues: {
        firstName: "",
        lastName: "",
        email: "",
        eventDate: moment()
      }
    }
  },
  loader: {
    eventCreator: {
      formValues: {},
      eventSchema: null,
      errors: {}
    }
  },
  error: {
    eventCreator: {
      error: true
    }
  }
};

export default variant => {
  if (!variants[variant]) {
    throw "EventCreator mockedStore invalid variant passed.";
  }

  const mockStore = configureStore([thunk]);
  const store = mockStore(variants[variant]);

  return store;
};
