// Models
const { EventSchema } = require("../../models/event");

module.exports = app => {
  app.get("/eventSchema", (req, res) => {
    res.send({EventSchema: EventSchema.obj});
  });
};
