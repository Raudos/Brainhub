var { ObjectID } = require('mongodb');

// Models
const { Event } = require("../../models/event");

module.exports = app => {
  app.get("/event/:id", (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

    Event.findById(id).then(event => {
      res.send({event});
    }, (e) => {
      res.status(400).send(e);
    });
  });
};
