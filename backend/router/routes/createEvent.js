// Models
const { Event } = require("../../models/event");

module.exports = app => {
  app.post("/createEvent", (req, res) => {
    const { body } = req;

    const event = new Event({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      eventDate: body.eventDate
    });

    event.save().then(doc => {
      res.send(doc);
    }).catch(e => {
      res.status(400).send(e);
    })
  });
};
