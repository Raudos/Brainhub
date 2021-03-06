const { app } = require("../index");

// Models
const { Event } = require("../models/event");

// Routes
const getEventSchema = require("./routes/getEventSchema");
const { createEventTest } = require("./routes/createEvent");
const getEventsTest = require("./routes/getEvents");
const getEventTest = require("./routes/getEvent");


describe("Event model tests.", () => {
  it("Confirm NODE_ENV.", done => {
    expect(process.env.NODE_ENV).toBe("Test");

    Event.remove({}).then(a => done());
  });

  getEventSchema(app);
  createEventTest(app);
  getEventsTest(app);
  getEventTest(app);
});
