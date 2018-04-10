// Models
const { Event } = require("../../models/event");

module.exports = app => {
  app.get("/events", (req, res) => {
    Event.find().then(events => {
      res.send({events});
    }, (e) => {
      res.status(400).send(e);
    });
  });
};
