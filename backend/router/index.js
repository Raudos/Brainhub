// Routes
const EventCreator = require("./routes/getEventSchema");
const EventCreation = require("./routes/createEvent");
const EventsList = require("./routes/getEvents");
const EventDetails = require("./routes/getEvent");

module.exports = app => {
  EventCreator(app);
  EventCreation(app);
  EventsList(app);
  EventDetails(app);
};
