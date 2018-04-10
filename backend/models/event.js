const mongoose = require('mongoose');
const validator = require('validator');
const moment = require('moment');

const EventSchema = new mongoose.Schema({
  firstName: {
    type: String,
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
    type: String,
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
    type: String,
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
      validator: mail => validator.isEmail(mail),
      message: "This is not a valid email address."
    }
  },
  eventDate: {
    type: String,
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
      validator: timestamp => {
        const date = moment.unix(timestamp).format();
        const today = new Date();
        const yesterday = today.setDate(today.getDate() - 1);

        return validator.isAfter(date, moment(yesterday).format());
      },
      message: "This is not a valid date."
    }
  }
})

const Event = mongoose.model('Event', EventSchema);

module.exports = { Event, EventSchema }
